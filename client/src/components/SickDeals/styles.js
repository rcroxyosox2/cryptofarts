import styled from 'styled-components';
import { bobRotate } from 'theme/animations/';

export const SickDealsStyle = styled.section.attrs({ className: 'SickDealsStyle' })`
  position: relative;
  > header {
    padding: 0 10.3%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 6%;
    z-index: 2;
    max-width: 100%;
    img {
      position: absolute;
      height: 145%;
      max-height: 104%;
      right: 7%;
      top: -4%;
      animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
      transform-origin: 0 0;
    }
  }
  @media (max-width: 375px) {
    > header {
      img {
        max-height: 93%;
        top: -2%;
      }
    }
  }
`;

export const SickDealsContainerStyle = styled.div.attrs({ className: 'SickDealsContainerStyle' })`
  gap: 10px 3%;
  padding: 0 0 0 8%;
  margin-bottom: 12%;
  display: grid;
  grid-template-columns: repeat(${(props) => Math.ceil(props.resultCount/2)}, calc(33% - 4%));
  grid-template-rows: repeat(2, 1fr);
  overflow-x: scroll;
  overflow-y: hidden;
  box-sizing: content-box;
  width: 92%;
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
    padding: 14% 13%;
    background: ${(props) => props.theme.colors.red};
    position: relative;
    gap: 0.1rem;
    top: -0.3em;
    > span {
      text-align: center;
      white-space: nowrap;
      max-width: 100%;
      &:first-child {
        font-size: 0.8rem;
      }
      &:nth-child(2) {
        font-size: 1.2rem;
        white-space: nowrap;
      }
      &:last-child {
        font-size: 1rem;
        font-weight: normal;
      } 
    }
  }
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    transform: translateY(1%);
  }
`;
