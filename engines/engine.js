// multidementional array of [weight, bool]
// const exampleEngine = [[5,false], [6,true]];

const decision = {
  YES: 'yes',
  NO: 'no',
  WEAKYES: 'weakyes',
  WEAKNO: 'weakno',
  TOSSUP: 'tossup',
};

// > 0 yes < 0 no
const decisionValues = {
  WEAKYES:  0.15,
  WEAKNO: -0.15
};

const getDecisionFromEngineArr = (engineArr) => {
  const weights = engineArr.map((v) => v[0]);
  const sum = weights.reduce((previous, current) => current += previous);
  const avg = sum/engineArr.length;
  
  const relativeScore = engineArr.reduce((accumulator, currentValue) => {
    const acc = Array.isArray(accumulator) ? accumulator[0] : accumulator;
    return currentValue[1] ? acc + currentValue[0] : acc - currentValue[0] ;
  });
  
  const score = relativeScore/avg;

  if (score < decisionValues.WEAKNO) {
    return decision.NO;
  }

  if (score < 0 && score >= decisionValues.WEAKNO) {
    return decision.WEAKNO;
  }

  if (score > decisionValues.WEAKYES) {
    return decision.YES;
  }

  if (score > 0 && score <= decisionValues.WEAKYES) {
    return decision.WEAKYES;
  }

  return decision.TOSSUP;

}

// console.log(getDecisionFromEngineArr([[2,true], [2.4,false]]));

module.exports = {
  getDecisionFromEngineArr,
};
