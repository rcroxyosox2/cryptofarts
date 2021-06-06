import styled from 'styled-components';
import { appearance } from 'theme/mixins';

export const ButtonStyle = styled.button`
  ${appearance()}
  ${(props) => props.theme.button.defaults}
  ${(props) => props.theme.button.styleType[props.styleType]}
  ${(props) => props.theme.button.styleSize[props.styleSize]}
`;
