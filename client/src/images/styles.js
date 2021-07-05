import styled from 'styled-components';
import { jiggle, nopeRotate } from '../theme/animations';


export const BGImageStyle = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const AnimatedImageStyle = styled.div.attrs({ className: 'AnimatedImageStyle'})`
  animation: ${nopeRotate} 1.2s ease-in-out 0s infinite;
  img {
    width: 100%;
  }
`;
