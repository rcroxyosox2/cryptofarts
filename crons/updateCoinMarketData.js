// Update them coins
// require('../db');
const moment = require('moment');
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const coinGecko = require('../lib/coinGecko');
const Coin = require('../models/Coin');
var limit = require("simple-rate-limiter");
const expirationInHours = 5;
let fetching = false

const getCoinMarket = limit(function(coinId) {
  fetching = true;
  coinGecko.getCoinWithMarketChart(coinId).then(async (res) => {
    await Coin.Schema.findOneAndUpdate({ id: coinId }, { market_data: {
      ...res,
      lastUpdated: new Date()
    } });
    // console.log(coinId, ' updated');
    fetching = false;
  }).catch(e => {
    BugsnagClient.notify(e.message);
    fetching = false;
  })
}).to(30).per(1000 * 60);
 
const updateCoinMarkets = async (onComplete) => {
  const coins = await Coin.Schema.find({
    "$or": [
      {"market_data.lastUpdated": null},
      {"market_data.lastUpdated": {
        "$lte": moment().subtract(expirationInHours, 'hours').toDate()
      }}
    ]}
  ).select('id');
  // const coins = await Coin.Schema.find({id: 'bitcoin'}).select('id');
  coins.forEach((coin) => {
    getCoinMarket(coin.id)
  })
}

const updateCoinMarketDataTask = cron.schedule('* 17 * * *', () => {
  // console.log('fetching', fetching);
  if (!fetching) {
    updateCoinMarkets();
  }
}, {
  timezone: "America/Los_Angeles"
});

module.exports = updateCoinMarketDataTask;
