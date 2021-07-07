require('dotenv').config();
require('./db');
const express = require('express'); 
const cors = require('cors');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

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

// Events + sockets
const emitter = require('./emitter');

io.on('connection', (socket) => {
  console.log('socket server connected...');
});

emitter.on('coinsUpdated', async () => {
  console.log('coins updated...');
  const data = await coinQueries.getAvg24hrPriceChangePerc();
  io.sockets.emit('day', data); 
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// Start any crons
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
    const result = (term) ? await coinQueries.searchCoinsWithAutocomplete(term) : [];
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
app.get('/api/moonshots', async (req, res) => {
  try {
    const moonShots = await reddit.getRedditAsMoonShots();
    // const b = await reddit.getSub();
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
})


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client", "build")));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})
