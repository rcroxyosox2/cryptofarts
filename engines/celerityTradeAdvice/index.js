
const engine = require('../engine');

// const alternative = require('../../lib/alternative');

// TODO: tokenomics analysis
const ath = require('./decisionNodes/ath');
const community = require('./decisionNodes/community');
const greedFearIndex = require('./decisionNodes/greedFearIndex')
const random = require('./decisionNodes/random');
const volumePrice = require('./decisionNodes/volumePrice');
const CURRENCY = 'usd';

// needs 
// coin - coins/cardano api
// priceChartArr, volumeChartArr - coins/cardano/market_chart?vs_currency=usd&days=30 api
// greedFearIndex  - await alternative.getSeason()

const getCelebrityTradeAdvice = ({
  coin, 
  priceChartArr, 
  volumeChartArr,
  gfIndex,
}) => {
  const engineArr = [];
  
  const athNode = ath.getDecisionNode(coin.ath_change_percentage[CURRENCY], coin.ath_date[CURRENCY]);
  engineArr.push(athNode);

  const communityNode = ath.getDecisionNode(coin.community_score, coin.public_interest_score, coin.sentiment_votes_up_percentage);
  engineArr.push(communityNode);

  const greedFearIndexNode = greedFearIndex.getDecisionNode(gfIndex);
  engineArr.push(greedFearIndexNode);

  const randomNode = random.getDecisionNode();
  engineArr.push(randomNode);

  const volumePriceNode = volumePrice.getDecisionNode(priceChartArr, volumeChartArr);
  engineArr.push(volumePriceNode);

  console.log(engineArr);
  return engine.getDecisionFromEngineArr(engineArr);
}


const coin = {
  ath_change_percentage: -20, 
  ath_date: new Date(),
  community_score: 0.31,
  public_interest_score: 0.04,
  sentiment_votes_up_percentage: 70,
};

// const priceChartArr = [1,2,2,2,3,4,8,9,10,12,17,18,20];
// const volumeChartArr = [1,2,2,2,3,4,8,9,10,12,17,18,20]
// const gfIndex = 15;
// getCelebrityTradeAdvice({coin, priceChartArr, volumeChartArr, gfIndex})

module.exports = {
  getCelebrityTradeAdvice,
};
