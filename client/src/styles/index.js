import { appearance } from 'theme/mixins';
import styled, { createGlobalStyle } from 'styled-components';

// Regular
import comicNeueRegularWoff2 from "./fonts/ComicNeue-Regular.woff2";
import comicNeueRegularWoff from "./fonts/ComicNeue-Regular.woff";

// Bold
import comicNeueBoldWoff2 from "./fonts/ComicNeue-Bold.woff2";
import comicNeueBoldWoff from "./fonts/ComicNeue-Bold.woff";


export const AppStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-backface-visibility:  hidden;
    backface-visibility:  hidden;
    -webkit-tap-highlight-color:  transparent;
  }
  body {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    height: 100vh;
    overflow: hidden;
  }
  #root {
    width: 375px;
    height: 667px;
    border: 1px solid red;
    margin: 0 auto;
    position: relative;
    overflow-y: scroll;
  }
  h1 {
    font-size: 1.3rem;
  }
  audio {
    display: none;
  }
  @font-face {
    font-family: 'Comic Neue';
    src: url(${comicNeueRegularWoff2}) format('woff2'), url(${comicNeueRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Comic Neue';
    src: url(${comicNeueBoldWoff2}) format('woff2'), url(${comicNeueBoldWoff}) format('woff');
    font-weight: bold;
    font-style: normal;
  }
  body {
    font-family: 'Comic Neue';
    font-weight: bold;
    transition: background 0.3s ease-in;
  }
`;
