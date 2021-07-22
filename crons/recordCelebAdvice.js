const cron = require('node-cron');
const logger = require('../lib/logDna');
const { getCelebrityTradeAdviceFromCoinId, logPrediction } = require('../engines/celerityTradeAdvice');

let recordCelebAdviceTaskFetching = false;
const recordCelebAdviceTask = cron.schedule('30 12 * * *', () => {
  console.log(`Firing off recordCelebAdviceTask at ${new Date().toString()}`);
  !recordCelebAdviceTaskFetching && Promise.all([
    getCelebrityTradeAdviceFromCoinId('ethereum'),
    getCelebrityTradeAdviceFromCoinId('helium'),
    getCelebrityTradeAdviceFromCoinId('kishu-inu'),
  ]).then((respArr) => {
    recordCelebAdviceTaskFetching = false;
    if (respArr && Array.isArray(respArr)) {
      respArr.forEach(async (adviceObj) => {
        await logPrediction(adviceObj);
      })
    }
  }).catch((e) => {
    recordCelebAdviceTaskFetching = false;
  });
}, {
  scheduled: false,
  timezone: "America/Los_Angeles",
});

module.exports = recordCelebAdviceTask;
