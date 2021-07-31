import styled, { keyframes, css } from 'styled-components';

export const textAnimation = keyframes`
  0%, 100% {
    transform: rotate(2deg) scale(0.95);
  }
  50% {
    transform: rotate(4deg) scale(1);
  }
`;

export const CelebAdviceInlineStyle = styled.div.attrs({ className: 'CelebAdviceInlineStyle' })`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 1.2rem;
  position: relative;
  top: -0.6rem;
  img {
    max-width: 100%;
    transform: scale(1.15) rotate(-2deg);
  }
  > * {
    &:first-child {
      flex: 1;
    }
    &:nth-child(2) {
      flex: 2;
      padding: 0.5rem;
    }
    &:last-child {
      flex: 1;
      font-size: ${props => props.buy ? '3rem' : '2.3rem' };
      font-family: 'Courier New', monospace;
      font-weight: bold;
      ${props => props.buy ? css`
        animation: ${textAnimation} 1.2s ease-in-out 0s infinite;
        text-shadow: 
          -2px 5px ${props => props.theme.colors.yellow}, 
          -5px 6px ${props => props.theme.colors.pink},
          2px 5px ${props => props.theme.colors.green},
          0px 8px ${props => props.theme.colors.blue};
      ` : null
    }
  }
`;
