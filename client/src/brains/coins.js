// import { expiresInMinutes } from './general';
// import { randomResource } from 'utils';
import { uniqBy, filter, sortBy, reverse } from 'lodash';
import lodash from 'lodash';
// import { setCoinsLoadError } from 'redux/coins';
// specific to coingecko
export const COIN_CHANGE_KEY = 'price_change_percentage_24h';

export const currency = {
  USD: 'usd',
  BTC: 'btc',
};

export const currencySymbol = {
  USD: '$',
  BTC: '₿',
};

// Duplicated from BE/constants
// TODO: SHARE WITH BE
const caps = {
  TINY: 'tiny',
  SM: 'sm',
  MID: 'mid',
  MID2: 'mid2',
  MID3: 'mid3',
  LRG: 'lrg',
};

const capSizes = {
  [caps.TINY]: 0,
  [caps.SM]: 100_000_000,
  [caps.MID]: 1_000_000_000,
  [caps.LRG]: 10_000_000_000,
};

const getCapSizeFromCap = (cap, useCapSizes = capSizes) => {
  const arr = Object.values(useCapSizes);
  let size;
  arr.forEach((min, i) => {
    const max = arr[i+1];
    if (cap >= min && (max ? (cap < max) : true)) {
      size = Object.keys(useCapSizes)[i];
    }
  });
  return size;
}

// END TODO: SHARE WITH BE

export const filterCoinsByCapAndGreenRed = (coins = [], {capSelection, greenRedSelection} = {}) => {
  const filtered = coins.filter((coin) => {
    const coinCapSize = getCapSizeFromCap(coin.market_cap);
    const priceChange = coin[COIN_CHANGE_KEY];
    const coinGreenOrRed = (priceChange < 0) ? 'red' : 'green';
    const capSizeCondition = capSelection ? (coinCapSize === capSelection) : true;
    const greenRedCondition = greenRedSelection ? (coinGreenOrRed === greenRedSelection) : true;
    return capSizeCondition && greenRedCondition;
  }).sort((a,b) => {
    if(a[COIN_CHANGE_KEY] <= b[COIN_CHANGE_KEY]) { return (greenRedSelection === 'green') ? 1 : -1; }
    if(a[COIN_CHANGE_KEY] > b[COIN_CHANGE_KEY]) { return (greenRedSelection === 'green') ? -1 : 1; }
    return 0;
  });

  return filtered;

  // console.log(filtered);

};

// Coins are fetched at this interval
// export const checkForUpdatesInterval = (1000 * 60) * expiresInMinutes;

export const filterTickersByCurrencyTarget = (tickers, currency = currency.USD) => {
  return [...tickers].filter(item => item.target?.toLowerCase() === currency?.toLowerCase());
}

// percentage change in 24rs
export const coinPerformanceRanges = [
  [undefined, -10], // big dumps
  [-10, -8],
  [-8, -2],
  [-2, 0],
  [0, 2],
  [2, 8],
  [8, 10],
  [10, 20],
  [20, undefined], // big pumps
];

export const coinHasBigPump = (coin) => {
  return coin ? getItemIsInCoinRange(coin[COIN_CHANGE_KEY], coinPerformanceRanges[coinPerformanceRanges.length-1]) : false;
}

export const coinHasBigDump = (coin) => {
  return coin ? getItemIsInCoinRange(coin[COIN_CHANGE_KEY], coinPerformanceRanges[0]) : false;
}

export const getItemIsInCoinRange = (num, range) => {
  const [min, max] = range;
  return num > (min === undefined ? num-1 : min) && num <= (max === undefined ? num+1 : max);
}

export const getPumpsAndDumpsFromArr = ({coins, qty}) => {
  if (!coins || !qty || coins.length === 0) {
    // console.error('coins and qty are required in getPumpsAndDumpsFromArr');
    return [[],[]];
  }

  const sorted = sortBy(coins, [COIN_CHANGE_KEY]);
  const pumps = reverse(sorted.slice(-qty));
  const dumps = sorted.slice(0, qty);
  // const pumps = [randomResource(sorted), randomResource(sorted), randomResource(sorted), randomResource(sorted), randomResource(sorted)]
  return [pumps, dumps];
}

export const getTotalChangeFromCoinsResponse = (coins) => {
  if (!coins) {
    return;
  }
  return coins.reduce((a,c) => {
    return a + c[COIN_CHANGE_KEY];
  }, 0) / coins.length
}

export const filteredCoins = (coins) => {
  const uniq = uniqBy(coins, 'id');
  return filter(uniq, (coin) => {
    return coin[COIN_CHANGE_KEY] != null
      && coin.current_price != null;
  })
}

export const topCoins = (coins, rank) => {
  return filter(coins, (coin) => {
    return parseInt(coin.market_cap_rank) < rank;
  })
}

export const isGreenDay = (v) => lodash.toNumber(v) > 0;

