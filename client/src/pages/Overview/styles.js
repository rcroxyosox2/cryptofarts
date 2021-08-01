import styled from 'styled-components';
import { LogoStyle } from 'components/Logo/styles';
import { CoinStackImageTitleComboStyle } from 'components/CoinStackImageTitleCombo/styles';

export const OverviewStyle = styled.div.attrs({ className: 'OverviewStyle' })`
  background: white;
  > header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 10%;
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
`;
