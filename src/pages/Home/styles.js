import styled, { keyframes, css } from 'styled-components';

const bobRotate = keyframes`
	0% {
		transform: translatey(0px) rotate(1deg);
	}
	50% {
		transform: translatey(-3px) rotate(-1deg);
	}
	100% {
		transform: translatey(0px) rotate(1deg);
	}
`;

const upDown = keyframes`
  0%, 100% {
    transform: translateY(1%) scale(1);
  }
  50% {
    transform: translateY(-1%) scale(0.9);
  }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); opacity: 1; }
`;

const defaultButtonAnimationState = css`
  opacity: 0;
  transform: scale(0.5) translateY(300px);
`;

const defaultTapHereImageContainerState = css`
  opacity: 0;
  transform: scale(0.5) translateY(100px);
`;

export const RandomImageContainerStyle = styled.div.attrs({ className: 'RandomImageContainerStyle'})`
  transition: all 300ms ease-in-out;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  transform-origin: 50% 100%;
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
    button, ${TapHereImageContainerStyle} {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
  &.exiting, &.exited {
    button {
      ${defaultButtonAnimationState}
    }
    ${TapHereImageContainerStyle} {
      ${defaultTapHereImageContainerState}
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
