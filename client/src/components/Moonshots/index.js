import React, { useRef, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import he from 'he';
import { paths } from 'Router';
import { useHistory } from 'react-router-dom';
import { getMoonShotsThunk, setMoonShots } from 'redux/moonshots';
import moonImg from './images/moon.png';
import msGirlsImg from './images/msgirls.png';
import moonShotsTextImg from './images/moonshots.png';
import { sizeChanger, blink } from 'theme/animations';
import MoonShot from 'pages/MoonShot';
import socket from 'services/socket';
import Modal from 'theme/Modal';
export const MAX_RESULTS = 20;

const StarsStyle = styled.div.attrs({ className: 'StarsStyle' })`
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

const MoonShotsStyles = styled.section.attrs({ className: 'MoonShotsStyles' })`
  position: relative;
  color: white;
  padding-top: 2vh;
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
        right: 0;
        top: -2vh;
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
      max-height: 40vh;
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
      left: 38vw;
      top: 8vh;
    }
    img {
      margin-top: 2vh;
      width: 62%;
      animation: ${sizeChanger} 2s ease-in-out infinite;
      position: relative;
      transition: all 0.3s ease-in-out;
      top: 8vh;
      left: 20vw;
    }
    &:before {
      content: "";
      position: absolute;
      background-image: url(${moonImg});
      background-repeat: no-repeat;
      background-size: cover;
      transition: all 0.3s ease-in-out;
      width: 17vw;
      height: 17vw;
      top: -7vh;
      left: 15vw;
      z-index: 2;
      transform: translate(27vw, 6vw) scale(1.5);
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
      right: 28vw;
      top: 25vh;
      transform: rotate(6deg) scale(1.1);
    }
  }
  
  .loadingSection {
    width: 100%;
    padding: 8vh 6vw 2vh;
    text-align: center;
    font-size: 2vh;
    transition: all 0.3s ease-in-out;
    transform: translate(-16vw, -17vh);
    max-height: 13vh;
    opacity: 1;
  }
  ul {
    width: 93vw;
    overflow-x: scroll;
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(${MAX_RESULTS}, 55vw);
    gap: 5vw;
    padding: 4vh 0 7vh 6vw;
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
      width: 2vw;
      display: block;
      background: black;
      box-shadow: -1vw -1vw 5vw 6vw black;
    }
    li {
      list-style: none;
      position: relative;
      height: 32vh;
      &:nth-child(3n+1) {
        transform: rotate(-2deg);
      }
      div {
        /* background: #1e90ff; */
        /* clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%); */
        /* text-align: justify; */
        box-sizing: content-box;
        white-space: normal;
        height: 100%;
        overflow-y: scroll;
        padding-top: 0.5vh;
        > span {
          box-sizing: content-box;
          &:before, &:after {
            box-sizing: content-box;
            content: '';
            width: 50%; 
            height: 200%;
            shape-margin: 3vw;
            display: block;
          }
          &:before {
            float: left;
            shape-outside: polygon(0 0, 0% 100%, 46% 100%);
                    /* the following three lines are only for demonstration purposes
                    */
                    /* background: red; */
                    clip-path: polygon(0 0, 0% 100%, 46% 100%);  
            }
            &:after {
              float: right;
              shape-outside: polygon(100% 0, 54% 100%, 100% 100%);;
                      /* the following three lines are only for demonstration purposes
                      */
                      /* background: red; */
                      clip-path: polygon(100% 0, 54% 100%, 100% 100%);; 
            }
        }
      }
      &:before, &:after {
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
      }
    }
  }
`;

export const Stars = () => (
  <StarsStyle>
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
  </StarsStyle>
);

const Moonshots = () => {
  const socketName = 'moonshots';
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(null); // contains moonshot id if open
  const { data: moonShots, loading, error } = useSelector((state) => state.moonShots);
  const [refs, setRefs] = useState([]);

  const socketFn = (res) => {
    dispatch(setMoonShots(res));
  }

  useEffect(() => {
    const _refs = [];
    if (moonShots.length !== refs.length) {
      moonShots.forEach(() => _refs.push(React.createRef()));
    }
    setRefs(_refs);
  }, [moonShots]);

  useEffect(() => {
    refs.forEach((ref) => {
      const ph = ref.current.getBoundingClientRect().height;
      const h = ref.current.children[1].getBoundingClientRect().height;
      if ((h) <= ph) {
        ref.current.style.overflow = 'hidden';
      }
    })
  }, [refs]);

  useEffect(() => {
    dispatch(getMoonShotsThunk(MAX_RESULTS))

    socket
    .off(socketName, socketFn)
    .on(socketName, socketFn)
  }, []);
  
  const handleClick = (id) => () => {
    // change route
    const newRoute = paths.moonshot.replace(':id', id);
    // history.push(paths.moonshot.replace(':id', id))
    setModalOpen(id);
    window.history.replaceState(null, 'MoonShot', newRoute);
    // getMoonShot(id).then((shot) => {
    //   console.log(shot);
    // })
  }

  const handleModalClose = () => {
    setModalOpen(false);
    window.history.replaceState(null, 'Overview', paths.overview);
  }

  return (
    <CSSTransition in={!loading} timeout={300}>
      <MoonShotsStyles>
        <header>
          <Stars />
          <img src={moonShotsTextImg} />
        </header>
        <section className="loadingSection">Loading...</section>
        <ul>
          {
            moonShots.map((shot, i) => (
              <li key={shot.id} onClick={handleClick(shot.id)}>
                <div ref={refs[i]}>
                  <span></span>
                  <aside>{he.decode(shot.title.replace(/\|/g, ':::'))}</aside>
                </div>
              </li>
            ))
          }
        </ul>
        <Modal isOpen={!!modalOpen} onModalClose={handleModalClose} dark>
          <MoonShot id={modalOpen} onClose={handleModalClose} isOpen={!!modalOpen} />
        </Modal>
      </MoonShotsStyles>
    </CSSTransition>
  );
}

export default Moonshots;