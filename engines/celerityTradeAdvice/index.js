
require('dotenv').config();
const coinQueries = require('../../queries/coin');
const engine = require('../engine');
const logger = require('../../lib/logDna');
const BugsnagClient = require('../../lib/bugsnag');
const coinGecko = require('../../lib/coinGecko');
const alternative = require('../../lib/alternative');
const blockChainCenter = require('../../lib/blockchaincenter');
const coinMarketCal = require('../../lib/coinmarketcal');

// TODO: tokenomics analysis
const ath = require('./decisionNodes/ath');
const community = require('./decisionNodes/community');
const greedFearIndex = require('./decisionNodes/greedFearIndex')
const random = require('./decisionNodes/random');
const volumePrice = require('./decisionNodes/volumePrice');
const seasonQ = require('./decisionNodes/season');
const events = require('./decisionNodes/events');
const { CURRENCY, caps } = require('../../contants');

// needs 
// coin - coins/cardano api
// priceChartArr, volumeChartArr - coins/cardano/market_chart?vs_currency=usd&days=30 api
// gfIndex  - await alternative.getGreedFearIndex()
// season - await - await blockChainCenter.getSeason();

const getCelebrityTradeAdvice = ({
  coin, 
  priceChartArr, 
  volumeChartArr,
  gfIndex,
  season,
  numEvents,
}) => {
  const VERSION = 'beta.1';
  const engineResultObj = {};
  const marketSize = coinGecko.getMarketCapFromCoin(coin);
  const capSize = coinGecko.getCapSizeFromMarketCap(marketSize);
  
  // all time high 
  const athNode = ath.getDecisionNode({
    capSize,
    athPercentage: coinGecko.getATHPercentage(coin), 
    athDateStr: coinGecko.getATHDate(coin),
  });
  if (athNode) {
    engineResultObj[ath.name] = athNode;
  }

  // community
  const communityNode = community.getDecisionNode({
    capSize,
    communityScore: coin.community_score, 
    publicInterestScore: coin.public_interest_score, 
    sentimentVotesUpPerc: coin.sentiment_votes_up_percentage
  });
  if(communityNode) {
    engineResultObj[community.name] = communityNode;
  }

  // greed fear
  const greedFearIndexNode = greedFearIndex.getDecisionNode(gfIndex);
  if (greedFearIndexNode) {
    engineResultObj[greedFearIndex.name] = greedFearIndexNode;
  }

  // some randomness
  const randomNode = random.getDecisionNode();
  if (randomNode) {
    engineResultObj[random.name] = randomNode;
  }

  // volume and price relationships
  const volumePriceNode = volumePrice.getDecisionNode({
    priceChartArr,
    volumeChartArr,
  });
  if (volumePriceNode) {
    engineResultObj[volumePrice.name] = volumePriceNode;
  }

  // season
  const seasonNode = seasonQ.getDecisionNode(season);
  if (seasonNode) {
    engineResultObj[seasonQ.name] = seasonNode;
  }

  // events
  const eventsNode = events.getDecisionNode({
    capSize,
    numEvents,
  });
  if (eventsNode) {
    engineResultObj[events.name] = eventsNode;
  }

  const decision = engine.getDecisionFromEngineArr(Object.values(engineResultObj));
  Object.keys(engineResultObj).forEach((key) => {
    const [weight, bool] = engineResultObj[key];
    engineResultObj[key] = {weight, bool};
  });
  
  engineResultObj._v = VERSION;
  engineResultObj.summary = decision;
  return engineResultObj;
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

// use this to get advice without needing external deps
const getCelebrityTradeAdviceFromCoinId = async (coinId) => {
  try {
    const coin = await coinGecko.getCoin(coinId);
    const [priceChartArr, volumeChartArr] = await coinGecko.getCoinWithMarketChart(coinId)
      .then(coinGecko.getValuesOnlyFromMarketChart);
    const gfIndex = await alternative.getGreedFearIndex();
    const season = await blockChainCenter.getSeason();
    const numEvents = await coinMarketCal.getEvents(coin.name);
    const advice = getCelebrityTradeAdvice({
      coin, 
      priceChartArr, 
      volumeChartArr, 
      gfIndex, 
      season: season.band,
      numEvents,
    });
    
    return {
      coinId,
      timestamp: new Date(),
      currentPrice: coin.market_data.current_price[CURRENCY],
      advice
    };
  } 
  catch(e) {
    BugsnagClient.notify(`Error calling getCelebrityTradeAdviceFromCoinId: ${e.message}`);
    throw(e);
  }
}

const logPrediction = (predicitonData) => {
  logger.log(`celeb trade advice: ${process.env.REACT_APP_ENV}`, {
    level: 'info', 
    indexMeta: true,
    meta: predicitonData,
  });
}

// (async function() {
//   try {
//     const x = await getCelebrityTradeAdviceFromCoinId('safemoon');
//     console.log(x);
//   } catch(e) {
//     console.log(e)
//   }
// })();


module.exports = {
  getCelebrityTradeAdvice,
  getCelebrityTradeAdviceFromCoinId,
  logPrediction,
};
