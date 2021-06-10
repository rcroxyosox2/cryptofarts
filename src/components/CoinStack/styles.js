import styled from 'styled-components';

export const CoinStyleRowContainer = styled.div.attrs({ className: 'CoinStyleRowContainer' })`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;

export const CoinStackRowStyle = styled.div.attrs({ className: 'CoinStackRowStyle' })`
    &:nth-child(3n+0) {
      ${CoinStyleRowContainer} {
        transform: rotate(0.5deg) skew(1deg);
      }
    }
    &:nth-child(3n+1) {
      margin-top: 2px;
    }
    &:nth-child(3n+2) {
      ${CoinStyleRowContainer} {
        transform: rotate(-0.2deg) skew(-0.5deg);
      }
    }
    .coinImgCol {
      img {
        background: white;
        border-radius: 15px;
      }
    }
`;

export const CoinStackStyle = styled.div.attrs({ className: 'CoinStack' })`
  display: flex;
  flex-flow: column nowrap;
`;
