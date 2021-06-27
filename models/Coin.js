const mongoose = require('mongoose');
const upsertMany = require('@meanie/mongoose-upsert-many');
const Schema = mongoose.Schema;
const constants = require('../contants');
const { caps, capSizes } = constants;

/* 

ath: 64805
ath_change_percentage: -39.30792
ath_date: "2021-04-14T11:54:46.763Z"
atl: 67.81
atl_change_percentage: 57903.11497
atl_date: "2013-07-06T00:00:00.000Z"
circulating_supply: 18736887
current_price: 39438
fully_diluted_valuation: 828005233403
high_24h: 40321
id: "bitcoin"
image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
last_updated: "2021-06-17T07:36:40.721Z"
low_24h: 38137
market_cap: 738773356842
market_cap_change_24h: -16212056830.401611
market_cap_change_percentage_24h: -2.14733
market_cap_rank: 1
max_supply: 21000000
name: "Bitcoin"
price_change_24h: -872.759590307309
price_change_percentage_24h: -2.16507
roi: null
symbol: "btc"
total_supply: 21000000
total_volume: 38577283564

*/

const coinSchema = new Schema(
    {
        id: {
            type: String,
            index: true,
        },
        name: String,
        ath: Number,
        ath_change_percentage: Number,
        ath_date: Date,
        circulating_supply: Number,
        current_price: Number,
        fully_diluted_valuation: Number,
        high_24h: Number,
        image: String,
        last_updated: Date,
        low_24h: Number,
        market_cap: Number,
        market_cap_change_24h: Number,
        market_cap_change_percentage_24h: Number,
        market_cap_rank: Number,
        max_supply: Number,
        price_change_24h: Number,
        price_change_percentage_24h: Number,
        symbol: String,
        total_supply: Number,
        total_volume: Number,
        sparkline_in_7d: {
            price: [Number]
        }
    }, { 
        timestamps: { 
            createdAt: false, updatedAt: true 
        },
        upsertMany: {
            matchFields: ['id', 'name']
        },
    }
);

coinSchema.plugin(upsertMany);

module.exports = {
  Schema: mongoose.model("Coin", coinSchema, "coins"),
  caps,
  capSizes,
}
