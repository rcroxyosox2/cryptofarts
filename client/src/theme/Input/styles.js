import styled from 'styled-components';

export const InputStyle = styled.input`
  border: 3px solid ${(props) => props.theme.colors.black};
  font-family: inherit;
  font-weight: bold;
  outline: none;
  font-size: 1.5rem;
  width: 100%;
  padding: 4.3%;
  transition: all 280ms ease-in-out;
  &:focus {
    border-color: ${(props) => props.theme.colors.pink};
  }
`;
