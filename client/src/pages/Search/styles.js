import styled from 'styled-components';

export const SearchStyle = styled.div.attrs({ className: 'SearchStyle' })`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  width: 100vw;
  height: 100vh;
  .resultsContainer {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    > * {
      width: 100%;
    }
  }
  .searchContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
