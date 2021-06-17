import { keyframes } from 'styled-components';

export const flipAnimation = keyframes`
  0%, 100% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
`;

export const jiggle = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-0.8deg);
  }
`

export const bobRotate = keyframes`
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

export const upDown = keyframes`
  0%, 100% {
    transform: translateY(1%) scale(1);
  }
  50% {
    transform: translateY(-1%) scale(0.9);
  }
`;

