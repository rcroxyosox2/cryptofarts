import styled from 'styled-components';
import computer from 'images/computer.png';
import { bobRotate, blink } from 'theme/animations';

export const ComputerStyle = styled.div.attrs({className: 'ComputerStyle'})`
  animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
  background-image: url(${computer});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  width: 100%;
  height: 100%;
  color: white;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  z-index: 2;
  span {
    top: -27%;
    left: -6%;
    height: 29%;
    width: 25%;
    display: block;
    position: relative;
    transform: skew(1deg, -6deg);
    padding: 0.4% 1.5% 1.5%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    font-size: 1.4rem;
    aside {
      animation: ${blink} 1.2s ease-in-out 0s infinite;
    }
  }
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    span {
      top: -27%;
      left: -3.3%;
      height: 88px;
      width: 99px;
    }
  }

  @media (max-width: 450px) {
    span {
      left: -6%;
      height: 86px;
      width: 100px;
    }
  }
  @media (max-height: 642px) {
    span {
      left: -5%;
      height: 75px;
      width: 87px;
      font-size: 1.2rem;
    }
  }
  @media (max-width: 277px) {
    span {
      display: none;
    }
  }
`;
const Computer = ({ 
  text = 'the internet', 
  subCopy = 'hello',
  children, onClick = () => null 
} = {}) => {
  const copy = text || children;
  return ( 
    <ComputerStyle role="image" aria-label={copy} onClick={onClick} >
      <span>
        { copy }
        {subCopy && <aside>{subCopy}</aside> }
      </span>
    </ComputerStyle>
  )
}

export default Computer;