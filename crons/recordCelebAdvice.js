const cron = require('node-cron');
const logger = require('../lib/logDna');
const { getCelebrityTradeAdviceFromCoinId, logPrediction } = require('../engines/celerityTradeAdvice');

let fetching = false;
const recordCelebAdviceTask = cron.schedule('*/5 * * * *', () => {
  logger.info('Attempting to start cron job for celerityTradeAdvice...');
  !fetching && Promise.all([
    getCelebrityTradeAdviceFromCoinId('ethereum'),
    getCelebrityTradeAdviceFromCoinId('helium'),
    getCelebrityTradeAdviceFromCoinId('kishu-inu'),
  ]).then((respArr) => {
    fetching = false;
    if (respArr && Array.isArray(respArr)) {
      respArr.forEach((adviceObj) => {
        // logdna can only index so deep
        const { advice, ...restOfStuff } = adviceObj;
        const test = {...restOfStuff, ...advice};
        logPrediction(test);
      })
    }
  }).catch((e) => {
    fetching = false;
  });
});

module.exports = recordCelebAdviceTask;
