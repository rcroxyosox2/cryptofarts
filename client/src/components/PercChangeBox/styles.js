import styled, { css } from 'styled-components';
import {
  coinHasBigPump,
  coinHasBigDump,
  COIN_CHANGE_KEY,
} from 'brains/coins';
import { buff } from 'theme/animations';
import buffImg from 'images/buffarm.png';

export const bigPumpCSS = css`
  &:after {
    animation: ${buff} 1.2s ease-in-out 0s infinite;
    transform-origin: 100% 100%;
    content: "";
    position: absolute;
    right: 96%;
    bottom: 0;
    margin-top: -5.5vw;
    background-image: url(${buffImg});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center right;
    width: 100%;
    height: 100%;
  }
`;

export const PercChangeBoxStyle = styled.div.attrs({ className: 'PercChangeBoxStyle' })`
  padding: 0.1em;
  font-size: 1.2rem;
  position: relative;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  flex-flow: column nowrap;
  ${(props) => props.bigPump ? bigPumpCSS : null}
  ${(props) => Boolean(props.red) ? props.theme.snippets.badCSS : null }
  ${(props) => Boolean(props.green) ? props.theme.snippets.goodCSS : null }
`;
