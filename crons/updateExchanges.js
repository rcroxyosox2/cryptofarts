// Update them coins
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const coinGecko = require('../lib/coinGecko');
const Exchange = require('../models/Exchange');

const updateExchanges = async () => {
  const data = await coinGecko.getExchanges();
  await Exchange.Schema.upsertMany(data);
}

let fetching = false;
const updateExchangesTask = cron.schedule('30 13 * * *', () => {
  // console.log('updating the coins...');
  !fetching && updateExchanges().then(() => {
    fetching = false;
    // console.log('sucessfully updated the coins');
  }).catch((e) => {
    BugsnagClient.nofify(`error is the updateExchangesTask task: ${e.message}`);
    fetching = false;
  });
  fetching = true;
}, {
  timezone: "America/Los_Angeles"
});

module.exports = updateExchangesTask;