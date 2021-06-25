const trend = require('trend');

const movement = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
  WEAKINCREASE: 'weakup',
  WEAKDECREASE: 'weakdown',
  SIDEWAYS: 'sideways',
};

// > 1.0 increase < 1.0 decrease
const movementValues = {
  [movement.WEAKINCREASE]: .90,
  [movement.WEAKDECREASE]: 1.10,
}

const pricePrediction = {
  ...movement,
  PEAKING: 'peaking',
  FLOORING: 'flooring',
};

const getMovementByTrendValue = (trendValue) => {
  if (trendValue < movementValues[movement.WEAKDECREASE]) {
    return movement.DECREASE;
  }

  if (trendValue < 1 &&  trendValue >= movementValues[movement.WEAKDECREASE]) {
    return movement.WEAKDECREASE;
  }

  if (trendValue > 1 &&  trendValue <= movementValues[movement.WEAKINCREASE]) {
    return movement.WEAKINCREASE;
  }

  if (trendValue > movementValues[movement.WEAKINCREASE]) {
    return movement.INCREASE;
  }

  return movement.SIDEWAYS;
}

const getTrendValueFromArr = (arr) => {
  return trend(arr, {
    lastPoints: arr.length/4,
    avgPoints: arr.length/2,
    avgMinimum: undefined,
    reversed: false
  });
}

const getPricePredictionByVolumeAndPrice = (priceChartArr, volumeChartArr) => {

  /*
  Increasing price accompanied by an increasing Price Volume Trend value, confirms the price trend upward. 
  Decreasing price accompanied by a decreasing Price Volume Trend value, confirms the price trend downward. 
  Increasing price accompanied by a decreasing or neutral Price Volume Trend value is a divergence and may suggest that the price movement upward is weak and lacking conviction. 
  Decreasing price accompanied by an increasing or neutral Price Volume Trend value is a divergence and may suggest that the price movement downward is weak and lacking conviction.
  Read more at: https://commodity.com/technical-analysis/price-volume-trend/
  */

  const priceChartTrendValue = getTrendValueFromArr(priceChartArr);
  const volumeChartTrendValue = getTrendValueFromArr(volumeChartArr);
  const priceMovement = getMovementByTrendValue(priceChartTrendValue);
  const valueMovement = getMovementByTrendValue(volumeChartTrendValue);

  if (priceMovement === movement.INCREASE && valueMovement === movement.INCREASE) {
    return pricePrediction.INCREASE;
  }

  if (priceMovement === movement.DECREASE && valueMovement === movement.DECREASE) {
    return pricePrediction.DECREASE;
  }

  if (priceMovement === movement.INCREASE && valueMovement != movement.INCREASE) {
    return pricePrediction.PEAKING;
  }

  if (priceMovement === movement.DECREASE && valueMovement != movement.DECREASE) {
    return pricePrediction.FLOORING;
  }

}

const priceChartArr = [1,2,2,2,3,4,8,9,10,12,17,18,20];
const volumeChartArr = [1,2,2,2,3,4,8,9,10,12,17,18,20]

const getDecisionNode = (priceChartArr, volumeChartArr) => {
  const prediction = getPricePredictionByVolumeAndPrice(priceChartArr, volumeChartArr);
  let weight = (prediction === pricePrediction.WEAKINCREASE || prediction === pricePrediction.WEAKDECREASE) ? 3 : 4;
  let bool = (prediction === pricePrediction.INCREASE || prediction === pricePrediction.WEAKINCREASE);
  return [weight, bool];
}

module.exports = {
  getDecisionNode,
};
