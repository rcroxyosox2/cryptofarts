const fetch = require("node-fetch");
const cheerio = require('cheerio');

// SEASON
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

const weakBuySeasons = [
  bands.HODL, bands.CHEAP, bands.ACCUMULATE
];

const strongBuySeasons = [
  bands.BUY, bands.FIRE_SALE
];

const weakSellSeasons = [
  bands.BUBBLE_MAYBE, bands.FOMO
];

const strongSellSeasons = [
  bands.SELL, bands.BUBBLE_CONFIRMED
];

const getSeason = async () => {
  const body = await fetch('https://www.blockchaincenter.net/bitcoin-rainbow-chart/').then((r) => r.text());
  const $ = cheerio.load(body);
  const $legend = $('.legend');
  const index = $legend.find('.active').index();
  
  const currentKey = index ? Object.keys(bands)[index] : bands.UNKNOWN;
  return { 
    bands,
    band: bands[currentKey],
  };
}

module.exports = {
  bands,
  weakBuySeasons,
  strongBuySeasons,
  weakSellSeasons,
  strongSellSeasons,
  getSeason,
};
