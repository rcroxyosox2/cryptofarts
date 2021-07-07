import styled, { keyframes } from 'styled-components';
import { upDown } from 'theme/animations';

export const upDownSubtle = keyframes`
  0%, 100% {
    transform: translateY(1%);
  }
  50% {
    transform: translateY(-1%);
  }
`;

export const PointToStyle = styled.div.attrs({className: 'PointToStyle'})`
  position: absolute;
  div {
    animation: ${upDownSubtle} 1.2s ease-in-out 0s infinite;
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  img {
    max-width: 100%;
    &:first-child {
      margin-bottom: 12%;
    }
    &:last-child {
      animation: ${upDown} 1.2s ease-in-out 0s infinite;
      width: 15%;
    }
  }
`;
