// Update them coins
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const coinGecko = require('../lib/coinGecko');
const Exchange = require('../models/Exchange');

const updateExchanges = async () => {
  const data = await coinGecko.getExchanges();
  await Exchange.Schema.upsertMany(data);
}

let updateExchangesTaskFetching = false;
// Update every monday at 1:00pm
// cost: ~2 calls/minute
const updateExchangesTask = cron.schedule('00 13 * * 1', () => {
  console.log(`Firing off updateExchangesTask at ${new Date().toString()}`);
  // console.log('updating the coins...');
  !updateExchangesTaskFetching && updateExchanges().then(() => {
    updateExchangesTaskFetching = false;
    // console.log('sucessfully updated the coins');
  }).catch((e) => {
    // BugsnagClient.nofify(`error is the updateExchangesTask task: ${e.message}`);
    console.log(`error is the updateExchangesTask task: ${e.message}`);
    updateExchangesTaskFetching = false;
  });
  updateExchangesTaskFetching = true;
}, {
  scheduled: false,
  timezone: "America/Los_Angeles",
});

module.exports = updateExchangesTask;