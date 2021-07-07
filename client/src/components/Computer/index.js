import styled from 'styled-components';
import computer from 'images/computer.png';
import { bobRotate } from 'theme/animations';

export const ComputerStyle = styled.div`
  animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
  background-image: url(${computer});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 100%;
  height: 40vh;
  color: white;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  z-index: 2;
  span {
    bottom: 11vh;
    display: block;
    position: relative;
    font-size: 3vh;
    transform: skew(1deg, -6deg);
    height: 11vh;
    left: -3vh;
    width: 14vh;
    padding: 1.5vh;
    overflow: hidden;
  }
`;

const Computer = ({ text = 'the internet', children, onClick = () => null } = {}) => {
  const copy = text || children;
  return ( 
    <ComputerStyle aria-role="image" aria-label={copy} onClick={onClick} >
      <span>{ copy }</span>
    </ComputerStyle>
  )
}

export default Computer;