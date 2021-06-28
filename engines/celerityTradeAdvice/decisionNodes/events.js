const { caps } = require('../../../contants');

const name = 'events';
const getDecisionNode = ({capSize, numEvents}) => {
  let bool = false;
  let weight = 0;
  const isLrgCapCoin = capSize === caps.LRG;
  if (typeof numEvents !== 'number'
  || typeof capSize != 'string') {
    console.error(`params not correctly set in decision node: ${name}`);
    return null;
  }

  if (!isLrgCapCoin) {
    bool = true;
    if (numEvents > 0 && numEvents <= 5) {
      weight = 1;
    }
    else if (numEvents > 5) {
      weight = 2;
    }
  }

  return [weight, bool];
}

module.exports = {
  name,
  getDecisionNode,
};
