const { caps } = require('../../../contants');

const MIN_COMMUNITY_SCORE = 0.30;
const MIN_PUBLIC_INTEREST_SCORE = 0.04;
const MIN_UPVOTES_PERC = 70;

const name = 'community';

const getDecisionNode = ({
  capSize, 
  communityScore, 
  publicInterestScore, 
  sentimentVotesUpPerc,
}) => {

  if (
    typeof capSize != 'string'
    || typeof communityScore != 'number'
    || typeof publicInterestScore != 'number'
    || typeof sentimentVotesUpPerc != 'number') {
      console.error(`params not correctly set in decision node: ${name}`);
      return null;
    }

  const largishCapCoin = [caps.MID, caps.LRG].includes(capSize);
  const bool = (
    communityScore >= MIN_COMMUNITY_SCORE &&
    publicInterestScore >= MIN_PUBLIC_INTEREST_SCORE &&
    sentimentVotesUpPerc >= MIN_UPVOTES_PERC
  );
  
  const weight = largishCapCoin ? 1 : 3;
  return [weight, bool];
}

module.exports = {
  name,
  getDecisionNode,
}
