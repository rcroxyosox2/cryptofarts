// multidementional array of [weight, bool]
// const exampleEngine = [[5,false], [6,true]];

const decision = {
  STRONGYES: 'strongyes',
  STRONGNO: 'strongno',
  YES: 'yes',
  NO: 'no',
  WEAKYES: 'weakyes',
  WEAKNO: 'weakno',
  TOSSUP: 'tossup',
};

// > 0 yes < 0 no, max 2, -2
const decisionValues = {
  STRONGYES: 1.5,
  STRONGNO: -1.5,
  WEAKYES:  0.19,
  WEAKNO: -0.19
};

const getDecisionFromEngineArr = (engineArr) => {
  let sum = 0;
  let boolSum = 0;
  engineArr.forEach((item) => {
    const [weight, bool] = item;
    sum += weight;
    boolSum = (bool) ? boolSum + weight : boolSum - weight;
  });
  const avg = sum/engineArr.length;
  const score = boolSum/(sum/2);
  let useDecision = decision.TOSSUP;

  if (score < 0 && score >= decisionValues.WEAKNO) {
    useDecision = decision.WEAKNO;
  }
  else if (score > 0 && score <= decisionValues.WEAKYES) {
    useDecision = decision.WEAKYES;
  }
  else if (score <= decisionValues.STRONGNO) {
    useDecision = decision.STRONGNO;
  }
  else if (score >= decisionValues.STRONGYES) {
    useDecision = decision.STRONGYES;
  }
  else if (score > decisionValues.WEAKYES) {
    useDecision = decision.YES;
  }
  else if (score < decisionValues.WEAKNO) {
    useDecision = decision.NO;
  }
  return {
    score,
    decision: useDecision
  };

}

module.exports = {
  getDecisionFromEngineArr,
};
