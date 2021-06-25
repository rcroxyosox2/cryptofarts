const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const fetch = require('node-fetch');
const RESULTS_PER_PAGE = 250;

const getPage = async(page) => {
    const response = await CoinGeckoClient.coins.markets({
        sparkline: true,
        per_page: RESULTS_PER_PAGE,
        page
    });
    return response.data;
}
  
const getPages = async (maxPages = 40) => {
    let currentPage = 1;
    let stilGoing = true;
    let finalArr = [];
    while(stilGoing) {
      const pageData = await getPage(currentPage);
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
      const json = await response.json();
      return json;
    });
  return response;
}

const getContractInfoFromEth = async (contract) => {
  return await getContractInfo(contract, assetPlatforms.ETH);
}

const getContractInfoFromBsc = async (contract) => {
  return await getContractInfo(contract, assetPlatforms.BSC);
}

getExchanges();

module.exports = { 
  getPages,
  getExchanges,
  assetPlatforms,
  getContractInfo,
  getContractInfoFromBsc,
  getContractInfoFromEth
};