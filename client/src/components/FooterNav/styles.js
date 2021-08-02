import styled from 'styled-components';

export const FooterNavStyle = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
  padding: 10% 3% 5%;
  background-color: white;
  clip-path: polygon(0% 22%,100% 0%,100% 100%, 0% 100%);
  z-index: 2;
  transition: all 0.3s ease-out;
  > div {
    display: flex;
    flex-flow: row nowrap;
    gap: 2vw;
  }
`;