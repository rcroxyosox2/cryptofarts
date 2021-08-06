import styled from 'styled-components';
import { LogoStyle } from 'components/Logo/styles';
import { CoinStackImageTitleComboStyle } from 'components/CoinStackImageTitleCombo/styles';
import { PercChangeBoxStyle } from 'components/PercChangeBox/styles';

export const OverviewStyle = styled.div.attrs({ className: 'OverviewStyle' })`
  background: white;
  > ${PercChangeBoxStyle} {
    position: absolute; 
    left: 32.6%;
    padding: 0.5rem;
    font-size: 1rem;
    transform: rotate(-5deg);
  }
  > header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10%;
    position: relative;
    z-index: 2;
    ${ LogoStyle } {
      width: 50%;
    }
  }
  > section {
    margin-bottom: 3rem;
  }
  > * {
    &:nth-last-child(2) {
      margin-bottom: 5rem;
    }
  }
  h1 {
    font-size: 3rem;
    max-width: 3em;
    transform: rotate(-6deg);
    line-height: 1em;
    margin: 0 0 7%;
  }
  ${CoinStackImageTitleComboStyle} {
    margin-bottom: 1.6rem;
  }
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    padding-bottom: 6rem;
  }
`;
