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

let fetching = false;
const updateMetasTask = cron.schedule('0 */12 * * *', () => {
  // console.log('updating the coins...');
  !fetching && updateMetas().then(() => {
    fetching = false;
    // console.log('sucessfully updated the coins');
  }).catch((e) => {
    BugsnagClient.notify(`error in the updateMetas task: ${e.message}`);
    fetching = false;
  });
  fetching = true;
}, {
  timezone: "America/Los_Angeles"
});

module.exports = updateMetasTask;
