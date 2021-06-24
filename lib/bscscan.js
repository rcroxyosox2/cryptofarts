require('dotenv').config()
const fetch = require("node-fetch");
const ENDPOINT = 'https://api.bscscan.com/api?';

const getContractData = async (contract = '0xa2b4c0af19cc16a6cfacce81f192b024d625817d') => {
  if (!contract) {
    throw new Error(`no contract given for bscscan - ${contract}`);
  }
  const url = `${ENDPOINT}module=account&action=tokentx&contractaddress=${contract}&page=1&offset=1&apikey=${process.env.BSCSCAN_KEY}`;
  const response = await fetch(url).then((r) => r.json());
  if (!response) {
    throw new Error(`no response on bscscan - ${contract}`);
  }
  const result = response.result[0];
  if (response.message === 'OK' && result && result.status !== '0') {
    const { tokenName, tokenSymbol, contractAddress } = result;
    if (tokenName, tokenSymbol, contractAddress) {
      return {
        tokenName,
        tokenSymbol,
        contractAddress,
      };
    } else {
      throw new Error(`not found on bscscan - ${contract}`);
    }
  } else {
    // console.log(response);
    throw new Error(`not found on bscscan - ${contract}`);
  }
}

module.exports = { 
  getContractData 
};
