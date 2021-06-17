import styled, { keyframes } from 'styled-components';
import { jiggle } from 'theme/animations';
import { BGImageStyle } from '../styles';
import matt from './matt.png';

export const MattStyle = styled(BGImageStyle)`
  animation: 500ms infinite ${jiggle};
  background-image: url(${matt});
  width: 138px;
  height: 179px;
`;

export default [
  MattStyle
];
