const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const getPage = async(page) => {
    const response = await CoinGeckoClient.coins.markets({
        sparkline: true,
        per_page: 250,
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

module.exports = { getPages };