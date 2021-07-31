import styled from 'styled-components';
import { ComputerStyle } from 'components/Computer';
import { PointToStyle } from 'components/PointTo/styles';
import { RainbowStyle } from 'components/Rainbow';
import { CoinStackStyle } from 'components/CoinStack/styles';
import { bobRotateMinor } from 'theme/animations';
import { ButtonWrapperStyle } from 'theme/Button/styles';

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
    padding: 0 8% 8%;
    z-index: 3;
    ${PointToStyle} {
      width: 20%;
      left: 8%;
      bottom: 115%;
      opacity: 1;
      transition: all 300ms ease-in-out 100ms;
      transform: translateY(0) rotate(-10deg);
    }
    ${ButtonWrapperStyle} {
      position: absolute;
      right: 8%;
      top: -70%;
      transform: rotate(2deg);
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
        width: 84%;
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
      bottom: -1%;
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
    height: 50%;
    bottom: 22%;
    /* margin-left: -6vw; */
    transition: transform 400ms ease-in-out, bottom 200ms ease-in-out;
    z-index: 2;
    .scaleContainer {
      width: 100%;
      height: 100%;
      position: absolute;
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
      transform: translate(-31%,111%) rotate(360deg);
      bottom: 17vh;
      .scaleContainer {
        transform: scale(0.6);
      }
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
