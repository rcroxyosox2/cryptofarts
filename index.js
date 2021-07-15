const mongo = require('./db');
require('dotenv').config();

const express = require('express'); 
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const BugsnagClient = require('./lib/bugsnag');
const { performance } = require('perf_hooks');

// queries
const coinQueries = require('./queries/coin');
const metaQueries = require('./queries/meta');

// modles
const Coin = require('./models/Coin');

// crons
const updateCoinsTask = require('./crons/updateCoins');
const updateExchangesTask = require('./crons/updateExchanges');
const recordCelebAdviceTask = require('./crons/recordCelebAdvice');
const updateMetasTask = require('./crons/updateMetas');
const updateCoinMarketDataTask = require('./crons/updateCoinMarketData');
const updateCoinCoreDataTask = require('./crons/updateCoinCoreData');
const updateCoinEventsTask = require('./crons/updateCoinEvents');

// libs
const reddit = require('./lib/reddit');
const coinGecko = require('./lib/coinGecko');

// engines 
const { getCelebrityTradeAdvice } = require('./engines/celerityTradeAdvice');

// server
const app = express(); 
const port = process.env.PORT || 5000; 
const server = http.createServer(app);
const io = new Server(server);
const MAX_CALL_TIME = 3000;

// Events + sockets
const emitter = require('./emitter');


io.on('connection', (socket) => {
  console.log('socket server connected...');
});

emitter.on('coinsUpdated', async () => {

  console.log('coins updated...');

  // day
  const day = await coinQueries.getAvg24hrPriceChangePerc();
  io.sockets.emit('day', day); 

  // sick deals
  const sickDeals = await coinQueries.getSickDealCoins();
  io.sockets.emit('sickdeals', sickDeals);

});


server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// Start any crons
// production only crons
if (process.env.REACT_APP_ENV === 'production') {
  recordCelebAdviceTask.start();
  updateMetasTask.start();
  updateCoinsTask.start();
  updateExchangesTask.start();
  updateCoinMarketDataTask.start();
  updateCoinCoreDataTask.start();
  updateCoinEventsTask.start();
}


// prep the responses
app.use(express.json());
// app.use(cors());

// Day view (logo screen)
app.get('/api/day', async (req, res) => {
  try {
    const data = await coinQueries.getAvg24hrPriceChangePerc();
    res.send(data);
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
});

// search
app.get('/api/search', async (req, res) => {
  try {
    const term = req.query.term;
    const t0 = performance.now();
    const result = (term) ? await coinQueries.searchCoinsWithAutocomplete(term) : [];
    const t1 = performance.now();
    const apiCallTime = (t1 - t0);
    if (apiCallTime >= MAX_CALL_TIME) {
      BugsnagClient.notify('/api/search taking a long ass time. Possible throttling happening');
    }
    res.send(result);
  } catch(e) {
    console.error(e);
  }
})

// sick deals
app.get('/api/sickdeals', async (req, res) => {
  try {
    const coins = await coinQueries.getSickDealCoins();
    res.send(coins);
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
});

// reddit moonshots
app.get('/api/moonshots/:maxResults', async (req, res) => {
  try {
    const maxResults = req.params.maxResults || 10;
    const moonShots = await reddit.getRedditAsMoonShots({
      maxResults
    });
    reddit.pollMoonShots(io, maxResults);
    res.send(moonShots)
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
});

// moonshot details
app.get('/api/moonshots/:id', async (req, res) => {
  try {
    const moonShot = await reddit.getRedditAsMoonShots({id: req.params.id});
    res.send(moonShot)
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
});

// greens and reds
app.get('/api/greenredlist', async(req, res) => {
  try {
    const redGrees = await coinQueries.getRedGreens();
    res.send(redGrees);
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
})

// trending
app.get('/api/trending', (req, res) => {
  coinGecko.getTrending().then(async (trending) => {
    const query = trending.map((coin) => ({id: coin.item.id}));
    const coins = await Coin.Schema.find({$or: query});
    res.send(coins);
  }).catch((e) => {
    res.status(500).send({
      error: e.message
    });
  })
});

// coin detail view
// TODO: update so that it reads from Coin schema first
app.get('/api/coin/:id', async(req, res) => {
  try {
    const coinData = await Promise.all([
      coinGecko.getCoin(req.params.id, {
        tickers: false,
        market_data: true,
        localization: false,
        developer_data: false,
        sparkline: true,
      }),
      coinGecko.getCoinWithMarketChart(req.params.id),
      metaQueries.getMeta(),
      coinQueries.getCoinEventCount(req.params.id)
    ]).then(([coin, marketData, metas, numEvents]) => {
      coin.market_data = marketData;
    
      // update the coin quietly
      Coin.Schema.findOneAndUpdate({id: req.params.id}, coin);

      const { prices:priceChartArr, total_volumes:volumeChartArr } = (marketData) ? marketData : {};
      const { season, greedFearIndex:gfIndex } = (metas) ? metas : {};
      const advice = getCelebrityTradeAdvice({
        coin, 
        priceChartArr, 
        volumeChartArr, 
        gfIndex,
        season,
        numEvents,
      });
      
      return {
        coin,
        advice: advice.summary,
      };
    });
    res.send(coinData);
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
});

app.get('/api/meta', async (req, res) => {
  try {
    const meta = await metaQueries.getMeta();
    res.send(meta);
  } catch(e) {
    res.status(500).send({
      error: e.message
    });
  }
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client", "build")));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})
