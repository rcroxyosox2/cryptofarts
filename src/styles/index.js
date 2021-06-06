import styled, { createGlobalStyle } from 'styled-components';

// Regular
import comicNeueRegularWoff2 from "./fonts/ComicNeue-Regular.woff2";
import comicNeueRegularWoff from "./fonts/ComicNeue-Regular.woff";

// Bold
import comicNeueBoldWoff2 from "./fonts/ComicNeue-Bold.woff2";
import comicNeueBoldWoff from "./fonts/ComicNeue-Bold.woff";


export const AppStyle = createGlobalStyle`
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
  :root {
    font-size: 24px;
  }
  body {
    font-family: 'Comic Neue';
    font-weight: bold;
  }
`;
