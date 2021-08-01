import styled from 'styled-components';
import { bigPumpCSS } from 'components/CoinStack/styles';
// import buffImg from 'images/buffarm.png';

export const ChartStyle = styled.div.attrs({ className: 'ChartStyle' })`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  .priceContainer {
    position: relative;
    z-index: 2;
  }
  .volumeContainer {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
  }
`;

export const WhereToBuyStyle = styled.div.attrs({ className: 'WhereToBuyStyle' })`
  width: 100%;
  position: relative;

  .exchangeLinkList {
    transform: rotate(2deg);
    padding: 0 4%;
    margin-bottom: 20px;
  }
  aside {
    color: white;
    width: 100%;
    background: black;
    padding: 20% 8%;
    position: absolute;
    z-index: 3;
    top: -220%;
    clip-path: polygon(0% 27px,100% 0,100% calc(100% - 27px),0% 100%);
    transform: scale(0);
    opacity: 0;
    transition: all 300ms ease-in-out;
    &.entered {
      transform: scale(1);
      opacity: 1;
    }
    header {
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      h3 {
        max-width: 50%;
        font-size: 1.5rem;
        transform: rotate(-8.3deg);
      }
      img {
        width: 60%;
        position: absolute;
        right: -10%;
        bottom: -16%;
      }
    }
  }
  a {
    font-size: 1rem;
    padding: 0.5rem 0.9rem;
    width: 100%;
    margin-bottom: 5px;
    justify-content: space-between;
    transition: all 300ms ease-in-out;
    &:hover {
      transform: translateX(5px);
    }
    .exchangeLogo {
      width: 38px;
      height: 38px;
      border-radius: 19px;
      margin-right: 12px;
    }
    .chev {
      width: 14px;
    }
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
  background: white;
  > header {
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
      white-space: nowrap;
      padding-right: 0.3em;
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
      align-items: flex-end;
      text-align: right;
      span {
        &:first-child {
          font-size: 2.5rem;
        }
      }
    }
  }
  main {
    width: 100%;
    padding: 0 8%;
  }
  ${ChartStyle} {
    transform: rotate(-5deg);
    top: -20px;
    left: -5px;
    width: calc(100% + 5px);
    .priceContainer {
      height: 120px;
    }
    &:after {
      content: "30 day chart";
      background: white;
      color: black;
      position: absolute;
      right: 20px;
      bottom: -31px;
      z-index: 2;
      padding: 0.4rem;
      border-radius: 20px;
      transform: rotate(7deg);
      font-size: 0.7rem;
    }
  }
`;
