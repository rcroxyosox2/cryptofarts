
const lodash = require('lodash');

const name = 'random';
const getDecisionNode = () => {
  const bool = Boolean(lodash.random(0,1));
  const weight = 1;
  return [weight, bool];
};

module.exports = {
  name,
  getDecisionNode,
};

