require('./db');
const Coin = require('./models/Coin');

(function() {
  Coin.Schema.find({"market_data": null}, 'id').exec((err, res) => {
    console.log(res.length);
  })
})();