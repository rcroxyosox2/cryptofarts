// Update them coins
const cron = require('node-cron');
const BugsnagClient = require('../lib/bugsnag');
const blockChainCenter = require('../lib/blockchaincenter');
const alternative = require('../lib/alternative');
const Meta = require('../models/Meta');

const updateMetas = async () => {
  const season = await blockChainCenter.getSeason();
  const greedFearIndex = await alternative.getGreedFearIndex();
  return Meta.Schema.findOneAndUpdate({}, {season: season.band, greedFearIndex: greedFearIndex}, {upsert: true});
}

// (async function() {
//   await updateMetas();
// })();

let updateMetasTaskFetching = false;
const updateMetasTask = cron.schedule('0 */12 * * *', () => {
  console.log(`Firing off updateMetasTask at ${new Date().toString()}`);
  // console.log('updating the coins...');
  !updateMetasTaskFetching && updateMetas().then(() => {
    updateMetasTaskFetching = false;
    // console.log('sucessfully updated the coins');
  }).catch((e) => {
    // BugsnagClient.notify(`error in the updateMetas task: ${e.message}`);
    console.log(`error in the updateMetas task: ${e.message}`);
    updateMetasTaskFetching = false;
  });
  updateMetasTaskFetching = true;
}, {
  scheduled: false,
  timezone: "America/Los_Angeles",
});

module.exports = updateMetasTask;
