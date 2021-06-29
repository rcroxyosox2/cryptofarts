const { caps } = require('../../../contants');

const name = 'events';
const getDecisionNode = ({capSize, numEvents}) => {
  const isLrgCapCoin = capSize === caps.LRG;
  if (typeof numEvents !== 'number'
  || typeof capSize != 'string') {
    console.error(`params not correctly set in decision node: ${name}`);
    return null;
  }
  
  let bool = numEvents > 0;
  let weight = (numEvents > 5 && !isLrgCapCoin) ? 2 : 1;
  return [weight, bool];
}

module.exports = {
  name,
  getDecisionNode,
};
