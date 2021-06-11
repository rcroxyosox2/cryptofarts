import styled from 'styled-components';
import { CoinStackStyle } from 'components/CoinStack/styles';
export const TitleImgComboStyle = styled.div.attrs({ className: 'TitleImgComboStyle'})`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  h1 {
    transform: rotate(-13deg);
    margin-bottom: 1.3rem;
  }
  img {
    width: 100%;
    height: auto;
    transform: translateX(-1%) scale(1.5);
    position: relative;
    z-index: 2;
  }
`;

export const CoinStackImageTitleComboStyle = styled.div.attrs({ className: 'CoinStackImageTitleComboStyle' })`
  display: flex;
  flex-flow: row nowrap;
  ${CoinStackStyle} {
    flex: 3;
  }
  ${TitleImgComboStyle} {
    flex: 1;
  }
`;