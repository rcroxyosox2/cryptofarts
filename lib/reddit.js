const lodash = require('lodash');
const SUB_REDDIT = 'CryptoMoonShots';
const bscscan = require('./bscscan');
const etherscan = require('./etherscan');
const SORT = 'top';
const TIME_SPAN = 'day';
const MAX_RESULTS = 50;
const fetch = require("node-fetch");
const cryptaddress = require('cryptaddress-validator');

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

const getPostEthAddress = (post) => {
  const body = getPostBody(post);
  const matches = body.match(cryptaddress('eth'));
  return matches && matches.length ? matches[0] : null;
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
      }
    })
    .sort((posta, postb) => {
      return posta.created < postb.created;
    })
  }
}

const getContractData = async (contract) => {
  const bsc = await bscscan.getContractData(contract);
  if (bsc) {
    return bsc;
  }

  const eth = await etherscan.getContractData(contract);
  if (eth) {
    return eth;
  }
}

const getContractPerPost = async (post) => {
  const throttle = 0;
  const ethAddress = getPostEthAddress(post);
  return new Promise((res) => setTimeout(() => res(), throttle)).then(() => getContractData(ethAddress));
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
      currentIndex = currentIndex + 1;
    }
  }
  return finalArr;
}

const getRedditAsMoonShots = async () => {
  const posts = await getSub();
  return await getContractPerPosts(posts);
}

module.exports = { 
  getPostBody,
  getPostTitle,
  getPostEthAddress,
  postHasEthAddress,
  getSub,
  getRedditAsMoonShots,
  getContractData
};
