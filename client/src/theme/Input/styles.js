import styled from 'styled-components';

export const InputStyle = styled.input`
  border: 3px solid ${(props) => props.theme.colors.black};
  font-family: inherit;
  font-weight: bold;
  outline: none;
  font-size: 7vw;
  width: 100%;
  padding: 3vw;
  &:focus {
    border-color: ${(props) => props.theme.colors.pink};
  }
`;
