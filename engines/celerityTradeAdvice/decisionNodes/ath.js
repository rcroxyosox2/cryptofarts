const moment = require('moment');
const MIN_ATH_PERC = -10;
const OPTIMAL_DATE_BOUNDS_MONTHS = [3,1]; // best that the ath was with 1-3 months ago

const getDecisionNode = (athPercentage, athDateStr) => {
  let weight = 1;
  const bool = athPercentage <= MIN_ATH_PERC;
  const [lowerDateBoundMonths, upperDateBoundMonths] = OPTIMAL_DATE_BOUNDS_MONTHS;
  const lowerBoundDate = moment().subtract(lowerDateBoundMonths, 'months')
  const upperBoundDate = moment().subtract(upperDateBoundMonths, 'month');
  console.log(upperBoundDate.format(), lowerBoundDate.format())
  const athDate = moment(athDateStr);
  if(athDate.isAfter(lowerBoundDate) && athDate.isBefore(upperBoundDate)) {
    weight = 3;
  };
  return [weight, bool];
}

module.exports = {
  getDecisionNode,
};
