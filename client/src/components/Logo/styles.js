import styled, { css, keyframes } from 'styled-components';
import shine from './images/shine.png';
import shine2 from './images/shine2.png';

const sparkleAnimation = (props) => keyframes`
  0% { 
    background-color: ${props.theme.colors.red};
    transform: rotate(129deg);
  }
  20% {
    background-color: ${props.theme.colors.pink};
    transform: rotate(68deg);
  }
  40% {
    background-color: ${props.theme.colors.yellow};
    transform: rotate(8deg);
  }
  60% {
    background-color: ${props.theme.colors.black};
    transform: rotate(208deg);
  }
  80% {
    background-color: ${props.theme.colors.blue};
    transform: rotate(4deg);
  }
  100% {
    background-color: ${props.theme.colors.green};
    transform: rotate(200 deg);
  }
`;
// width: 7.9%;
// height: 33%;

const getSizeFromWidth = (scale, width, unit = '%') => {
  const height = width * scale;
  return css`
    width: ${width}${unit};
    height: ${height}${unit};
  `;
}

const afterScale = 21.8/7;
const sparkleAnimation2 = (props) => keyframes`
  0% { 
    background-color: ${props.theme.colors.pink};
    transform: rotate(6deg);
  }
  20% {
    background-color: ${props.theme.colors.black};
    transform: rotate(68deg);
  }
  40% {
    background-color: ${props.theme.colors.blue};
    transform: rotate(1deg);
  }
  60% {
    background-color: ${props.theme.colors.green};
    transform: rotate(180deg);
  }
  80% {
    background-color: ${props.theme.colors.yellow};
    transform: rotate(9deg);
  }
  100% {
    background-color: ${props.theme.colors.red};
    transform: rotate(216deg);
  }
`;

const coinAnimation = () => keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: scale(-1, 1);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: scale(1, -1) rotate(180deg);
  }
`;

const textAnimation = keyframes`
  0%, 100% {
    transform: scale(0.) rotate(0deg);
  }
  50%{ 
    transform: scale(1) rotate(-2deg);
  }
`;

export const LogoStyle = styled.div.attrs({className: 'LogoStyle'})`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  max-width: 100%;
  &:before, 
  &:after {
    content: "";
    display: block;
    background-size: 100%;
    position: absolute;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 0px 2px white;
  }
  &:before {
    background-image: url(${shine});
    animation: ${(props) => sparkleAnimation(props)} 4s step-end infinite;
    background-color: ${(props) => props.theme.colors.green};
    width: 6.9%;
    height: 19.9%;
    top: -23%;
    left: 23.3%;
  }
  &:after {
    background-image: url(${shine2});
    animation: ${(props) => sparkleAnimation2(props)} 4s step-end infinite;
    background-color: ${(props) => props.theme.colors.pink};
    width: 7.9%;
    height: 24%;
    top: -5%;
    right: 0.3%;
  }
  > span {
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 3;
    }
  }
  img {
    width: 100%;
    &.coinImg {
      animation: ${(props) => coinAnimation(props)} 5s step-end infinite;
    }
    &.kripdoeImg {
      animation: ${textAnimation} 2s ease-in-out infinite;
    }
  }
`;
