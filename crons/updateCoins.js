// Update them coins
// require('../db');
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const coinGecko = require('../lib/coinGecko');
const Coin = require('../models/Coin');
const emitter = require('../emitter');

const updateCoins = (pages) => {
  return new Promise(async (res, rej) => {
    try {
      const data = await coinGecko.getPages(pages);
      await Coin.Schema.upsertMany(data);
      res();
    } catch (e) {
      rej(e);
    }
  })
}

let updateCoinsTaskFetch = false;

// update every 6 minutes
// could take minutes
// cost: ~20 calls/minute
const updateCoinsTask = cron.schedule('*/6 * * * *', () => {
  console.log(`Firing off updateCoinsTask at ${new Date().toString()}`);
  !updateCoinsTaskFetch && updateCoins(40)
  .then(() => {
    emitter.emit('coinsUpdated');
    updateCoinsTaskFetch = false;
    // console.log('sucessfully updated the coins');
  })
  .catch((e) => {
    // BugsnagClient.notify(`error is the updateCoinsTask task: ${e.message}`);
    console.log(`error is the updateCoinsTask task: ${e.message}`);
    updateCoinsTaskFetch = false;
  });
  updateCoinsTaskFetch = true;
}, {
  scheduled: false,
  timezone: "America/Los_Angeles",
});

// updateCoins(40).catch(e => console.log(e))

module.exports = updateCoinsTask;
