import styled from 'styled-components';
import { LogoStyle } from 'components/Logo/styles';
import { CoinStackImageTitleComboStyle } from 'components/CoinStackImageTitleCombo/styles'

export const OverviewStyle = styled.div.attrs({ className: 'OverviewStyle' })`
  > header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 6vh 10vw 0;
    ${ LogoStyle } {
      width: 50%;
    }
  }
  > section {
    margin-bottom: 8vh;
  }
  h1 {
    font-size: 6vh;
    max-width: 3em;
    transform: rotate(-6deg);
    line-height: 1em;
    margin: 0 0 7vh;
  }
  ${CoinStackImageTitleComboStyle} {
    margin-bottom: 1.6rem;
  }
`;
