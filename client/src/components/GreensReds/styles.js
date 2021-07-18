import styled, { css } from 'styled-components';
import { ButtonStyle } from 'theme/Button/styles';
import { neutralInverseBorderedCSS, goodCSS, badCSS, lrgCapCSS, midCapCSS, smCapCSS } from 'theme/main';


const propSelectedCSSMap = {
  green: goodCSS,
  red: badCSS,
  lrg: lrgCapCSS,
  mid: midCapCSS,
  sm: smCapCSS
};

export const FilterButtonStyle = styled(ButtonStyle)`
  ${neutralInverseBorderedCSS};
  ${(props) => {
    return props.selected ? css`
      ${propSelectedCSSMap[props.filterType]}
      border-color: transparent;
    ` : null;
  }}
`;

export const GreensRedsStyle = styled.section.attrs({ className: 'GreensRedsStyle'})`
  nav {
    div {
      display: flex;
      flex-flow: row nowrap;
      > * {
        width: 33%;
        > span {
          display: block;
          text-align: left;
        }
      }
    }
  }
`;
