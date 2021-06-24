const Coin = require('../models/Coin');

const SICK_DEAL_MINIMUM_PERC = -10;

const caps = {
  TINY: 'tiny',
  SM: 'sm',
  MID: 'mid',
  LRG: 'lrg',
}

const getSickDealCoins = async () => {
  const { Schema, capSizes } = Coin;
  const sort = {"ath_change_percentage": "asc"};
  const requirement = {
    $lt: SICK_DEAL_MINIMUM_PERC,
  };
  
  const tinyCaps = Schema.find({
    "market_cap": {
      $gte: capSizes[caps.TINY], 
      $lt: capSizes[caps.SM]
    },
    "ath_change_percentage": requirement
  }).sort(sort).limit(50);

  const smallCaps = Schema.find({
    "market_cap": {
      $gte: capSizes[caps.SM], 
      $lt: capSizes[caps.MID]
    },
    "ath_change_percentage": requirement
  }).sort(sort).limit(50);

  const midCaps = Schema.find({
    "market_cap": {
      $gte: capSizes[caps.MID], 
      $lt: capSizes[caps.LRG]
    },
    "ath_change_percentage": requirement
  }).sort(sort).limit(50);

  const lrgCaps = Schema.find({
    "market_cap": {
      $gte: capSizes[caps.LRG], 
    },
    "ath_change_percentage": requirement
  }).sort(sort).limit(50);

  return await Promise.all([
    tinyCaps,
    smallCaps,
    midCaps,
    lrgCaps
  ]).then((res) => {
    const [tiny, sm, mid, lrg] = res;
    return {
      [caps.TINY]: tiny,
      [caps.SM]: sm,
      [caps.MID]: mid,
      [caps.LRG]: lrg,
    }
  })
}

const getAvg24hrPriceChangePerc = async () => {
  const docs = await Schema.aggregate([
    { 
      $match: {
        price_change_percentage_24h: {
          $exists: true
        },
        market_cap_rank: {
          $lt: 100
        }
      }
    },
    {
      $group: {
        _id: null,
        avgChangePerc24hr: {
          $avg: "$price_change_percentage_24h"
        }
      }
    }
  ]);

  return docs[0].avgChangePerc24hr;
}

module.exports = { 
  caps,
  getSickDealCoins,
  getAvg24hrPriceChangePerc
};
