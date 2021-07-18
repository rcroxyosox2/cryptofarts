import styled, { createGlobalStyle } from 'styled-components';

export const MoonShotStyle = styled.div.attrs({ className: 'MoonShotStyle' })`
  color: white;
  background: black;
  .contractBox {
    border: 1px solid white;
    padding: 3.2vw;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: 3.2vw;
    margin-bottom: 5vh;
    position: relative;
    i {
      display: block;
      border: 1px solid white;
      width: 2.5vw;
      height: 3.2vw;
      position: relative;
      left: 1.1vw;
      bottom: 0.6vw;
      &:after {
        content: "";
        display: block;
        position: relative;
        background: black;
        border: 1px solid white;
        width: 2.1vw;
        height: 2.9vw;
        left: -1.1vw;
        bottom: -0.6vw;
      }
    }
  }
  header {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    height: 25vh;
    h1 {
      font-size: 8vh;
      max-width: 91%;
      text-shadow: 4px 4px 0 black;
      transform: rotate(-5deg);
      line-height: 6.7vh;
    }
  }
  a {
    word-break: break-word;
    color: ${(props) => props.theme.colors.pink};
    font-size: 3.5vh;
  }
`;

export const FooterStyle = styled.footer`
  display: flex;
  flex-flow: row nowrap;
  position: sticky;
  left: 0;
  bottom: 0;
  width: 100%;
  justify-content: space-between;
  padding: 6vh 3vh 5vw;
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

export const ImageAreaStyle = styled.div`
  .StarsStyle {
    position: fixed;
    z-index: 2;
    height: 13vh;
    width: 78vw;
    left: 37%;
    top: 39vh;
    transform: scale(1.5);
  }
  .moonImg {
    z-index: 1;
    width: 120vw;
    height: 120vw;
    position: fixed;
    transition: all 0.3s ease-out;
    left: -8%;
    top: -35%;
  }
  .girlzImg {
    z-index: 0;
    position: absolute;
    transform: rotate(5deg);
    transition: all 0.3s ease-out;
    right: 13%;
    top: -0.8vh;
    width: 37vw;
    height: 29vw;
    opacity: 0;
  }

  &.enter, &.enter-active, &.enter-done {
    .moonImg {
      left: -43%;
      top: -50%;
    }
    .girlzImg {
      right: 1%;
      top: 8.8vh;
      opacity: 1;
    }
    .StarsStyle {
      left: 50%;
      top: 93px;
      transform: scale(1);
    }
  }
`;

export const MainContentStyle = styled.main.attrs({ className: 'MainContentStyle'})`
  padding: 0 8vw 5vh;
  z-index: 2;
  position: relative;
  min-height: 100vh;
  transition: all 0.3s ease-out;
  opacity: 0;
  &.enter, &.enter-active, &.enter-done {
    opacity: 1; 
  }
`;

export const CopiedStyle = styled.div`
  position: absolute;
  top: -50%;
  right: 10%;
  transition: all 0.3s ease-out;
  opacity: 0;
  background: ${(props) => props.theme.colors.pink};
  padding: 2vh;
  transform: rotate(3deg);
  color: black;
  &.enter, &.enter-active, &.enter-done {
    opacity: 1; 
  }
`;

export const LoadingStyle = styled.div`
  transition: all 0.3s ease-out;
  opacity: 0;
  transform: translateY(-3vh);
  top: 43vh;
  z-index: 3;
  width: 100%;
  font-size: 14vw;
  text-align: center;
  position: absolute;
  &.enter, &.enter-active, &.enter-done {
   opacity: 1; 
   transform: translateY(0);
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }
`;
