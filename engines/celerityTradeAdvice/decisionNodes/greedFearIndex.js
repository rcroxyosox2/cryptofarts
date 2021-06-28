const BUY_THRESHOLD = 15; // buy at 15 or lower

const name = 'greedFearIndex';

// use - const index = await alternative.getSeason();
const getDecisionNode = (index) => {

  if (typeof index != 'number') {
    console.error(`params not correctly set in decision node: ${name}`);
    return null;
  }

  const bool = index >= BUY_THRESHOLD;
  const weight = 1;
  return [weight, bool];
}

module.exports = {
  name,
  getDecisionNode,
}