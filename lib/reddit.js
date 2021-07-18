const lodash = require('lodash');
const SUB_REDDIT = 'CryptoMoonShots';
const bscscan = require('./bscscan');
const etherscan = require('./etherscan');
const coinGecko = require('./coinGecko');
const SORT = 'top';
const TIME_SPAN = 'day';
const fetch = require("node-fetch");
const cryptaddress = require('cryptaddress-validator');
const { CURRENCY } = require('../contants');

// Returns 
// * contract name
// post title
// post body

const getPostId = (post) => {
  return post ? (post.id || post.data.id) : null; 
}

const getPostBody = (post) => {
  const body = post ? (post.body || post.data.selftext) : null;
  // const regex = /&#x200B;/g;
  // console.log(regex.match(body));
  return body.replace(/#x200B;/g, '').replace('&amp;', '&');
}

const getPostTitle = (post) => {
  const title = post ? (post.title || post.data.title) : null;
  return title.replace(/#x200B;/g, '').replace('&amp;', '&');
}

const getPostCreated = (post) => {
  return post ? (post.created || post.data.created) : null;
}

const getPostFlairText = (post) => {
  return post ? (post.link_flair_text || post.data.link_flair_text) : null;
}

const getPostSymbol = (post) => {
  const regex = /\$[a-zA-Z]+/g;
  const namesInTitle = post.title.match(regex);
  const namesInBody = post.body.match(regex);
  let name;
  
  if (namesInBody && namesInBody.length) {
    name = namesInBody[0];
  }

  if (namesInTitle && namesInTitle.length) {
    name = namesInTitle[0];
  }

  return name ? name.replace('$', '') : null;
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

const pluckValuesFromPost = (post) => {
  return {
    id: getPostId(post),
    created: getPostCreated(post),
    body: getPostBody(post),
    title: getPostTitle(post),
    link_flair_text: getPostFlairText(post),
  }
}

const getPost = async ({id = null} = {}) => {
  const url = `https://www.reddit.com/${id}/.json`;
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    const result = (Array.isArray(json)) ? json[0] : json;
    const postData = result ? result.data : null;
    const post = (postData) ? (Array.isArray(postData.children) ? postData.children[0] : postData) : null;
    return (post) ? pluckValuesFromPost(post) : null;
  }
}

const getSub = async ({maxResults = 50} = {}) => {
  const url = `https://www.reddit.com/r/${SUB_REDDIT}/${SORT}.json?sort=${SORT}&t=${TIME_SPAN}&limit=${maxResults*2}`;
  const response = await fetch(url);
  if (response.ok) {
    const json = await response.json();
    const posts = json.data.children;
    return posts
    .filter((post) => postHasEthAddress(post))
    .map(pluckValuesFromPost)
    .sort((posta, postb) => {
      return posta.created < postb.created;
    }).slice(0, maxResults)
  }
}


const getContractData = async (contract, tryPlatform) => {
  const platformFunctionMap = {
    [coinGecko.assetPlatforms.BSC] : async () => {
      const bsc = await coinGecko.getContractInfoFromBsc(contract);
      if (bsc && !bsc.error) {
        return bsc;
      }

      const bscScan = bscscan.getContractInfo(contract);
      if (bscScan) {
        return bscScan;
      }

      return {
        contract_address: contract
      }
    },
    [coinGecko.assetPlatforms.ETH]: async () => {
      const eth = await coinGecko.getContractInfoFromEth(contract);
      if (eth && !eth.error) {
        return eth;
      }
    
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
  const name = getPostSymbol(post);

  let contract;
  try {
    contract = await new Promise((res) => setTimeout(() => res(), throttle)).then(() => getContractData(ethAddress, getAssetPlatform(post)));
  } catch(e) {
    console.error(e);
  }

  return contract ? {
    name: contract.name || name,
    contract: contract.contract_address,
    links: contract.links,
    image: contract.image,
    public_interest_score: contract.public_interest_score,
    price: (contract.market_data) ? contract.market_data.current_price[CURRENCY] : null,
    ath_change_percentage: (contract.ath_change_percentage) ? contract.ath_change_percentage[CURRENCY] : null,
    ath_date: (contract.ath_date) ? contract.ath_date[CURRENCY] : null,
    market_cap: (contract.market_cap) ? contract.market_cap[CURRENCY] : null,
  } : {
    name,
    contract: ethAddress
  };
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

const getRedditAsMoonShots = async ({id, maxResults}) => {
  if (id) {
    const post = await getPost({id});
    
    if (!post) {
      return null;
    }

    const contractData = await getContractPerPost(post);
    // console.log(contractData);
    
    return {
      ...post,
      contractData
    };
  }

  return await getSub({maxResults});
}

let pollInterval = null;
let maxResultsSet = null;
const pollMoonShots = (io, maxResults) => {

  if (maxResultsSet === maxResults && !!pollInterval) {
    return;
  }

  pollInterval && clearInterval(pollInterval);

  let moonShotsFetching = false;
  let interval = 1000 * 60 * 5;  // poll every 5 mins

  maxResultsSet = maxResults;
  pollInterval = setInterval(async() => {
    if (moonShotsFetching) {
      return;
    }
  
    moonShotsFetching = true;
  
    const moonShots = await getRedditAsMoonShots({ maxResults });
  
    moonShotsFetching = false;
  
    io.sockets.emit('moonshots', moonShots);
  
  }, interval);
}

// (async function(){
//   await getSub(3);
// })()

// const m = '### Coco Swap not shaken by the market - Good time to get involved 🚀\n&amp;nbsp;\n&amp;nbsp;\n\n#####CoinMarketCap trending cryptos (24hours / 7days / 30days): \nhttps://coinmarketcap.com/trending-cryptocurrencies/\n\n\n&amp;nbsp;\n\nSome important insights about Coco Swap token and the team! \n&amp;nbsp;\n\n#####📊 Check Charts: [COCO Swap - Bogged Finance](https://charts.bogged.finance/?token=0x9AA6FC71aed1130DeE06a91A487BF5eA481dE80D)\n#####📊 CoinMarketCap and BSCscan price tracking completed\n\n&amp;nbsp;\n\nCoco Swap project started in March and it is listed on Pancakeswap in May. Right now all the community seems to be organic, they didn\'t boost the Telegram channel, their Twitter account is grown organic. BSC Scan Explorer seems to have verified them and added the their logo including the social networks. CoinMarketCap also listed them like 5 days ago, so the project seems to be pushing forward. The main purpose behind Coco Swap Token is to offer a decentralized transactions network token that operates on the Binance (BSC) services.   \n&amp;nbsp;\n&amp;nbsp;\n\n\n&amp;nbsp;\n&amp;nbsp;\n\n#####Below I\'ll list some links where you can check the project: \n\n&amp;nbsp;\n\n✅Coco Swap website: https://coco-swap.finance/\n&amp;nbsp;\n&amp;nbsp;\n\n✅Telegram: https://t.me/cocoswapofficial\n&amp;nbsp;\n&amp;nbsp;\n\n✅Pancakeswap link: https://exchange.pancakeswap.finance/#/swap?0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&amp;outputCurrency=0x9aa6fc71aed1130dee06a91a487bf5ea481de80d\n\n&amp;nbsp;'.match(cryptaddress('eth'))
// console.log(m);

// (async function() {
//   const x = await getRedditAsMoonShots({id: 'okxehl'});
//   console.log(x.contractData.contract_address);
// })();

module.exports = { 
  getPostBody,
  getPostTitle,
  getPostEthAddress,
  postHasEthAddress,
  getSub,
  getContractPerPost,
  getRedditAsMoonShots,
  getContractPerPosts,
  getContractData,
  pollMoonShots
};
