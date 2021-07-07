import styled from 'styled-components';
import { ButtonStyle } from 'theme/Button/styles';
import { PointToStyle } from 'components/PointTo/styles';

export const SplashStyle = styled.div.attrs({className: 'SplashStyle'})`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  > * {
    flex: 1;
    display: flex;
    align-items: center;
  }
  ${ButtonStyle} {
    transform: rotate(-4.71deg);
    width: 100%;
  }
  .logoRow {
    padding: 0 10%;
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
  }
  .ctaImgRow {
    padding: 0 5%;
    position: absolute;
    bottom: 0;
    ${PointToStyle} {
      bottom: 115%;
      width: 20vw;
      left: 25%;
      transform: rotate(-8deg);
    }
    img {
      max-width: 100%;
    }
    > * {
      position: relative;
      &:first-child {
        z-index: 2;
      }
      &:last-child {
        flex: 1;
        z-index: 1;
        > div {
          position: relative;
        }
      }
    }
    .tacos {
      margin: 8vh 0 3vh;
      img {
        width: 110%;
        max-width: none;
      }
    }
    .irok {
      margin: 23vh 0 3vh;
      left: -11vw;
      img {
        width: 146%;
        max-width: none;
      }
    }
    .beyonce {
      top: 6vw;
      left: 1vw;
      img {
        /* width: 130%;
        max-width: none; */
      }
    }
  }
`;

export const CTAContainerStyle = styled.div.attrs({ className: 'CTAContianerStyle' })`
  position: relative;
  white-space: nowrap;
  &:after { 
    position: absolute;
    left: 96%;
    bottom: 100%;
    text-align: right;
    content: attr(data-content);
    font-size: 4.7vw;
  }
`;
