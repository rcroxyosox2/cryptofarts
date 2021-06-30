// require('../db');
// Update them coins
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const moment = require('moment');
const coinGecko = require('../lib/coinGecko');
const Coin = require('../models/Coin');
const limit = require("simple-rate-limiter");
const expirationInDays = 1;
const updateCoinCoreDataTaskFetching = false;

const updateCoinCoreData = limit(function(coinId) {
  updateCoinCoreDataTaskFetching = true;
  coinGecko.getCoin(coinId, {
    tickers: false,
    market_data: false,
    localization: false,
    developer_data: false,
    sparkline: false,
  }).then(async (res) => {
    await Coin.Schema.findOneAndUpdate({ id: coinId }, {...res, image: res.image.large, coreDataLastUpdated: new Date()}, {upsert: true});
    // console.log(coinId, ' updated');
    updateCoinCoreDataTaskFetching = false;
  }).catch(e => {
    BugsnagClient.notify(`could not update coinCoreData for coin ${coinId}: ${e.message}`);
    updateCoinCoreDataTaskFetching = false;
  })
}).to(20).per(1000 * 60);

const updateCoinsCoreData = async () => {
  const coins = await Coin.Schema.find({
    "$or": [
      {"coreDataLastUpdated": null},
      {"coreDataLastUpdated": {
        "$lte": moment().subtract(expirationInDays, 'days').toDate()
      }}
    ]
  }).select('id');
  // const coins = await Coin.Schema.find({id: 'bitcoin'}).select('id');
  coins.forEach((coin) => {
    updateCoinCoreData(coin.id)
  })
}

// (async function() {
//   const x = await Coin.Schema.updateMany({"image.large": {"$ne": null}}, {"$set": {"image": null, "coreDataLastUpdated": null}});
//   console.log(x);
// })();

// updateCoinsCoreData();

// Update at 10:00pm, nightly
// Could take hours
// cost:  20 calls / minute
const updateCoinCoreDataTask = cron.schedule('0 22 * * *', () => {
  // console.log('updateCoinCoreDataTaskFetching', updateCoinCoreDataTaskFetching);
  if (!updateCoinCoreDataTaskFetching) {
    updateCoinsCoreData();
  }
}, {
  timezone: "America/Los_Angeles"
});
