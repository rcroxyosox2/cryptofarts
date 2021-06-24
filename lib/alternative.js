//https://alternative.me/crypto/fear-and-greed-index/

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const BugsnagClient = require('./bugsnag');
// SEASON

const getSeason = async () => {
  let val;
  try {
    const body = await fetch('https://alternative.me/crypto/fear-and-greed-index/').then((r) => r.text());
    const $ = cheerio.load(body);
    val = parseFloat($('.fng-value').eq(0).find('.fng-circle').html());
  } catch(e) {
    BugsnagClient.notify('BROKEN SCRAPER: something went wrong when trying to get the page');
    return null;
  }
  if (!val) {
    BugsnagClient.notify('BROKEN SCRAPER: cant get the fear and greed index from the alternative.js script');
    return null;
  }
  else {
    return val;
  }
}

module.exports = {
  getSeason
};
