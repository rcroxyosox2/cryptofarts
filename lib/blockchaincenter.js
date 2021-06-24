const fetch = require("node-fetch");
const cheerio = require('cheerio');

// SEASON

const getSeason = (cb) => {
  request({
    method: 'GET',
    url: 'https://www.blockchaincenter.net/bitcoin-rainbow-chart/'
  }, (err, innerRes, body) => {
    
    if (err) {
      innerRes.status(500).render('error', {
        error: err
      });
    };
  
    const $ = cheerio.load(body);
    const $legend = $('.legend');
    const index = $legend.find('.active').index();
  
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
  
    const currentKey = index ? Object.keys(bands)[index] : bands.UNKNOWN;
    cb({ 
      bands,
      currentKey,
      percPriceChange24Hr,
    })
  })
}

module.exports = {
  getSeason
};
