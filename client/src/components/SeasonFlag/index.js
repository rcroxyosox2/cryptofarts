import { useEffect } from 'react';
import styled from 'styled-components';
import useRequest from 'hooks/useRequest';
import { getMeta } from 'services/';

// SEASON
export const bands = {
  BUBBLE_CONFIRMED: 'bubbleconfirmed',
  SELL: 'sell',
  FOMO: 'fomo',
  BUBBLE_MAYBE: 'bubblemaybe',
  HODL: 'hodl',
  CHEAP: 'cheap',
  ACCUMULATE: 'accumulate',
  BUY: 'buy',
  FIRE_SALE: 'firesale',
  UNKNOWN: 'unknown',
};

const SeasonFlagStyle = styled.aside`
  cursor: pointer;
  mark {
    ${props => {
      if ([bands.BUBBLE_CONFIRMED, bands.SELL, bands.FOMO].includes(props.season)) {
        return props.theme.snippets.badCSS;
      }
      
      if([bands.BUBBLE_MAYBE, bands.HODL, bands.CHEAP].includes(props.season)) {
        return props.theme.snippets.warnCSS;
      }

      if([bands.ACCUMULATE, bands.BUY, bands.FIRE_SALE].includes(props.season)) {
        return props.theme.snippets.goodCSS;
      }
    }}
  }
`;

const SeasonFlag = () => {
  const request = useRequest({
    request: getMeta,
    runOnMount: true
  });

  const { response } = request;

  const handleClick = () => {
    console.log("hello");
    window.open('https://www.blockchaincenter.net/bitcoin-rainbow-chart/', '_blank');
  }

  return response && response.season ? (
    <SeasonFlagStyle season={response.season} onClick={handleClick}>
      Season: <mark>{response.season}</mark>
    </SeasonFlagStyle>
  ) : null;
};

export default SeasonFlag;