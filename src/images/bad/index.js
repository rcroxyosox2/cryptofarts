import styled from 'styled-components';
import { bgImageCSS } from '../styles';
import beyonce from './beyonce.png';

export const BeyonceStyle = styled.div`
  ${bgImageCSS}
  background-image: url(${beyonce});
  width: 60%;
  height: 37%;
`;

export default [
  BeyonceStyle,
];
