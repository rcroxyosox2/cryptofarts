import styled from 'styled-components';
import { CoinStackStyle } from 'components/CoinStack/styles';
import { BGImageStyle } from 'images/styles';


export const TitleImgComboStyle = styled.div.attrs({ className: 'TitleImgComboStyle'})`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  position: relative;
  h1 {
    transform: rotate(-13deg);
    margin-bottom: 1.3rem;
    max-width: 120px;
  }
  .imgContainer {
    position: relative;
    z-index: 2;
    transform: translateX(-1%) scale(1.5);
    position: sticky;
  }
  ${BGImageStyle} {
    width: 100%;
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