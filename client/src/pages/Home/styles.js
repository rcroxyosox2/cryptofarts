import styled, { keyframes, css } from 'styled-components';
import { bobRotate, upDown } from 'theme/animations';

const defaultButtonAnimationState = css`
  opacity: 0;
  transform: scale(0.5) translateY(300px);
`;

const defaultTapHereImageContainerState = css`
  opacity: 0;
  transform: scale(0.5) translateY(100px);
`;

const defaultRandomImageContainerState = css`
  opacity: 0;
  transform: scale(0.9);
  transition: all 500ms ease-in-out 1000ms;
`;

export const RandomImageContainerStyle = styled.div.attrs({ className: 'RandomImageContainerStyle'})`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  transform-origin: 50% 100%;
  ${defaultRandomImageContainerState};
`;

export const TapHereImageContainerStyle = styled.div.attrs({ className: 'TapHereImageContainerStyle'})`
  transition: all 500ms ease-in-out 300ms;
  ${defaultTapHereImageContainerState}
`;

export const HomeScreenNoMyShitStyle = styled.div.attrs({ className: 'HomeScreenNoMyShitStyle' })`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  button {
    margin-bottom: 3em;
    transition: all 500ms ease-in-out;
    transform-origin: 50% 0%;
    ${defaultButtonAnimationState}
  }
  &.entering, &.entered {
    button, ${TapHereImageContainerStyle}, ${RandomImageContainerStyle} {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
  &.exiting, &.exited {
    button {
      transition: all 200ms ease-in 0ms !important;
      ${defaultButtonAnimationState}
    }
    ${TapHereImageContainerStyle} {
      transition: all 200ms ease-in 0ms !important;
      ${defaultTapHereImageContainerState}
    }
    ${RandomImageContainerStyle} {
      transition: all 200ms ease-in 0ms !important;
      ${defaultRandomImageContainerState}
    }
  }
  .randomImg {
    margin-bottom: 3em;
    animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
    animation-fill-mode: both;
    transition: all 500ms ease-in-out 100ms;
  }
`;

export const HomeStyle = styled.div.attrs({ className: 'HomeStyle' })`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .tapHereImg {
    width: 136px;
    animation: ${upDown} 1.2s ease-in-out 0s infinite;
    animation-fill-mode: both;
  }
`;
