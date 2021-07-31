// https://companiesmarketcap.com/gold/marketcap/

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const BugsnagClient = require('./bugsnag');
// SEASON

const getGoldMarketCap = async () => {
  let val;
  try {
    const body = await fetch('https://companiesmarketcap.com/gold/marketcap/').then((r) => r.text());
    const $ = cheerio.load(body);
    const multMap = {
      'T': 1_000_000_000_000,
      'B': 1_000_000_000,
    };
    const [valStr, multKey] = $('.table-container h2').html().split(':')[1].replace(/^ \$/g, '').split(' ');
    val = parseFloat(valStr) * multMap[multKey];
    if (!val) {
      return 11636000000000;
    }
  } catch(e) {
    BugsnagClient.notify('BROKEN SCRAPER: something went wrong when trying to get the page');
    return null;
  }
  if (!val) {
    BugsnagClient.notify('BROKEN SCRAPER: val from the gold.js script');
    return null;
  }
  else {
    return val;
  }
}

// (async function() {
//   const x = await getGoldMarketCap();
//   console.log(x);
// })();

module.exports = {
  getGoldMarketCap
};
