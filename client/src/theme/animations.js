import { keyframes } from 'styled-components';

export const buff = keyframes`
  0%, 100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(0);
  }
`;

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
    transform: rotate(-3deg);
  }
`;

export const blink = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

export const bobRotateMinor = keyframes`
	0% {
		transform: translateY(0px) rotate(0.2deg);
	}
	50% {
		transform: translateY(0.1vh) rotate(0deg);
	}
	100% {
		transform: translateY(0px) rotate(0.2deg);
	}
`;

export const bobRotate = keyframes`
	0% {
		transform: translateY(0px) rotate(1deg);
	}
	50% {
		transform: translateY(-3px) rotate(-1deg);
	}
	100% {
		transform: translateY(0px) rotate(1deg);
	}
`;

export const nopeRotate = keyframes`
	0%, 100% {
		transform: translateX(0px) rotate(1deg);
	}
	50% {
		transform: translateX(-5px) rotate(-1deg);
	}
`;

export const upDown = keyframes`
  0%, 100% {
    transform: translateY(10%);
  }
  50% {
    transform: translateY(-10%);
  }
`;

export const sizeChanger = keyframes`
  0%, 100%{
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
`;
