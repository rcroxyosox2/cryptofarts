const mongo = require('../db');
const moment = require('moment');
const Coin = require('../models/Coin');
const { caps, capSizes, getNextCapSize, CURRENCY, COIN_CHANGE_KEY } = require('../contants');
const SICK_DEAL_MINIMUM_PERC = -10;

const fields = [
  'id',
  'name',
  'symbol',
  'image',
  'current_price',
  'ath_change_percentage',
  'sparkline_in_7d',
  COIN_CHANGE_KEY,
].join(' ');

const getCoin = (query = {}) => {
  return Coin.Schema.find(query).limit(1);
}

const getCoinEventCount = async (coinId) => {
  const events = await Coin.Schema.findOne({id: coinId}).select('stolen_events');
  return (events) ? events.stolen_events.count : 0;
}

const getTopCoinInCapSize = async (capSize, useCapSizes = capSizes) => {
  const nextCapSize = getNextCapSize(capSize, useCapSizes);
  console.log(capSize, nextCapSize);
  const sort = {
    'market_cap': -1
  };
  const query = {
    "market_cap": {
      $gte: useCapSizes[capSize]
    }
  }

  if (nextCapSize) {
    query.market_cap['$lt'] = useCapSizes[nextCapSize];
  }

  await mongo();
  const doc = await Coin.Schema.find(query).sort(sort).select(fields + ' market_cap').limit(1);
  return Array.isArray(doc) ? doc[0] : doc;
}

const getSickDealCoins = async () => {
  const { Schema, capSizes, caps } = Coin;
  const sort = {
    'market_cap': -1,
    'ath_change_percentage': 1, 
  };
  const LIMIT = 50;
  const fields = [
    'id',
    'name',
    'symbol',
    'image',
    'current_price',
    'ath_change_percentage',
  ].join(' ');
  
  const requirement = {
    $lt: SICK_DEAL_MINIMUM_PERC,
  };
  
  // const tinyCaps = Schema.find({
  //   "market_cap": {
  //     $gte: capSizes[caps.TINY], 
  //     $lt: capSizes[caps.SM]
  //   },
  //   "genesis_date": {
  //     "$lte": moment().add(1, "year").toDate(),
  //   },
  //   "ath_change_percentage": requirement
  // }).sort(sort).limit(50);

  // const smallCaps = Schema.find({
  //   "market_cap": {
  //     $gte: capSizes[caps.SM], 
  //     $lt: capSizes[caps.MID]
  //   },
  //   "genesis_date": {
  //     "$lte": moment().add(1, "year").toDate(),
  //   },
  //   "coingecko_score": {
  //     "$gte": 40,
  //   },
  //   "price_change_percentage_24h": {
  //     "$gte": 0.5,
  //   },
  //   "ath_change_percentage": requirement
  // }).select(fields).sort(sort).limit(LIMIT);

  // const midCaps = Schema.find({
  //   "market_cap": {
  //     $gte: capSizes[caps.MID], 
  //     $lt: capSizes[caps.LRG]
  //   },
  //   "ath_change_percentage": requirement
  // }).select(fields).sort(sort).limit(LIMIT);
  await mongo();
  return Schema.find({
    'market_cap': {
      $gte: capSizes[caps.MID2], 
    },
    'ath_change_percentage': requirement
  }).select(fields).sort(sort).limit(LIMIT);

  // return await Promise.all([
  //   smallCaps,
  //   midCaps,
  //   lrgCaps
  // ]).then((res) => {
  //   const [sm, mid, lrg] = res;
  //   return {
  //     [caps.SM]: sm,
  //     [caps.MID]: mid,
  //     [caps.LRG]: lrg,
  //   }
  // })
}

const getAvg24hrPriceChangePerc = async () => {
  await mongo();
  const docs = await Coin.Schema.aggregate([
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

  return { avgChangePerc24hr: docs[0].avgChangePerc24hr };
}

const searchCoinsWithAutocomplete = (term) => {
  return Coin.Schema.aggregate([
    {
      '$search': {
        'index': 'coinsearch', 
        'compound': {
          'should': [
            {
              'autocomplete': {
                'query': `${term}`, 
                'path': 'name'
              }
            }, {
              'autocomplete': {
                'query': `${term}`, 
                'path': 'symbol'
              }
            }
          ]
        }
      }
    }, {
      '$project': {
        id: 1,
        name: 1,
        symbol: 1,
        image: 1,
        sparkline_in_7d: 1,
        community_score: 1,
        market_cap: 1,
        current_price: 1,
        [COIN_CHANGE_KEY]: 1,
      }
    }, {
      '$sort': {
        'market_cap': -1
      }
    }, {
      '$limit': 5
    }
  ])
}

const getGreensRedsByQuery = async ({redOrGreen = 'red', cap = caps.LRG, maxResults = 10} = {}) => {
  const sort = {"price_change_percentage_24h": (redOrGreen === 'red') ? 1 : -1 };
  if (!Object.values(caps).includes(cap)) {
    throw new Error(`${cap} not found in ${caps}`);
    return;
  }

  const query = {
    $gte: capSizes[cap],
  };

  const nextCapSize = getNextCapSize(cap);
  if (nextCapSize) {
    query['$lt'] = capSizes[nextCapSize];
  };

  await mongo();
  return Coin.Schema.find({
    'market_cap': query,
    'price_change_percentage_24h': (
      (redOrGreen === 'red') 
      ? {"$lt" : 0} 
      : {"$gt" : 0}),
  }).select(fields).sort(sort).limit(maxResults);
}

const getGreensReds = async () => {
  const LIMIT = 10;
  const project = {
    '$project': {
      id: 1,
      name: 1,
      symbol: 1,
      image: 1,
      sparkline_in_7d: 1,
      current_price: 1,
      [COIN_CHANGE_KEY]: 1,
    }
  };

  await mongo();
  const doc = await Coin.Schema.aggregate([
    {
      $facet: {
        smred: [{
          $match: {
              price_change_percentage_24h: {
                $lt: 0
              },
              market_cap: {
                $gte: capSizes[caps.SM],
                $lte: capSizes[caps.MID]
              }
            }
          },
          {$sort: {price_change_percentage_24h:1}},
          {$limit: LIMIT},
          project,
        ],
        smgreen: [{
          $match: {
              price_change_percentage_24h: {
                $gt: 0
              },
              market_cap: {
                $gte: capSizes[caps.SM],
                $lte: capSizes[caps.MID]
              }
            }
          },
          {$sort: {price_change_percentage_24h:-1}},
          {$limit: LIMIT},
          project,
        ],
       midred: [{
          $match: {
              price_change_percentage_24h: {
                $lt: 0
              },
              market_cap: {
                $gte: capSizes[caps.MID],
                $lte: capSizes[caps.LRG]
              }
            }
          },
          {$sort: {price_change_percentage_24h:1}},
          {$limit: LIMIT},
          project,
        ],
        midgreen: [{
          $match: {
              price_change_percentage_24h: {
                $gt: 0
              },
              market_cap: {
                $gte: capSizes[caps.MID],
                $lte: capSizes[caps.LRG]
              }
            }
          },
          {$sort: {price_change_percentage_24h:-1}},
          {$limit: LIMIT},
          project,
        ],
        lrgred: [{
          $match: {
              price_change_percentage_24h: {
                $lt: 0
              },
              market_cap: {
                $gte: capSizes[caps.LRG]
              }
            }
          },
          {$sort: {price_change_percentage_24h:1}},
          {$limit: LIMIT},
          project,
        ],
        lrggreen: [{
          $match: {
              price_change_percentage_24h: {
                $gt: 0
              },
              market_cap: {
                $gte: capSizes[caps.LRG]
              }
            }
          },
          {$sort: {price_change_percentage_24h:-1}},
          {$limit: LIMIT},
          project,
        ],
      }
    }
  ])

  return Array.isArray(doc) ? doc[0] : doc;
}

// (async function() {
//   const x = await Coin.Schema.findOne({id: 'bitcoin'}).select('stolen_events');
//   return x.stolen_events.count;
// })();


// (async function() {
//   const term = 'bitcoin';
//   const timetaken = "Time taken by addCount coin agg search";
//   console.time(timetaken);
//   await Coin.Schema.aggregate([
//     {
//       '$search': {
//         'index': 'coinsearch', 
//         'compound': {
//           'should': [
//             {
//               'autocomplete': {
//                 'query': `${term}`, 
//                 'path': 'name'
//               }
//             }, {
//               'autocomplete': {
//                 'query': `${term}`, 
//                 'path': 'symbol'
//               }
//             }
//           ]
//         }
//       }
//     }, {
//       '$limit': 10
//     }
//   ])
//   console.timeEnd(timetaken);
// })();

// (async function() {
//   await mongo();
//   // const x = await getGreensRedsByQuery();
//   const x = await getTopCoinInCapSize(caps.TINY);
//   console.log(x);
// })();

module.exports = { 
  fields,
  getCoin,
  getSickDealCoins,
  getAvg24hrPriceChangePerc,
  searchCoinsWithAutocomplete,
  getCoinEventCount,
  getTopCoinInCapSize,
  getGreensReds
};
