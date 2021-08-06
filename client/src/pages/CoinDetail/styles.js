import styled from 'styled-components';
import { bigPumpCSS } from 'components/PercChangeBox/styles';
import { PointToStyle } from 'components/PointTo/styles';
import { bobRotate } from 'theme/animations';
import { ButtonWrapperStyle } from 'theme/Button/styles';
import chevImg from 'images/chevRightBlackBg.png';
import flowbeeImg from 'images/flowbee.gif';
import flowbingImg from 'images/flowbing.png';
import { blink } from 'theme/animations';
import x from 'images/x.png';
import buffImg from 'images/buffarm.png';

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

export const WhereToBuyStyle = styled.div.attrs({ className: 'WhereToBuyStyle' })`
  width: 100%;
  position: relative;
  .closeBt {
      appearance: none;
      border: none;
      background-color: transparent;
      background-image: url(${x});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      width: 35px;
      height: 35px;
      position: absolute;
      right: 20px;
      top: 20px;
    }
  header {
    ${ButtonWrapperStyle} {
      position: relative;
      display: inline-flex;
      select {
        padding-right: 30px;
      }
      &:before {
        content: "";
        background-image: url(${chevImg});
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        width: 28px;
        height: 12px;
        transform: translateY(-50%) rotate(90deg);
        display: block;
        position: absolute;
        top: 50%;
        right: 5px;
        z-index: 2;
      }
    }
  }
  ${ButtonWrapperStyle} {
    margin-bottom: 0.2rem;
  }
  .navAndAside {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }
  .exchangeLinkList {
    transform: rotate(2deg);
    padding: 0 4%;
    margin-bottom: 20px;
  }
  aside {
    color: white;
    width: 100%;
    background: black;
    padding: 15% 8%;
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
        width: 233px;
        font-size: 1.5rem;
        transform: rotate(-8.3deg);
      }
      img {
        width: 60%;
        position: absolute;
        animation: ${bobRotate} 2s ease-in-out infinite;
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

export const NerdStuffStyle = styled.div.attrs({ className: 'NerdStuffStyle' })`
  ul {
    margin: 0; 
    padding: 0;
    li {
      padding: 0;
      list-style: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      border-bottom: 1px solid black;
      padding: 0.2em 0;
    }
  }
  a {
    color: ${props => props.theme.colors.blue};
  }
  img {
    width: 40%;
    float: left;
  }
`;

export const CoinDetailStyle = styled.div.attrs({ className: 'CoinDetailStyle' })`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  background: white;
  position: relative;
  z-index: 5;
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
      max-width: 105px;
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
        left: -9%;
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
    width: 93%;
    .priceContainer {
      -webkit-touch-callout: none;
      height: 120px;
    }
    &:after {
      content: "30 day chart";
      background: white;
      color: black;
      position: absolute;
      right: 20px;
      bottom: -18px;
      z-index: 2;
      border-radius: 20px;
      font-size: 0.7rem;
    }
  }
  ${ PointToStyle } {
    top: -5%;
    left: 8%;
    width: 25%;
  }

  .buttonNav {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    position: relative;
    ${ButtonWrapperStyle} {
      padding-right: 4%;
      margin-bottom: 2%;
    }
  }
  opacity: 0;
  transition: opacity 500ms ease-in-out;
  &.enter, &.enter-active, &.enter-done {
    opacity: 1;
  }
`;

export const LoadingStyle = styled.div.attrs({ className: 'LoadingStyle' })`
  position: absolute;
  width: 80%;
  height: 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 500ms ease-in-out;
  transform: translate(-50%, -50%) scale(0.5) rotate(0);
  border: 3px solid black;
  background: white;
  left: 50%;
  top: 50%;
  z-index: 6;
  opacity: 0;

  > * {
    transition: all 500ms ease-in-out;
  }
  .graphic {
    background-image: url(${flowbeeImg});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    height: 52%;
    position: relative;
    /* transform: translateY(-50px); */
    opacity: 0;
  }
  .text {
    &:after {
      background-image: url(${flowbingImg});
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center center;
      animation: ${blink} 1.2s ease-in-out 0s infinite;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
    }
    width: 70%;
    height: 22%;
    position: relative;
    border-top: 2px solid black;
    /* transform: translateY(50px) rotate(2deg); */
    transform: rotate(2deg);
    top: -2px;
    opacity: 0;
  }  
  &.enter, &.enter-active, &.enter-done {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1) rotate(0) rotate(-4deg);
    .graphic {
      opacity: 1;
      transform: translateY(0);
    }
    .text {
      opacity: 1;
      transform: translateY(0) rotate(2deg);
    }
  }
  &.exit, &.exit-active, &.exit-done {
    transition-delay: 500ms;
    transform: scale(0);
    > * {
      transition-delay: 1000ms;
    }
  }
  &.exit-done {
    z-index:-1;
  }
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    position: fixed;
    width: 80vw;
    height: 50vh;
  }
`;
