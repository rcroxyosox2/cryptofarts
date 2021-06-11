import styled from 'styled-components';
import { CoinStackImageTitleComboStyle } from 'components/CoinStackImageTitleCombo/styles'
export const OverviewStyle = styled.div.attrs({ className: 'OverviewStyle' })`
  padding: 20px;
  ${CoinStackImageTitleComboStyle} {
    margin-bottom: 1.6rem;
  }
`;
