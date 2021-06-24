// Update them coins
const cron = require('node-cron');
const coinGecko = require('../lib/coinGecko');
const Coin = require('../models/Coin');

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
  
let fetching = false;
var updateCoinsTask = cron.schedule('*/300 * * * *', () => {
  // console.log('updating the coins...');
  !fetching && updateCoins(40).then(() => {
    fetching = false;
    // console.log('sucessfully updated the coins');
  }).catch((e) => {
    console.log("error is the updateCoinsTask task", e);
    fetching = false;
  });
  fetching = true;
});

module.exports = updateCoinsTask;
