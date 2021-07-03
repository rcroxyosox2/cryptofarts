// Update them coins
// require('../db');
const cron = require('node-cron');
const moment = require('moment');
const BugsnagClient = require('../lib/bugsnag');
const coinMarketCal = require('../lib/coinmarketcal');
const Coin = require('../models/Coin');
const limit = require('simple-rate-limiter');
const expirationInDays = 1;
let updateCoinStolenEventsFetching = false;

const updateCoinStolenEvents = limit(function(coinId) {
  updateCoinStolenEventsFetching = true;
  coinMarketCal.getEvents(coinId).then(async (res) => {
    await Coin.Schema.findOneAndUpdate({ id: coinId }, {stolen_events: {count: res, lastUpdated: new Date()}});
    // console.log(coinId, ' updated');
    updateCoinStolenEventsFetching = false;
  }).catch(e => {
    // BugsnagClient.notify(`could not update coin stolen event for coin ${coinId}: ${e.message}`);
    console.log(`could not update coin stolen event for coin ${coinId}: ${e.message}`);
    updateCoinStolenEventsFetching = false;
  })
}).to(10).per(1000 * 60);

const updateCoinsStolenEvents = async () => {
  const coins = await Coin.Schema.find({
    "$or": [
      {"stolen_event": null},
      {"stolen_event.lastUpdated": {
        "$lte": moment().subtract(expirationInDays, 'days').toDate()
      }}
    ]
  }).select('id');
  // const coins = await Coin.Schema.find({id: 'bitcoin'}).select('id');
  coins.forEach((coin) => {
    updateCoinStolenEvents(coin.id)
  })
}

// Update every night at 11:00 PM
const updateCoinEventsTask = cron.schedule('0 21 * * *', () => {
  // console.log('updateCoinCoreDataTaskFetching', updateCoinCoreDataTaskFetching);
  if (!updateCoinStolenEventsFetching) {
    updateCoinsStolenEvents();
  }
}, {
  scheduled: false,
  timezone: "America/Los_Angeles",
});

module.exports = updateCoinEventsTask;
