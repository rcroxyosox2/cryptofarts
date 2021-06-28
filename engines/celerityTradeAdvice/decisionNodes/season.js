const blockChainCenter = require('../../../lib/blockchaincenter');

/*
 const bands = {
  BUBBLE_CONFIRMED: 'bubbleconfirmed',
  SELL: 'sell',
  FOMO: 'fomo',
  BUBBLE_MAYBE: 'bubblemaybe',
  HODL: 'hodl',
  CHEAP: 'cheap',
  ACCUMULATE: 'accumulate',
  BUY: 'buy',
  FIRE_SALE: 'firesale',
  UNKNOWN: 'unknown',
};
*/

const name = 'season';

// use - const index = await alternative.getSeason();
const getDecisionNode = (season) => {

  if (typeof season != 'string') {
    console.error(`params not correctly set in decision node: ${name}`);
    return null;
  }

  let bool = false;
  let weight = 1;
  // if in a strong season
  if (blockChainCenter.strongBuySeasons.includes(season) || blockChainCenter.strongSellSeasons.includes(season)) {
    weight = 1.5;
  }

  if (blockChainCenter.weakBuySeasons.includes(season) || blockChainCenter.strongBuySeasons.includes(season)) {
    bool = true;
  }

  return [weight, bool];
}

module.exports = {
  name,
  getDecisionNode,
}