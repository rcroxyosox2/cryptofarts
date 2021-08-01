import styled from 'styled-components';
import moonImg from './images/moon.png';
import shine from 'images/shine.png';
import msGirlsImg from './images/msgirls.png';
import { sizeChanger, blink } from 'theme/animations';
import shotGlassImg from './images/shotglass.png';

export const StarsStyle = styled.div.attrs({ className: 'StarsStyle' })`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  i {
    display: block;
    width: 1px; height: 1px;
    background: white;
    position: absolute;
    animation: ${blink} 4s ease-in-out 0s infinite;
    &:first-child {
      left: 30%;
      top: 13%;
      animation-duration: 2s;
    }
    &:nth-child(2) {
      left: 10%;
      top: 10%;
      animation-duration: 1.6s;
    }
    &:nth-child(3) {
      left: 20%;
      top: 22%;
      animation-duration: 3.5s;
    }
    &:nth-child(4) {
      left: 49%;
      top: 22%;
      width: 2px;
      height: 2px;
      animation-duration: 4s;
    }
    &:nth-child(5) {
      left: 4%;
      top: 22%;
      width: 2px;
      height: 2px;
      animation-duration: 3s;
    }
    &:last-child {
      left: 7%;
      top: -4%;
    }
  }
`;

export const MoonShotsStyles = styled.section.attrs({ className: 'MoonShotsStyles' })`
  position: relative;
  color: white;
  padding-top: 2%;
  &.enter, &.enter-active, &.enter-done {
    header {
      img {
        top: 0;
        left: 0;
      }
      &:before {
        transform: translate(0, 0) scale(1);
      }
      &:after {
        transform: rotate(0deg);
        left: auto;
        right: 0;
        top: -2%;
        opacity: 1;
      }
      ${StarsStyle} {
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    .loadingSection {
      transform: translate(0, 0);
      max-height: 0;
      opacity: 0;
      padding: 0;
    }
    ul {
      opacity: 1;
      max-height: 40%;
      padding: 4% 0 18% 6%;
    }
  }
  &:after {
    content: "";
    display: block;
    background-image: url(${moonImg});
  }
  &:before {
    content: "";
    background: black;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: skew(0deg, 5.5deg);
  }
  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    ${StarsStyle} {
      width: 50%;
      height: 100%;
      left: 38%;
      top: 8%;
    }
    img {
      margin-top: 2%;
      width: 62%;
      animation: ${sizeChanger} 2s ease-in-out infinite;
      position: relative;
      transition: all 0.3s ease-in-out;
      top: 8%;
      left: 20%;
    }
    &:before {
      content: "";
      position: absolute;
      background-image: url(${moonImg});
      background-repeat: no-repeat;
      background-size: contain;
      transition: all 0.3s ease-in-out;
      width: 16%;
      height: 52%;
      top: -26%;
      left: 15%;
      z-index: 2;
      transform: translate(27%, 6%) scale(1.5);
    }
    &:after {
      content: "";
      transition: all 0.3s ease-in-out;
      background-image: url(${msGirlsImg});
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      width: 45%;
      height: 100%;
      left: 27%;
      top: 24%;
      opacity: 0;
      transform: rotate(6deg) scale(1.1);
    }
  }
  
  .loadingSection {
    width: 100%;
    padding: 8% 6% 20%;
    text-align: center;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
    max-height: 13%;
    opacity: 1;
  }
  ul {
    width: 93%;
    overflow-x: scroll;
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(${(props) => props.maxResults}, 60%);
    gap: 5%;
    padding: 0;
    margin: 0;
    transition: all 0.3s ease-in-out;
    transform: rotate(1deg);
    max-height: 0;
    opacity: 0;
    position: relative;
    box-sizing: content-box;
    &:after {
      content: "";
      position: sticky;
      right: 0;
      top: 0;
      height: 100%;
      width: 3%;
      display: block;
      background: black;
      box-shadow: 0 0 7px 8px black;
      opacity: 1;
    }
    li {
      list-style: none;
      position: relative;
      height: 100%;
      background-image: url(${shotGlassImg});
      background-repeat: no-repeat;
      background-size: 100% 100%;
      max-height: 227px;
      padding: 10%;
      box-sizing: border-box;
      overflow-y: scroll;
      text-shadow: -6px 5px 0 black;
      transition: all 300ms ease-in-out;
      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }
      &:nth-child(3n+1) {
        transform: rotate(-2deg);
        &:hover {
          transform: scale(1.05) rotate(-2deg);
        }
      }
      /* > i {
        display: block;
        position: absolute;
        background-image: url(${shine});
        background-position: bottom left;
        background-repeat: no-repeat;
        background-size: 50%;
        width: 100%; height: 100%;
        left: 9%;
        bottom: 5%;
        opacity: 0.6;
      } */
      div {
        /* background: #1e90ff; */
        /* clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%); */
        /* text-align: justify; */
        box-sizing: content-box;
        white-space: normal;
        height: 100%;
        overflow-y: scroll;
        padding-top: 0.5%;
        > span {
          box-sizing: content-box;
          /* &:before, &:after {
            box-sizing: content-box;
            content: '';
            width: 50%; 
            height: 200%;
            shape-margin: 3%;
            display: block;
          } */
          /* &:before {
            float: left;
            shape-outside: polygon(0 0, 0% 100%, 46% 100%);
            clip-path: polygon(0 0, 0% 100%, 46% 100%);  
          }
          &:after {
            float: right;
            shape-outside: polygon(100% 0, 54% 100%, 100% 100%);;
            clip-path: polygon(100% 0, 54% 100%, 100% 100%);; 
          } */
        }
      }
      /* &:before, &:after {
        content: "";
        z-index: -2;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: white;
        clip-path: polygon(0 0, 100% 0, 87% 100%, 12% 100%);
      }
      &:after {
        z-index: -1;
        background: black;
        clip-path: polygon(1% 1%,99% 1%,86% 99%,13% 99%);
      } */
    }
  }
`;
