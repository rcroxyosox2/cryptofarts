import styled, { keyframes } from "styled-components";
import square from './images/square.png';
import { jiggle } from 'theme/animations';

export const ltor = (to) => keyframes`
  0% { transform: translate(100%, 0); }
  100% { transform: translate(-${to}%, 0); }
`;

export const RainBowStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
  i {
    display: block;
    flex: 1;
    &:nth-child(1) {
      background: ${(props) => props.theme.colors.red };
    }
    &:nth-child(2) {
      background: ${(props) => props.theme.colors.pink };
    }
    &:nth-child(3) {
      background: ${(props) => props.theme.colors.yellow };
    }
    &:nth-child(4) {
      background: ${(props) => props.theme.colors.green };
    }
    &:nth-child(5) {
      background: ${(props) => props.theme.colors.blue };
    }
  }
`;

export const CloudBox = styled.div.attrs({ className: 'CloudBox' })`
  width: 100%;
  overflow: hidden;
  z-index: 4;
  position: absolute;
  height: 100px;
  img {
    position: absolute;
    transform: translate(100%, 0);
    right: 0;
  }
  &.longCloud {
    top: -10%;
    img {
      width: 50%;
      animation: ${ltor(200)} 50s linear 0s infinite;
    } 
  }
  &.shortCloud {
    bottom: -20%;
    img {
      width: 30%;
      animation: ${ltor(333)} 70s linear 0s infinite;
    }
  }
`;

export const TrendingStyle = styled.section.attrs({ className: 'TrendingStyle' })`
  position: relative;
  margin-top: 18%;
  header {
    position: absolute;
    top: -15%;
    z-index: 4;
    width: 100%;
    img {
      margin-left: 4%;
      width: 40%;
      animation: ${jiggle} 2s step-end infinite;
    }
  }
  ul {
    width: 92%;
    height: 230px;
    padding: 43px 4% 4%;
    display: grid;
    grid-template-columns: repeat(7,60%);
    gap: 0;
    overflow-x: scroll;
    box-sizing: content-box;
    position: relative;
    z-index: 3;
  }
  li {
    background-image: url(${square});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    padding: 20px 40px;
    list-style: none;
    display: flex;
    flex-flow: column nowrap;
    gap: 5px;
    align-items: center;
    justify-content: center;
  }
  .rainbowContainer {
    position: absolute;
    width: 100%;
    height: 310px;
    overflow: hidden;
    ${RainBowStyle} {
      width: 105%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%) rotate(-3deg);
      height: 91%;
      top: 50%;
    }
  }
  .trending {
    z-index: 2;
  }
`;
