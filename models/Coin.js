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

/*
{
  "id": "bitcoin",
  "symbol": "btc",
  "name": "Bitcoin",
  "asset_platform_id": null,
  "platforms": {
    "": ""
  },
  "block_time_in_minutes": 10,
  "hashing_algorithm": "SHA-256",
  "categories": [
    "Cryptocurrency"
  ],
  "public_notice": null,
  "additional_notices": [],
  "description": {
    "en": "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>."
  },
  "links": {
    "homepage": [
      "http://www.bitcoin.org",
      "",
      ""
    ],
    "blockchain_site": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.com/",
      "",
      ""
    ],
    "official_forum_url": [
      "https://bitcointalk.org/",
      "",
      ""
    ],
    "chat_url": [
      "",
      "",
      ""
    ],
    "announcement_url": [
      "",
      ""
    ],
    "twitter_screen_name": "bitcoin",
    "facebook_username": "bitcoins",
    "bitcointalk_thread_identifier": null,
    "telegram_channel_identifier": "",
    "subreddit_url": "https://www.reddit.com/r/Bitcoin/",
    "repos_url": {
      "github": [
        "https://github.com/bitcoin/bitcoin",
        "https://github.com/bitcoin/bips"
      ],
      "bitbucket": []
    }
  },
  "image": {
    "thumb": "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
    "small": "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
    "large": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
  },
  "country_origin": "",
  "genesis_date": "2009-01-03",
  "sentiment_votes_up_percentage": 85.28,
  "sentiment_votes_down_percentage": 14.72,
  "market_cap_rank": 1,
  "coingecko_rank": 1,
  "coingecko_score": 81.994,
  "developer_score": 104.08,
  "community_score": 72.552,
  "liquidity_score": 99.974,
  "public_interest_score": 0.365,
  "community_data": {
    "facebook_likes": null,
    "twitter_followers": 2826039,
    "reddit_average_posts_48h": 7.333,
    "reddit_average_comments_48h": 1032.083,
    "reddit_subscribers": 3148529,
    "reddit_accounts_active_48h": 6183,
    "telegram_channel_user_count": null
  },
  "public_interest_stats": {
    "alexa_rank": 9440,
    "bing_matches": null
  },
  "status_updates": [],
  "last_updated": "2021-06-30T05:09:17.271Z"
}
*/


const coinSchema = new Schema(
  {
    id: {
      type: String,
      index: { unique: true },
    },
    name: String,
    ath: Number,
    ath_change_percentage: Number,
    ath_date: Date,
    circulating_supply: Number,
    coingecko_rank: Number,
    coingecko_score: Number,
    country_origin: String,
    community_score: Number,
    community_data: {
      facebook_likes: Number,
      twitter_followers: Number,
      reddit_average_posts_48h: Number,
      reddit_average_comments_48h: Number,
      reddit_subscribers: Number,
      reddit_accounts_active_48h: Number,
      telegram_channel_user_count: Number,
    },
    coreDataLastUpdated: Date,
    current_price: Number,
    description: {en: String},
    developer_score: Number,
    stolen_events: {
      count: Number,
      lastUpdated: Date,
    },
    fully_diluted_valuation: Number,
    genesis_date: Date,
    high_24h: Number,
    image: String,
    last_updated: Date,
    links: {
      homepage: [String],
      blockchain_site: [String],
      official_forum_url: [String],
      chat_url: [String],
      announcement_url: [String],
      twitter_screen_name: String,
      facebook_username: String,
      subreddit_url: String,
    },
    liquidity_score: Number,
    low_24h: Number,
    market_cap: Number,
    market_cap_change_24h: Number,
    market_cap_change_percentage_24h: Number,
    market_cap_rank: Number,
    max_supply: Number,
    price_change_24h: Number,
    price_change_percentage_24h: Number,
    public_interest_score: Number,
    public_interest_stats: {
      alexa_rank: Number,
      bing_matches: Number,
    },
    sentiment_votes_down_percentage: Number,
    sentiment_votes_up_percentage: Number,
    symbol: String,
    total_supply: Number,
    total_volume: Number,
    market_data: {
      lastUpdated: Date,
      prices: [[Number, Number]],
      market_caps: [[Number, Number]],
      total_volumes: [[Number, Number]],
    },
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
