// Update them coins
// require('../db');
const moment = require('moment');
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const coinGecko = require('../lib/coinGecko');
const Coin = require('../models/Coin');
var limit = require("simple-rate-limiter");
const expirationInHours = 5;
let updateCoinMarketDataTaskFetching = false;

const getCoinMarket = limit(function(coinId) {
  updateCoinMarketDataTaskFetching = true;
  coinGecko.getCoinWithMarketChart(coinId).then(async (res) => {
    await Coin.Schema.findOneAndUpdate({ id: coinId }, { market_data: {
      ...res,
      lastUpdated: new Date()
    } });
    // console.log(coinId, ' updated');
    updateCoinMarketDataTaskFetching = false;
  }).catch(e => {
    // BugsnagClient.notify(e.message);
    console.log(`could not update coin market for coin: ${coiId}: ${e.message}`);
    updateCoinMarketDataTaskFetching = false;
  })
}).to(30).per(1000 * 60);
 
const updateCoinMarkets = async () => {
  const coins = await Coin.Schema.find(
    {
      "$or": [
        {"market_data.lastUpdated": null},
        {"market_data.lastUpdated": {
          "$lte": moment().subtract(expirationInHours, 'hours').toDate()
        }}
      ]
    }
  ).select('id');
  // const coins = await Coin.Schema.find({id: 'bitcoin'}).select('id');
  coins.forEach((coin) => {
    getCoinMarket(coin.id)
  })
}

// Update at 5:00pm, nightly
// Could take hours
// cost:  30 calls / minute
const updateCoinMarketDataTask = cron.schedule('0 17 * * *', () => {
  console.log(`Firing off updateCoinMarketDataTask at ${new Date().toString()}`);
  // console.log('updateCoinMarketDataTaskFetching', updateCoinMarketDataTaskFetching);
  if (!updateCoinMarketDataTaskFetching) {
    updateCoinMarkets();
  }
}, {
  scheduled: false,
  timezone: "America/Los_Angeles",
});

module.exports = updateCoinMarketDataTask;
