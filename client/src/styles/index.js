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
    overflow: hidden;
    font-family: 'Comic Neue';
    font-weight: bold;
    transition: background 0.3s ease-in;
  }
  #root {
    width: 375px;
    height: 667px;
    margin: 0 auto;
    position: relative;
    overflow-y: scroll;
    background: white;
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
  @media (max-width: ${ props => props.theme.responsive.largestMobileScreen}) {
    #root {
      position: static;
      width: 100%;
      height: unset;
      border: none;
      margin: 0 auto;
      overflow-y: initial;
    }
    body {
      height: auto;
      overflow: initial;
    }
  }
`;
