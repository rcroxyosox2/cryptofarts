import styled from 'styled-components';
import { ButtonWrapperStyle } from 'theme/Button/styles';
import { PointToStyle } from 'components/PointTo/styles';

export const SplashStyle = styled.div.attrs({className: 'SplashStyle'})`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  transition: all 300ms ease-in-out;
  &.withMyShit {
    grid-template-rows: 0.7fr 1fr 1fr;
  }
  &.withoutMyShit {
    align-items: flex-end;
    grid-template-rows: 1fr 1fr;
    .myShitRow {
      display: none;
    }
  }
  > * {
    flex: 1;
    display: flex;
    align-items: flex-start;
  }
  ${ButtonWrapperStyle} {
    transform: rotate(-4.71deg);
    width: 100%;
  }
  .logoRow {
    padding: 0 10% 5%;
    top: 40%;
    z-index: 2;
    align-items: flex-end;
    justify-content: center;
    > * {
      max-width: 80%;
    }
  }
  .myShitRow {
    width: 100%;
    overflow-y: scroll;
    padding: 0 10%;
  }
  .ctaImgRow {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    position: relative;
    ${PointToStyle} {
      bottom: 115%;
      width: 37%;
      left: 25%;
      transform: rotate(-8deg);
    }
    img {
      max-width: 100%;
    }
    > * {
      position: relative;
      &:first-child {
        flex: 1;
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
      top: 7rem;
      left: 1%;
      img {
        /* width: 130%;
        max-width: none; */
      }
    }
  }
  .searchRow {
    margin-top: 5%;
    margin-left: 5%;
    transform: rotate(5deg);
  }
  .bottomContainer {
    padding: 5%;
    display: flex;
    flex-flow: column nowrap;
    bottom: 0;
    width: 100%;
    align-items: flex-start;
  }
`;

export const CTAContainerStyle = styled.div.attrs({ className: 'CTAContianerStyle' })`
  position: relative;
  white-space: nowrap;
  &:after { 
    position: absolute;
    left: 71%;
    bottom: 109%;
    text-align: right;
    content: attr(data-content);
    font-size: 2em;
  }
`;

export const DaySummaryStyle = styled.div.attrs({ className: 'DaySummaryStyle' })`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: white;
  padding: 12%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  &.hidden {
    display: none;
  }
  img {
    width: 80%;
  }
  h1 {
    font-size: 3.7rem;
    line-height: ${props => props.badDay ? '1.1em' : '0.8em'};
    font-weight: normal;
    margin: 0;
    i {
      font-style: normal;
      line-height: 0.8em;
      display: inline-block;
    }
  }
  aside {
    font-size: 7.6rem;
    letter-spacing: -0.03em;
  }
  .textContent {
    transform: rotate(${props => props.badDay ? '8deg' : '-8deg'});
    color: ${props => props.badDay ? props.theme.colors.red : props.theme.colors.green};
  }
`;