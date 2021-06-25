const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');
const Schema = mongoose.Schema;

/*
  "id": "binance",
  "name": "Binance",
  "year_established": 2017,
  "country": "Cayman Islands",
  "description": "",
  "url": "https://www.binance.com/",
  "image": "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250",
  "has_trading_incentive": false,
  "trust_score": 10,
  "trust_score_rank": 1,
  "trade_volume_24h_btc": 505558.56885957526,
  "trade_volume_24h_btc_normalized": 505558.56885957526
 */ 

const exchangeSchema = new Schema(
  {
    id: {
      type: String,
      index: true,
    },
    name: String,
    year_established: Number,
    country: String,
    description: String,
    url: String,
    image: String,
    has_trading_incentive: Boolean,
    trust_score: Number,
    trust_score_rank: Number,
    trade_volume_24h_btc: Number,
    trade_volume_24h_btc_normalized: Number,
  },{ 
    timestamps: { 
        createdAt: false, updatedAt: true 
    },
    upsertMany: {
        matchFields: ['id', 'name']
    },
});

exchangeSchema.plugin(upsertMany);

module.exports = {
  Schema: mongoose.model("Exchange", exchangeSchema, "exhanges"),
}
