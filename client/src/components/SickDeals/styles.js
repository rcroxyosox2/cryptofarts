import styled from 'styled-components';
import { bobRotate } from 'theme/animations/';

export const SickDealsStyle = styled.section.attrs({ className: 'SickDealsStyle' })`
  position: relative;
  > header {
    padding: 0 10.3vw;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 6vh;
    z-index: 2;
    max-width: 100%;
    img {
      position: absolute;
      height: 145%;
      max-height: 104%;
      right: 7vw;
      top: -4vh;
      animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
      transform-origin: 0 0;
    }
  }
  @media (max-width: 375px) {
    > header {
      img {
        max-height: 93%;
        top: -2vh;
      }
    }
  }
`;

export const SickDealsContainerStyle = styled.div.attrs({ className: 'SickDealsStyle' })`
  gap: 10px 3vw;
  padding: 0 0 1vh 8vw;
  display: grid;
  grid-template-columns: repeat(${(props) => Math.ceil(props.resultCount/2)}, calc(33% - 4vw));
  grid-template-rows: repeat(2, 1fr);
  overflow-x: scroll;
  width: 100%;
`;

export const SickDealItemStyle = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  transform: rotate(-7deg);
  > div {
    color: white;
    display: flex;
    width: 100%;
    flex-flow: column;
    align-items: center;
    padding: 2vh 2vw;
    background: ${(props) => props.theme.colors.red};
    position: relative;
    gap: 0.4vh;
    > span {
      text-align: center;
      white-space: nowrap;
      max-width: 100%;
      &:first-child {
        font-size: 3.5vw;
      }
      &:nth-child(2) {
        font-size: 5.3vw;
        white-space: nowrap;
      }
      &:last-child {
        font-size: 4.5vw;
        font-weight: normal;
      } 
    }
  }
  img {
    width: 18vw;
    height: 18vw;
    border-radius: 50%;
    transform: translateY(1vh);
  }
`;
