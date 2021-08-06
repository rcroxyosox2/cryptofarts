import styled from 'styled-components';
import { PercChangeBoxStyle } from 'components/PercChangeBox/styles';

export const MyShitStyle = styled.div.attrs({ className: 'MyShitStyle' })`
  padding: 6%;

  header{ 
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: stretch;
    margin: 0 0 1rem;
    > ${PercChangeBoxStyle} {
      font-size: 2.5rem;
    }
    > * {
      &:first-child {
        max-width: 40%;
      }
      &:last-child {
        transform: rotate(3deg);
      }
    }
  }
  h1 {
    font-size: 3rem;
    transform: rotate(-5deg);
    margin: 0;
    line-height: 0.8em;
  }
`;
