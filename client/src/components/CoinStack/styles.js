import styled, {css, keyframes} from 'styled-components';
import { flipAnimation } from 'theme/animations';
import { PercChangeBoxStyle } from 'components/PercChangeBox/styles';

export const CoinStyleRowContainer = styled.div.attrs({ className: 'CoinStyleRowContainer' })`
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  align-items: stretch;
  justify-content: space-between;
  border: 1px solid black;
  padding: 0.3rem;
  position: relative;

  > div {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
`;

export const CoinStackRowStyle = styled.div.attrs({ 'role': 'button' })`
  background: white;
  cursor: pointer;
  &:hover {
    .coinNameCol {
      > div {
        &:first-child {
          transform: scale(1.3);
        }
      }
    }
  }
  &.enter {
    animation: ${flipAnimation} 500ms ease-in-out ${(props) => {
      return `${props.delay}ms 1`;
    }}
  }
  &.enter, &.enter-active {
  }
  &.enter-done {
  }
  .coinNameCol {
    flex: 20%;
    width: 20%;
    align-items: flex-start;
    display: flex;
    flex-flow: column nowrap;
    > div {
      transition: all 300ms ease-in-out;
      &:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.5rem;
      }
      &:last-child {
        font-size: 0.7rem;
        left: 0;
        bottom: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;        
      }
    }
  }
  .coinImgCol {
    flex: 20%;
    img {
      background: white;
      border-radius: 15px;
    }
  }
  .sparkLinePriceCol{
    flex: 40%;
    div {
      &:last-child {
        white-space: nowrap;
        font-size: 1rem;
      }
    }
  }
  ${PercChangeBoxStyle} {
    flex: 20%;
    padding: 0.1em;
    font-size: 1.2rem;
  }
`;

export const CoinStackStyle = styled.div.attrs({ className: 'CoinStackStyle' })`
  display: flex;
  flex-flow: column nowrap;
  /* max-height: 303px;
  overflow-y: scroll; */
  > * {
    &:nth-child(3n+0) {
      ${CoinStyleRowContainer} {
        transform: rotate(0.5deg) skew(1deg);
      }
    }
    &:nth-child(3n+1) {
      margin-top: 2px;
    }
    &:nth-child(3n+2) {
      ${CoinStyleRowContainer} {
        transform: rotate(-0.2deg) skew(-0.5deg);
      }
    }
  }
  .fade-enter {
    max-height: 0;
    opacity: 0;
  }

  .fade-enter-active {
    max-height: 30px;
    opacity: 1;
    transition: all 500ms;
  }

  .fade-exit {
    max-height: 30px;
    opacity: 1;
  }

  .fade-exit-active {
    max-height: 0;
    opacity: 0;
    transition: all 500ms;
  }
`;
