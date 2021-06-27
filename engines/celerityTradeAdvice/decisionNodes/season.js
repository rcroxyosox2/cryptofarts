const blockChainCenter = require('../../../lib/blockChainCenter');

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

// use - const index = await alternative.getSeason();
const getDecisionNode = (season) => {
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
  name: 'season',
  getDecisionNode,
}