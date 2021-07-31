import styled, { createGlobalStyle, css } from 'styled-components';

export const MoonShotStyle = styled.div.attrs({ className: 'MoonShotStyle' })`
  position: relative;
  color: white;
  background: black;
  .content {
    min-height: 100vh;
  }
  .contractBox {
    border: 1px solid white;
    padding: 3.2%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    margin-bottom: 5%;
    position: relative;
    i {
      display: block;
      border: 1px solid white;
      width: 13px;
      height: 16px;
      position: relative;
      left: 1.1%;
      bottom: 0.6%;
      &:after {
        content: "";
        display: block;
        position: relative;
        background: black;
        border: 1px solid white;
        width: 100%;
        height: 100%;
        left: -33%;
        bottom: -8%;
      }
    }
  }
  header {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    height: 25%;
    h1 {
      font-size: 2.5rem;
      max-width: 72%;
      text-shadow: 4px 4px 0 black;
      transform: rotate(-5deg);
      line-height: 1em;
    }
  }
  a {
    word-break: break-word;
    color: ${(props) => props.theme.colors.pink};
    font-size: 1.5rem;
  }
`;

export const ImageAreaStyle = styled.div.attrs({className: 'ImageAreaStyle'})`
  .StarsStyle {
    position: absolute;
    z-index: 2;
    height: 13%;
    width: 100%;
    left: 0;
    top: 39%;
    transform: scale(1.5);
  }
  .moonImg {
    z-index: 1;
    width: 400px;
    position: absolute;
    transition: all 0.3s ease-out;
    left: 0%;
    top: -300px;
  }
  .girlzImg {
    z-index: 0;
    position: absolute;
    transform: rotate(5deg);
    transition: all 0.3s ease-out;
    right: 13%;
    top: -3%;
    width: 150px;
    opacity: 0;
  }

  &.enter, &.enter-active, &.enter-done {
    .moonImg {
      left: -43%;
      top: -300px;
    }
    .girlzImg {
      right: 1%;
      top: 21px;
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
  padding: 0 8% 5%;
  z-index: 2;
  position: relative;
  min-height: 100%;
  transition: all 0.3s ease-out;
  opacity: 0;
  width: 100%;
  top: 0;
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
  padding: 2%;
  transform: rotate(3deg);
  color: black;
  &.enter, &.enter-active, &.enter-done {
    opacity: 1; 
  }
`;

export const LoadingStyle = styled.div`
  transition: all 0.3s ease-out;
  opacity: 0;
  transform: translateY(-3%);
  top: 200px;
  z-index: 3;
  width: 100%;
  font-size: 2.5rem;
  text-align: center;
  position: absolute;
  &.enter, &.enter-active, &.enter-done {
   opacity: 1; 
   transform: translateY(0);
  }
`;

// export const GlobalStyle = createGlobalStyle`
//   #root {
//     background: black;
//   }
// `;
