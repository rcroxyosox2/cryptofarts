import styled, { css } from 'styled-components';
import { ButtonStyle } from 'theme/Button/styles';
import { neutralInverseBorderedCSS, goodCSS, badCSS, lrgCapCSS, midCapCSS, smCapCSS } from 'theme/main';
import { bobRotate } from 'theme/animations';
import { PointToStyle } from 'components/PointTo/styles';

const propSelectedCSSMap = {
  green: goodCSS,
  red: badCSS,
  lrg: lrgCapCSS,
  mid: midCapCSS,
  sm: smCapCSS
};

export const FilterButtonStyle = styled(ButtonStyle)`
  padding: 0.5rem 1rem;
  ${neutralInverseBorderedCSS};
  ${(props) => {
    return props.selected ? css`
      ${propSelectedCSSMap[props.filterType]}
      border-color: transparent;
    ` : null;
  }}
  span {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;;
    justify-content: flex-start;
    text-align: left;
    line-height: 1em;
    gap: 2%;
  }
  i {
    display: block;
    width: 16px;
    height: 12px;
    margin-right: 4px;
    ${(props) => propSelectedCSSMap[props.filterType]}
  }
  &:after {
    content: attr(data-content);
    position: absolute;
    bottom: -12px;
    width: 100%;
    left: 0;
    color: black;
    font-size: 3%;
  }
`;

export const GreensRedsStyle = styled.section.attrs({ className: 'GreensRedsStyle'})`
  padding: 0 9%;
  position: relative;
  ${PointToStyle} {
    width: 84px;
    right: 25%;
    top: -44px;
    background: white;
    padding: 3%;
  }
  main {
    mark {
      &.green {
        ${propSelectedCSSMap.green}
      }
      &.red {
        ${propSelectedCSSMap.red}
      }
    }
  }
  nav {
    display: flex;
    flex-flow: column nowrap;
    gap: 8px;
    margin-bottom: 10%;
    .imgWrapper {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      animation: ${bobRotate} 1.2s ease-in-out 0s infinite;
    }
    img {
      transition: all 0.3s ease-out;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 2;
      transform: scale(0);
      &.leonardo {
        left: -5%;
        bottom: -3%;
        width: 175%;
      }
      &.fabio {
        left: -4%;
        bottom: -2%;
        width: 141%;
      }
      &.enter, &.enter-active, &.enter-done, &.shown {
        transform: scale(1);
      }
    }
    > div {
      display: flex;
      flex-flow: row nowrap;
      gap: 2%;
      > button {
        transition: all 0.2s ease-out;
        transform: rotate(-4.5deg);
      }
      > * {
        position: relative;
        width: 33%;
      }
    }
  }
`;
