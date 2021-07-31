import styled from 'styled-components';
import { bigPumpCSS } from 'components/CoinStack/styles';
// import buffImg from 'images/buffarm.png';

export const WhereToBuyStyle = styled.div.attrs({ className: 'WhereToBuyStyle' })`
  aside {
    
  }
`;

export const PumpMessageStyle = styled.aside.attrs({className: 'PumpMessageStyle' })`
  border: 1px solid black;
  padding: 0.6rem;
  font-size: 1.2rem;
  text-align: center;
  transform: rotate(-2deg);
  mark {
    background-color: ${props => props.theme.colors.yellow};
  }
`;

export const CoinDetailStyle = styled.div.attrs({ className: 'CoinDetailStyle' })`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  header {
    display: flex;
    flex-flow: column nowrap;
    width: 82%;
    position: relative;
    padding-top: 6%;
    > div {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      &:first-child {
        
      }
      &:last-child {
        right: 0;
      }
    }
    img {
      border-radius: 50%;
      width: 100%;
      max-width: 122px;
      border: 9px solid ${
        (props) => props.goodOrBad === 'good' 
        ? props.theme.colors.green 
        : props.theme.colors.red
      };
    }
    .img {
      flex: 3;
      padding-right: 0.7rem;
      position: relative;
      .pumpArm {
        top: -7%;
        left: 2%;
        transform: rotate(-34deg) scale(0.6) scaleX(-1);
        position: absolute;
        width: 100%;
        height: 100%;
        ${(props) => props.bigPump ? bigPumpCSS : null}
      }
    }
    .price {
      font-size: 3.1rem;
      transform: rotate(-2.5deg);
      flex: 3;
    }
    .percChange {
      font-size: 4.3rem;
      font-weight: bold;
      transform: rotate(6deg);
      color: ${
        (props) => props.goodOrBad === 'good' 
        ? props.theme.colors.green 
        : props.theme.colors.red
      };
    }
    .timeSymbolContainer {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-end;
    }
    .symbolName {
      display: flex;
      flex-flow: column nowrap;
      transform: rotate(-2.5deg);
      span {
        &:first-child {
          font-size: 2.5rem;
        }
      }
    }
  }
  main {
    margin: 0 8%;
  }
`;
