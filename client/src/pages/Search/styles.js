import styled from 'styled-components';
import { ComputerStyle } from 'components/Computer';
import { PointToStyle } from 'components/PointTo/styles';
import { RainbowStyle } from 'components/Rainbow';
import { CoinStackStyle } from 'components/CoinStack/styles';
import { bobRotateMinor } from 'theme/animations';

export const SearchStyle = styled.div.attrs({ className: 'SearchStyle' })`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  position: absolute;
  overflow: hidden;
  ${CoinStackStyle} {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: scroll;
    top: 0;
    left: 0;
    padding: 4vh 4vh 10vh;
    bottom: 0;
    z-index: 2;
    flex-direction: column-reverse;
    overflow-y: auto;
    > * {
      &:first-child {
        animation: 1400ms infinite ${bobRotateMinor};
        transform-origin: 100% 50%;
        margin-top: 3vh;
        .CoinStyleRowContainer {
          border-width: 3px;
        }
      }
    }
  }
  .resultsContainer {
    flex: 2;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    width: 100%;
    > * {
      width: 100%;
    }
  }
  .searchContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    padding: 0 8vh 8vw;
    z-index: 3;
    ${PointToStyle} {
      width: 20vw;
      left: 8vw;
      bottom: 115%;
      opacity: 1;
      transition: all 300ms ease-in-out 100ms;
      transform: translateY(0) rotate(-10deg);
    }
    input {
      transform: rotate(-0.5deg);
      transition: width 400ms ease-in-out;
      width: 100%;
    }
    &.enter, &.enter-active, &.enter-done {
      ${PointToStyle} {
        opacity: 0;
        transform: translateY(3vh);
      }
      input {
        width: 60vw;
      }
    }
  }
  .resultsStackAndRainbow {
    padding: 0 7vw;
    ${RainbowStyle} {
      transition: transform 200ms ease-in-out;
      transition-delay: 0;
      transform: scaleY(0);
      transform-origin: 50% 100%;
      position: absolute;
      width: 2vw;
      height: 10vh;
      left: 12vw;
      bottom: 0;
      > * {
        width: 100%;
        height: 100%;
      }
    }
    ${CoinStackStyle} {
      opacity: 0;
      transform: translateY(0.5vh);
      transition: all 200ms ease-in-out;
    }
    &.enter, &.enter-active, &.enter-done {
      ${CoinStackStyle} {
        transition-delay: 200ms;
        transform: translateY(0);
        opacity: 1;
      }
      ${RainbowStyle} {
        transition-delay: 200ms;
        transition-duration: 400ms;
        transform: scaleY(1);
      }
    }
    &.enter-done {
    }
  }
  &.focused {
    .computerContainerStyle {
      bottom: -1vh;
      .scaleContainer {
        transform: scale(0.7);
      }
    }
    .searchContainer {
      ${PointToStyle} {
        opacity: 0;
        transform: translateY(3vh);
      }
    }
    .rainbowContainer {
      transform: scale(0.5);
    }
  }
  .computerContainerStyle {
    position: absolute;
    width: 100%;
    bottom: 15vh;
    /* margin-left: -6vw; */
    transition: transform 400ms ease-in-out, bottom 200ms ease-in-out;
    z-index: 2;
    .scaleContainer {
      transition: transform 400ms ease-in-out;
    }
    @media (max-width: 600px) {
      .scaleContainer {
        transform: scale(1.1);
      }
    } 
    @media (max-width: 500px) {
      .scaleContainer {
        transform: scale(1);
      }
    } 
    @media (max-width: 400px) {
      .scaleContainer {
        transform: scale(0.9);
      }
    } 
    &.enter, &.enter-active, &.enter-done {
      transform: translate(-31vw,44vh) rotate(360deg);
      bottom: 17vh;
      @media (max-width: 700px) {
        .scaleContainer {
          transform: scale(1);
        }
      } 
      @media (max-width: 600px) {
        .scaleContainer {
          transform: scale(0.9);
        }
      } 
      @media (max-width: 500px) {
        .scaleContainer {
          transform: scale(0.7);
        }
      } 
      @media (max-width: 400px) {
        .scaleContainer {
          transform: scale(0.6);
        }
      } 
    }
  }
  .rainbowContainer {
    position: absolute;
    width: 100%;
    bottom: 8vh;
    transition: all 400ms ease-in-out;
    transform-origin: 50% 100%;
    bottom: -1vh;
    &.enter, &.enter-active, &.enter-done {
      transform: scaleY(0);
    }
  }
`;
