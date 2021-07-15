import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMoonShots } from 'services/';
import moonImg from './images/moon.png';
import he from 'he';
import msGirlsImg from './images/msgirls.png';
import moonShotsTextImg from './images/moonshots.png';
import { sizeChanger } from 'theme/animations';
import socket from 'services/socket';

const MoonShotsStyles = styled.section.attrs({ className: 'MoonShotsStyles' })`
  position: relative;
  color: white;
  padding-top: 2vh;
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
    img {
      width: 62%;
      animation: ${sizeChanger} 2s ease-in-out infinite;
    }
    &:before {
      content: "";
      position: absolute;
      background-image: url(${moonImg});
      background-repeat: no-repeat;
      background-size: cover;
      width: 17vw;
      height: 17vw;
      top: -7vh;
      left: 15vw;
      z-index: 2;
    }
    &:after {
      content: "";
      background-image: url(${msGirlsImg});
      background-repeat: no-repeat;
      background-size: cover;
      width: 37%;
      height: 106%;
      position: absolute;
      right: 0;
      top: -2vh;
    }
  }
  ul {
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    display: grid;
    grid-template-columns: repeat(10, 55vw);
    gap: 5vw;
    padding-bottom: 7vh;
    /* flex-flow: row nowrap; */
    /* align-items: stretch; */
    li {
      list-style: none;
      position: relative;
      height: 30vh;

      div {
        /* background: #1e90ff; */
        /* clip-path: polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%); */
        /* text-align: justify; */
        box-sizing: content-box;
        white-space: normal;
        height: 100%;
        overflow-y: scroll;
        padding-top: 2vh;
        > span {
          box-sizing: content-box;
          &:before, &:after {
            box-sizing: content-box;
            content: '';
            width: 50%; 
            height: 200%;
            shape-margin: 4vw;
            display: block;
          }
          &:before {
            float: left;
            shape-outside: polygon(0 0, 0% 100%, 66% 100%);
                    /* the following three lines are only for demonstration purposes
                    */
                    background: transparent;
                    clip-path: polygon(0 0, 0% 100%, 66% 100%);  
            }
            &:after {
              float: right;
              shape-outside: polygon(100% 0, 41% 100%, 100% 100%);;
                      /* the following three lines are only for demonstration purposes
                      */
                      background: transparent;
                      clip-path: polygon(100% 0, 41% 100%, 100% 100%);; 
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
        clip-path: polygon(0 0, 100% 0, 85% 100%, 17% 100%);
      }
      &:after {
        z-index: -1;
        background: black;
        clip-path: polygon(2% 2%,98% 2%,84% 98%,18% 98%);
      }
    }
  }
`;

const Moonshots = () => {
  const socketName = 'moonshots';
  const [moonShots, setMoonShots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const contentRef = useRef();
  const liRef = useRef();
  const socketFn = (res) => {
    setMoonShots(res);
  }

  useEffect(() => {
    setLoading(true);
    getMoonShots().then((res) => {
      setLoading(false);
      setError(null);
      setMoonShots(res);
    }).catch((e) => {
      setError(e);
      setLoading(false);
      setMoonShots([]);
    })

    socket
    .off(socketName, socketFn)
    .on(socketName, socketFn)
  }, []);
  
  return (
    <MoonShotsStyles>
      <header>
        <img src={moonShotsTextImg} />
      </header>
      <ul>
        {
          moonShots.map((shot) => (
            <li ref={liRef} key={shot.id}>
              <div ref={contentRef}>
                <span></span>
                {he.decode(shot.title.replace(/\|/g, ':::'))}
              </div>
            </li>
          ))
        }
      </ul>
    </MoonShotsStyles>
  );
}

export default Moonshots;
