import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDay } from 'services/';
import { SoundButton } from 'components/Sounds';
import { useDispatch, useSelector } from 'react-redux';
import { getSoundIndexFromRange } from 'sounds/';
import { getDayThunk } from 'redux/summary';
import { isGreenDay, COIN_CHANGE_KEY } from 'brains/coins';
import { getRandomBadImg, getRandomGoodImg } from 'images/';
import { formatPerc } from 'utils';
import Logo from 'components/Logo';
import PointTo from 'components/PointTo';
import { paths } from 'Router';
import SearchButtonAndModal from 'components/SearchButtonAndModal';
import { setSplashPageLastVisited, splashPageIsStale } from 'data/indexdb';
import MyShitStack from 'components/MyShitStack';
import CoinDetail from 'pages/CoinDetail';
import Modal from 'theme/Modal';
import * as styles from './styles'

const buttonStyleSize = "default";

const CTA = ({ 
  percChange, 
  children, 
  onClick = () => null, 
  onSoundEnded = () => null } = {}) => {
  const soundIndex = getSoundIndexFromRange(percChange);
  const styleType = isGreenDay(percChange) ? 'good' : 'bad';

  return (
    <styles.CTAContainerStyle data-content={`${formatPerc(percChange)}`}>
      <SoundButton 
        onEnded={onSoundEnded} 
        soundIndex={soundIndex} 
        buttonProps={{styleType, styleSize: buttonStyleSize}}
        onClick={onClick}
      >
        {children}
      </SoundButton>
    </styles.CTAContainerStyle>
  )
}

const Splash = () => {
  // const socket = io();
  const summaryRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { day } = useSelector((state) => state.summary);
  const [myShitClassName, setMyShitClassName] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [showDaySummary, setShowDaySummary] = useState(false);
  const percChange = day.data.avgChangePerc24hr;
  const formattedPercChange = formatPerc(percChange);
  const badDay = (percChange < 0);

  useEffect( async() => {
    dispatch(getDayThunk());
  }, []);


  const CTAAndImg = ({ onClick, onSoundEnded } = {}) => (
    <>
      <div>
        <PointTo />
        <CTA percChange={percChange} onClick={onClick} onSoundEnded={onSoundEnded}>
          TodayZ marketZ
        </CTA>
      </div>
      <div>
        { !badDay ? getRandomGoodImg() : getRandomBadImg() }
      </div>
    </>
  );

  const myShitSort = (a,b) => {
    if(a[COIN_CHANGE_KEY] <= b[COIN_CHANGE_KEY]) { return 1; }
    if(a[COIN_CHANGE_KEY] > b[COIN_CHANGE_KEY]) { return -1; }
    return 0;
  };

  const handleOnMyShit = (coins) => {
    if (coins?.length) {
      setMyShitClassName('withMyShit');
    } else {
      setMyShitClassName('withoutMyShit');
    }
  }

  const handleDetailModalClose = () => {
    window.history.replaceState(null, 'CoinDetail', paths.overview);
    setDetailModalOpen(false);
  };

  const handleCTAClick = () => {
    summaryRef.current.classList.remove('hidden');
    // setShowDaySummary(true);
  }

  const handleOnSoundEnded = () => {
    history.push(paths.overview);
  }

  let summaryFontSize;
  switch(formattedPercChange?.lenght) {
    case 8:
      summaryFontSize = '5rem';
      break;
    case 7:
      summaryFontSize = '5.9rem';
      break;
  }

  return (
    <>
      <styles.SplashStyle className={myShitClassName}>
        <div className="logoRow">
          <Logo />
        </div>
        <div className="myShitRow">
          <MyShitStack sort={myShitSort} onCoins={handleOnMyShit} />
        </div>
        <div className="bottomContainer">
          <div className="ctaImgRow">
              {
                percChange && <CTAAndImg onClick={handleCTAClick} onSoundEnded={handleOnSoundEnded} />
              }
          </div>
          <div className="searchRow">
            <SearchButtonAndModal styleSize={buttonStyleSize} />
          </div>
        </div>
      </styles.SplashStyle>
      <Modal isOpen={!!detailModalOpen} onModalClose={handleDetailModalClose}>
        <CoinDetail coinId={detailModalOpen} handleBackClick={handleDetailModalClose} />
      </Modal>

      <styles.DaySummaryStyle badDay={badDay} className="hidden" ref={summaryRef}>
        { badDay ? getRandomBadImg() : getRandomGoodImg() }
        <div className="textContent">
          <h1>{badDay ? (<><i>Oh no, Stuff is</i> down</>) : 'Da hole shit is up'}</h1>
          <aside>{formattedPercChange}</aside>
        </div>
      </styles.DaySummaryStyle>

    </>
  );
};

export default Splash;