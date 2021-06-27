const moment = require('moment');
const MIN_ATH_PERC = -10;
const OPTIMAL_DATE_BOUNDS_MONTHS = [3,1]; // best that the ath was with 1-3 months ago
const { getCapSizeFromCoin } = require('../../../lib/coinGecko');
const { caps } = require('../../../contants');

const getDecisionNode = ({
  capSize,
  athPercentage, 
  athDateStr
}) => {
  const largishCapCoin = [caps.MID, caps.LRG].includes(capSize);
  const GOLDILOX_MULTI = 1.5;
  let weight = (largishCapCoin) ? 2 : 0.5;
  const bool = athPercentage <= MIN_ATH_PERC;
  const [lowerDateBoundMonths, upperDateBoundMonths] = OPTIMAL_DATE_BOUNDS_MONTHS;
  const lowerBoundDate = moment().subtract(lowerDateBoundMonths, 'months')
  const upperBoundDate = moment().subtract(upperDateBoundMonths, 'month');
  console.log(upperBoundDate.format(), lowerBoundDate.format())
  const athDate = moment(athDateStr);
  if(athDate.isAfter(lowerBoundDate) && athDate.isBefore(upperBoundDate)) {
    weight = weight * GOLDILOX_MULTI;
  };
  return [weight, bool];
}

module.exports = {
  name: 'ath',
  getDecisionNode,
};
