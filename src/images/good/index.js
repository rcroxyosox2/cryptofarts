import styled from 'styled-components';
import { bgImageCSS } from '../styles';
import irok from './irok.png';
import tacos from './tacos.png';

const IrokStyle = styled.div`
  ${bgImageCSS}
  background-image: url(${irok});
  width: 80%;
  height: 20%;
`;


const TacosStyle = styled.div`
  ${bgImageCSS}
  background-image: url(${tacos});
  width: 71%;
  height: 30%;
`;

export default [
  IrokStyle,
  TacosStyle,
];
