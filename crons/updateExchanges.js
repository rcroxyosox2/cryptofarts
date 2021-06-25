// Update them coins
const cron = require('node-cron');
const coinGecko = require('../lib/coinGecko');
const Exchange = require('../models/Exchange');

const updateExchanges = () => {
  return new Promise(async (res, rej) => {
    try {
      const data = await coinGecko.getExchanges();
      await Exchange.Schema.upsertMany(data);
      res(data);
    } catch (e) {
      rej(e);
    }
  })
}

let fetching = false;
var updateExchangesTask = cron.schedule('0 0 * * *', () => {
  // console.log('updating the coins...');
  !fetching && updateExchanges().then(() => {
    fetching = false;
    // console.log('sucessfully updated the coins');
  }).catch((e) => {
    console.log("error is the updateCoinsTask task", e);
    fetching = false;
  });
  fetching = true;
});

module.exports = updateExchangesTask;