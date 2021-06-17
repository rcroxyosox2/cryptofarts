import styled, { keyframes } from 'styled-components';
import { jiggle, bobRotate } from 'theme/animations';
import { BGImageStyle } from '../styles';
import dave from './dave.png';

export const DaveStyle = styled(BGImageStyle)`
  animation: 500ms infinite ${jiggle};
  background-image: url(${dave});
  width: 138px;
  height: 178px;
`;

export default [
  DaveStyle
];
