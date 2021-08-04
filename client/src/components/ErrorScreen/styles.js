import styled from 'styled-components';
import { bobRotate } from 'theme/animations';

export const ErrorScreenStyle = styled.div.attrs({ className: 'ErrorScreen' })`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  background: white;
  width: 100%;
  height: 100%;
  gap: 5%;
  padding: 6%;
  img { 
    max-width:  80%;
    animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
  }
  span {
    font-size: 2.5rem;
    transform: rotate(7deg);
    line-height: 0.9em;
  }
  button {
    transform: rotate(-4deg);
  }
  footer {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    i {
      font-size: 1.5rem;
      font-style: normal;
    }
  }
`;
