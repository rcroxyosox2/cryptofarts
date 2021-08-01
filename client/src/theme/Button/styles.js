import styled from 'styled-components';
import { appearance } from 'theme/mixins';

export const ButtonWrapperStyle = styled.div.attrs({ className: 'ButtonWrapperStyle' })`

`;

export const ButtonStyle = styled.button`
  ${appearance()}
  ${(props) => props.theme.button.defaults}
  ${(props) => (props.theme.button.styleType[props.styleType] || props.theme.button.styleType.default) }
  ${(props) => (props.theme.button.styleSize[props.styleSize] || props.theme.button.styleSize.default) }
  &[disabled] {
    text-decoration: line-through;
    border-color: transparent;
  }
`;
