require('dotenv').config()
const fetch = require("node-fetch");
const ENDPOINT = 'https://api-cn.etherscan.com/api?';

const getContractInfo = async (contract = '0xa2b4c0af19cc16a6cfacce81f192b024d625817d') => {
  const url = `${ENDPOINT}module=account&action=tokentx&contractaddress=${contract}&page=1&offset=1&apikey=${process.env.ETHERSCAN_KEY}`;
  const response = await fetch(url).then((r) => r.json());
  if (!response) {
    throw new Error(`no response on etherscan - ${contract}`);
  }
  if (response.message === 'OK' && result && result.status !== '0') {
    const result = response.result[0];
    const { tokenName, tokenSymbol, contractAddress } = result;
    if (tokenName, tokenSymbol, contractAddress) {
      return {
        tokenName,
        tokenSymbol,
        contractAddress,
      };
    } else {
      throw new Error(`not found on etherscan - ${contract}`);
    }
  } else {
    // console.log(response);
    throw new Error(`not found on etherscan - ${contract}`);
  }
}

module.exports = { 
  getContractInfo 
};
