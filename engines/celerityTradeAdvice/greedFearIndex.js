const alternative = require('../../lib/alternative');

const getGreedFearIndex = async () => {
  const index = await alternative.getSeason();
  return index;
};

module.exports = {
  getGreedFearIndex,
  weight: 2,
}