const BUY_THRESHOLD = 15; // buy at 15 or lower

// use - const index = await alternative.getSeason();
const getDecisionNode = (index) => {
  const bool = index >= BUY_THRESHOLD;
  const weight = 1;
  return [weight, bool];
}

module.exports = {
  name: 'greedFearIndex',
  getDecisionNode,
}