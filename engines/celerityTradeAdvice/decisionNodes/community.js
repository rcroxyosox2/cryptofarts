
const MIN_COMMUNITY_SCORE = 0.30;
const MIN_PUBLIC_INTEREST_SCORE = 0.04;
const MIN_UPVOTES_PERC = 70;

const getDecisionNode = (communityScore, publicInterestScore, sentimentVotesUpPerc) => {
  const bool = (
    communityScore >= MIN_COMMUNITY_SCORE &&
    publicInterestScore >= MIN_PUBLIC_INTEREST_SCORE &&
    sentimentVotesUpPerc >= MIN_UPVOTES_PERC
  );
  const weight = 2;
  return [weight, bool];
}

