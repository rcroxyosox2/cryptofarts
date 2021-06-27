const cron = require('node-cron');
const { getCelebrityTradeAdviceFromCoinId, logPrediction } = require('../engines/celerityTradeAdvice');

let fetching = false;
const recordCelebAdviceTask = cron.schedule('0 */2 * * *', () => {
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
