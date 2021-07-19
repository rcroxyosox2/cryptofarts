import styled, { keyframes } from "styled-components";

export const ltor = (to) => keyframes`
  0% { transform: translate(100%, 0); }
  100% { transform: translate(-${to}%, 0); }
`;

export const RainBowStyle = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 400px;
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

export const TrendingStyle = styled.section.attrs({ className: 'TrendingStyle' })`
  position: relative;
  img {
    position: absolute;
  }
  .cloudContainer {
    position: absolute;
    left: 0; 
    top: 50%;
    transform: translateY(-50%);
    width: 100%; 
    height: 120%;
    overflow-x: hidden;
    z-index: 3;
  }
  .trending {
    z-index: 2;
  }
  .shortCloud, .longCloud {
    right: 0;
    z-index: 1;
    transform: translate(100%, 0);
  }
  .longCloud {
    top: -2%;
    width: 50%;
    animation: ${ltor(200)} 50s linear 0s infinite;
  }
  .shortCloud {
    bottom: 0;
    width: 30%;
    animation: ${ltor(333)} 70s linear 0s infinite;
  }
`;
