const moment = require('moment');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const Coin = require('../models/Coin');
const fetch = require('node-fetch');
const { CURRENCY, caps, capSizes } = require('../contants');
const delay = require('delay');
const RESULTS_PER_PAGE = 250;

const getPage = async(page) => {
  const response = await CoinGeckoClient.coins.markets({
      sparkline: true,
      per_page: RESULTS_PER_PAGE,
      page
  });
  const data = response.data;
  return data;
}
  
const getPages = async (maxPages = 40) => {
  let currentPage = 1;
  let stilGoing = true;
  let finalArr = [];
  while(stilGoing) {
    const pageData = await getPage(currentPage);
    await delay(100);
    if (pageData.length > 0 && currentPage <= maxPages) {
      finalArr.push(...pageData);
      currentPage++;
    } else {
      stilGoing = false;
    }
  }
  return finalArr;
}

const getExchange = async (page) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/exchanges?per_page=${RESULTS_PER_PAGE}&page=${page}`)
    .then((response) => response.json());
  return response;
}

const getExchanges = async (maxPages = 5) => {
  let currentPage = 1;
  let stilGoing = true;
  let finalArr = [];
  while(stilGoing) {
    const pageData = await getExchange(currentPage);
    if (pageData.length > 0 && currentPage <= maxPages) {
      finalArr.push(...pageData);
      currentPage++;
    } else {
      stilGoing = false;
    }
  }
  return finalArr;
}

// contract: 0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82
// platform: binance-smart-chain
const assetPlatforms = {
  BSC: 'binance-smart-chain',
  ETH: 'ethereum',
  OTHER: 'other',
};

const getContractInfo = async (contract, platform) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${platform}/contract/${contract}`)
    .then(async (response) => {
      // console.log(response);
      const json = await response.json();
      return json;
    });
  return response;
}

const getTrending = async () => {
  const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
    .then(async (response) => {
      const json = await response.json();
      return (json) ? json.coins : null;
    });
  return response;
}

const getCoin = async (coinId, params = {}) => {
  const errorMessage = 'could not fetch coin';
  return await CoinGeckoClient.coins.fetch(coinId, params)
    .then((resp) => {
      if (!resp) {
        throw new Error(errorMessage);
        return null;
      }

      if (!resp.success) {
        throw resp.data.error ? new Error(resp.data.error) : new Error(errorMessage);
        return null;
      }

      const data = {...resp.data};
      if (data) {
        const {market_data, ...filtered} = data;
        if (market_data && Object.keys(market_data).length) {
          [
            'current_price', 
            'ath', 
            'ath_change_percentage', 
            'ath_date', 
            'market_cap', 
            'fully_diluted_valuation', 
            'market_cap_rank',
            'total_volume',
            'high_24h', 
            'low_24h',
            'price_change_24h',
            'price_change_percentage_24h',
            'market_cap_change_24h',
            'market_cap_change_percentage_24h',
            'total_supply',
            'max_supply',
            'circulating_supply',
          ]
          .forEach((prop) => {
            filtered[prop] = (!!market_data[prop] && typeof market_data[prop] === 'object') ? market_data[prop][CURRENCY] : market_data[prop];
          })

          if (market_data.last_updated) {
            filtered.last_updated = moment(market_data.last_updated).toDate();
          }
        }

        if (filtered.image.large) {
          filtered.image = filtered.image.large;
        }

        return filtered;
      }
    });
}

// returns [[prices], [volumes]];
const getValuesOnlyFromMarketChart = (marketChartResponse) => {
  const keys = {
    PRICE: 'prices',
    VOLUME: 'total_volumes'
  };
  const priceChart = marketChartResponse[keys.PRICE];
  const volumeChart = marketChartResponse[keys.VOLUME];

  const extractionFn = (item) => {
    const [date, val] = item;
    return val;
  };

  if (priceChart && volumeChart) {
    return [priceChart.map(extractionFn), volumeChart.map(extractionFn)];
  }

  return [];
}

const getCoinWithMarketChart = async (coinId, params = {
  days: 30,
  vs_currency: 'usd',
}) => {
  return await CoinGeckoClient.coins.fetchMarketChart(coinId, params).then((response) => {
    return response.data;
  });
}

const getContractInfoFromEth = async (contract) => {
  return await getContractInfo(contract, assetPlatforms.ETH);
}

const getContractInfoFromBsc = async (contract) => {
  return await getContractInfo(contract, assetPlatforms.BSC);
}

const getMarketCapFromCoin = (coin) => {
  return coin.market_cap;
}

const getATHPercentage = (coin) => {
  return coin.ath_change_percentage;
}

const getATHDate = (coin) => {
  return coin.athDate || coin.ath_date; //market_data.ath_date[CURRENCY];
}

const getCapSizeFromMarketCap = (marketCap) => {
  if (marketCap >= capSizes[caps.TINY] && marketCap < capSizes[caps.SM]) {
    return caps.TINY
  }

  if (marketCap >= capSizes[caps.SM] && marketCap < capSizes[caps.MID]) {
    return caps.SM
  }

  if (marketCap >= capSizes[caps.MID] && marketCap < capSizes[caps.LRG]) {
    return caps.MID
  }

  if (marketCap >= capSizes[caps.LRG]) {
    return caps.LRG
  }
}

module.exports = { 
  assetPlatforms,
  getATHDate,
  getATHPercentage,
  getCapSizeFromMarketCap,
  getCoin,
  getCoinWithMarketChart,
  getContractInfo,
  getContractInfoFromBsc,
  getContractInfoFromEth,
  getExchanges,
  getMarketCapFromCoin,
  getPages,
  getTrending,
  getValuesOnlyFromMarketChart,
};