const lodash = require('lodash');
const SUB_REDDIT = 'CryptoMoonShots';
const bscscan = require('./bscscan');
const etherscan = require('./etherscan');
const coinGecko = require('./coingecko');
const SORT = 'top';
const TIME_SPAN = 'day';
const MAX_RESULTS = 50;
const fetch = require("node-fetch");
const cryptaddress = require('cryptaddress-validator');
const { CURRENCY } = require('../contants');

// Returns 
// * contract name
// post title
// post body

const getPostBody = (post) => {
  return post.body || post.data.selftext;
}

const getPostTitle = (post) => {
  return post.title || post.data.title;
}

const getPostCreated = (post) => {
  return post.created || post.data.created;
}

const getPostFlairText = (post) => {
  return post.link_flair_text || post.data.link_flair_text;
}

const getPostEthAddress = (post) => {
  const body = getPostBody(post);
  const matches = body.match(cryptaddress('eth'));
  return matches && matches.length ? matches.sort((i) => i.indexOf('0x9'))[0] : null;
}

const getAssetPlatform = (post) => {
  const flairAssetPlatformMap = {
    'BSC Token': coinGecko.assetPlatforms.BSC,
    'Other (non BSC/ERC-20)': coinGecko.assetPlatforms.OTHER,
  };

  const platform = flairAssetPlatformMap[getPostFlairText(post)];
  return platform ? platform : coinGecko.assetPlatforms.OTHER;
}

const postHasEthAddress = (post) => {
  const match = getPostEthAddress(post);
  return !!match;
}

const getSub = async () => {
  const url = `https://www.reddit.com/r/${SUB_REDDIT}/${SORT}.json?sort=${SORT}&t=${TIME_SPAN}&limit=${MAX_RESULTS}`;
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    const posts = json.data.children;
    return posts
    .filter((post) => postHasEthAddress(post))
    .map((post) => {
      return {
        created: getPostCreated(post),
        body: getPostBody(post),
        title: getPostTitle(post),
        link_flair_text: getPostFlairText(post),
      }
    })
    .sort((posta, postb) => {
      return posta.created < postb.created;
    })
  }
}

const getContractData = async (contract, tryPlatform) => {
  const platformFunctionMap = {
    [coinGecko.assetPlatforms.BSC] : async () => {
      // const bsc = await coinGecko.getContractInfoFromBsc(contract);
      // if (bsc && !bsc.error) {
      //   return bsc;
      // }

      const bscScan = bscscan.getContractInfo(contract);
      if (bscScan) {
        return bscScan;
      }

      return {
        contract_address: contract
      }
    },
    [coinGecko.assetPlatforms.ETH]: async () => {
      // const eth = await coinGecko.getContractInfoFromEth(contract);
      // if (eth && !eth.error) {
      //   return eth;
      // }
    
      const ethScan = await etherscan.getContractInfo(contract);
      if (ethScan) {
        return ethScan;
      }

      return {
        contract_address: contract
      }
    },
  }

  const platformSearch = platformFunctionMap[tryPlatform];
  return platformSearch ? await platformSearch() : Promise.resolve({
    contract_address: contract
  });
}

const getContractPerPost = async (post) => {
  const throttle = 5;
  const ethAddress = getPostEthAddress(post);
  let contract;
  try {
    contract = await new Promise((res) => setTimeout(() => res(), throttle)).then(() => getContractData(ethAddress, getAssetPlatform(post)));
  } catch(e) {
    console.error(e);
  }

  return contract ? {
    name: contract.name,
    contract: contract.contract_address,
    links: contract.links,
    image: contract.image,
    public_interest_score: contract.public_interest_score,
    price: (contract.market_data) ? contract.market_data.current_price[CURRENCY] : null,
    ath_change_percentage: (contract.ath_change_percentage) ? contract.ath_change_percentage[CURRENCY] : null,
    ath_date: (contract.ath_date) ? contract.ath_date[CURRENCY] : null,
    market_cap: (contract.market_cap) ? contract.market_cap[CURRENCY] : null,
  } : {};
}

const getContractPerPosts = async (posts) => {
  let finalArr = [];
  let currentIndex = 0;
  while(currentIndex != posts.length-1) {
    const post = {...posts[currentIndex]};
    try {
      const contractData = await getContractPerPost(post);
      post.contractData = contractData;
      finalArr.push({
        contractData,
        ...post,
      });
      currentIndex = currentIndex + 1;
    } catch(e) {
      console.error(e);
      currentIndex = currentIndex + 1;
    }
  }
  return finalArr;
}

const getRedditAsMoonShots = async () => {
  const posts = await getSub();
  return await getContractPerPosts(posts);
}

(async function(){
  await getRedditAsMoonShots();
})()

// const m = '### Coco Swap not shaken by the market - Good time to get involved 🚀\n&amp;nbsp;\n&amp;nbsp;\n\n#####CoinMarketCap trending cryptos (24hours / 7days / 30days): \nhttps://coinmarketcap.com/trending-cryptocurrencies/\n\n\n&amp;nbsp;\n\nSome important insights about Coco Swap token and the team! \n&amp;nbsp;\n\n#####📊 Check Charts: [COCO Swap - Bogged Finance](https://charts.bogged.finance/?token=0x9AA6FC71aed1130DeE06a91A487BF5eA481dE80D)\n#####📊 CoinMarketCap and BSCscan price tracking completed\n\n&amp;nbsp;\n\nCoco Swap project started in March and it is listed on Pancakeswap in May. Right now all the community seems to be organic, they didn\'t boost the Telegram channel, their Twitter account is grown organic. BSC Scan Explorer seems to have verified them and added the their logo including the social networks. CoinMarketCap also listed them like 5 days ago, so the project seems to be pushing forward. The main purpose behind Coco Swap Token is to offer a decentralized transactions network token that operates on the Binance (BSC) services.   \n&amp;nbsp;\n&amp;nbsp;\n\n\n&amp;nbsp;\n&amp;nbsp;\n\n#####Below I\'ll list some links where you can check the project: \n\n&amp;nbsp;\n\n✅Coco Swap website: https://coco-swap.finance/\n&amp;nbsp;\n&amp;nbsp;\n\n✅Telegram: https://t.me/cocoswapofficial\n&amp;nbsp;\n&amp;nbsp;\n\n✅Pancakeswap link: https://exchange.pancakeswap.finance/#/swap?0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&amp;outputCurrency=0x9aa6fc71aed1130dee06a91a487bf5ea481de80d\n\n&amp;nbsp;'.match(cryptaddress('eth'))
// console.log(m);

module.exports = { 
  getPostBody,
  getPostTitle,
  getPostEthAddress,
  postHasEthAddress,
  getSub,
  getRedditAsMoonShots,
  getContractData
};
