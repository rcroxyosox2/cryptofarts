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
      respArr.forEach((adviceObj) => {
        // logdna can only index so deep
        const { advice, ...restOfStuff } = adviceObj;
        const test = {...restOfStuff, ...advice};
        logPrediction(test);
      })
    }
  }).catch((e) => {
    recordCelebAdviceTaskFetching = false;
  });
}, {
  timezone: "America/Los_Angeles"
});

module.exports = recordCelebAdviceTask;
