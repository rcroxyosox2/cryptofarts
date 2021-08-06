import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import he from 'he';
import { paths } from 'Router';
import { getMoonShotsThunk, setMoonShots } from 'redux/moonshots';
import moonShotsTextImg from './images/moonshots.png';
import MoonShot from 'pages/MoonShot';
import socket from 'services/socket';
import Modal from 'theme/Modal';
import * as styles from './styles';
export const MAX_RESULTS = 20;


export const Stars = () => (
  <styles.StarsStyle>
    <i />
    <i />
    <i />
    <i />
    <i />
    <i />
  </styles.StarsStyle>
);

const Moonshots = () => {
  const socketName = 'moonshots';
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(null); // contains moonshot id if open
  const { data: moonShots, loading, error } = useSelector((state) => state.moonShots);
  const [refs, setRefs] = useState([]);
  const handleHistoryChanged = () => {
    setModalOpen(false);
  }
  const socketFn = (res) => {
    dispatch(setMoonShots(res));
  }

  useEffect(() => {
    window.addEventListener('popstate', handleHistoryChanged);
    return () => {
      window.removeEventListener('popstate', handleHistoryChanged);
    }
  }, []);

  useEffect(() => {
    const _refs = [];
    if (moonShots.length !== refs.length) {
      moonShots.forEach(() => _refs.push(React.createRef()));
    }
    setRefs(_refs);
  }, [moonShots]);

  useEffect(() => {
    refs.forEach((ref) => {
      const ph = ref?.current?.getBoundingClientRect().height;
      const h = ref?.current?.children[1].getBoundingClientRect().height;
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
    // history.push(newRoute);
    setModalOpen(id);
    window.history.pushState(null, 'MoonShot', newRoute);
    // getMoonShot(id).then((shot) => {
    //   console.log(shot);
    // })
  }

  const handleModalClose = () => {
    setModalOpen(false);
    window.history.back();
  }

  const List = () => (
    <ul>
      {
        moonShots?.map((shot, i) => (
          <li key={shot.id} onClick={handleClick(shot.id)}>
            <i />
            <div ref={refs[i]}>
              <span></span>
              <aside>{he.decode(shot.title.replace(/\|/g, ':::'))}</aside>
            </div>
          </li>
        ))
      }
    </ul>
  );

  return (
    <CSSTransition in={!loading} timeout={300}>
      <styles.MoonShotsStyles maxResults={MAX_RESULTS}>
        <header>
          <Stars />
          <img src={moonShotsTextImg} />
        </header>
        <section className="loadingSection">Loading...</section>
        { (!loading && error) ? <div className="errorSection">'Sorry, no moonshots rn'</div> : <List /> }
        <Modal isOpen={!!modalOpen} onModalClose={handleModalClose} dark>
          <MoonShot id={modalOpen} onClose={handleModalClose} isOpen={!!modalOpen} />
        </Modal>
      </styles.MoonShotsStyles>
    </CSSTransition>
  );
}

export default Moonshots;
