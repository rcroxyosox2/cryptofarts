const lodash = require('lodash');

const name = 'random';
const getDecisionNode = () => {
  const bool = Boolean(lodash.random(0,1));
  const weight = 0.5;
  return [weight, bool];
};

module.exports = {
  name,
  getDecisionNode,
};

