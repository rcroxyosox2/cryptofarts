require('dotenv').config()
const connection = `mongodb+srv://rob:${process.env.DB_PW}@cluster0.khyej.mongodb.net/kripdoe?retryWrites=true&w=majority`;
const cheerio = require('cheerio');
const request = require('request');
const mongoose = require('mongoose');
const updateCoinsTask = require('./crons/updateCoins');
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, autoIndex: false})
const Coin = require('./models/Coin');
const coinQueries = require('./queries/coin');
const express = require('express'); 
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express(); 
const port = process.env.PORT || 5000; 

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// Start any crons
updateCoinsTask.start();

// prep the responses
app.use(bodyParser.json());
// app.use(cors());

app.get('/test', async(req, res) => {
  const coins = await coinQueries.getSickDealCoins();
  res.send(coins);
})

// get the season
app.get('/season', async(req, res) => {

  const percPriceChange24Hr = await coinQueries.getAvg24hrPriceChangePerc();

  request({
    method: 'GET',
    url: 'https://www.blockchaincenter.net/bitcoin-rainbow-chart/'
  }, (err, innerRes, body) => {
    if (err) {
      innerRes.status(500).render('error', {
        error: err
      });
    };
    const $ = cheerio.load(body);
    const $legend = $('.legend');
    const index = $legend.find('.active').index();

    const bands = {
      BUBBLE_CONFIRMED: 'bubbleconfirmed',
      SELL: 'sell',
      FOMO: 'fomo',
      BUBBLE_MAYBE: 'bubblemaybe',
      HODL: 'hodl',
      CHEAP: 'cheap',
      ACCUMULATE: 'accumulate',
      BUY: 'buy',
      FIRE_SALE: 'firesale',
      UNKNOWN: 'unknown',
    };

    const currentKey = index ? Object.keys(bands)[index] : bands.UNKNOWN;
    res.send({ 
      bands,
      currentKey,
      percPriceChange24Hr,
    })
  })

  // request({
  //   method: 'GET',
  //   url: 'https://www.blockchaincenter.net/bitcoin-rainbow-chart/'
  // }, (err, res, body) => {
  //   if (err) {
  //     res.status(500).render('error', {
  //       error: err
  //     });
  //   };
  //   const $ = cheerio.load(body);
  //   const $legend = $('.legend');
  //   const index = $legend.find('.active').index();

  //   const bands = {
  //     BUBBLE_CONFIRMED: 'bubbleconfirmed',
  //     SELL: 'sell',
  //     FOMO: 'fomo',
  //     BUBBLE_MAYBE: 'bubblemaybe',
  //     HODL: 'hodl',
  //     CHEAP: 'cheap',
  //     ACCUMULATE: 'accumulate',
  //     BUY: 'buy',
  //     FIRE_SALE: 'firesale',
  //     UNKNOWN: 'unknown',
  //   };

  //   const currentKey = Object.keys(index)

  //   res.send({ 
  //     bands,
  //     currentKey,
  //   })
  // });
});




// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})