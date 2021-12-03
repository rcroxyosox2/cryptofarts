import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDay } from 'services/';
import { SoundButton } from 'components/Sounds';
import { useDispatch, useSelector } from 'react-redux';
import { getSoundIndexFromRange } from 'sounds/';
import { getDayThunk } from 'redux/summary';
import { isGreenDay } from 'brains/coins';
import { getRandomBadImg, getRandomGoodImg } from 'images/';
import { formatPerc } from 'utils';
import Logo from 'components/Logo';
import PointTo from 'components/PointTo';
import { paths } from 'Router';
import SearchButtonAndModal from 'components/SearchButtonAndModal';
import { setSplashPageLastVisited } from 'data/indexdb';
import MyShitStack, { myShitSortDesc } from 'components/MyShitStack';
import CoinDetail from 'pages/CoinDetail';
import Modal from 'theme/Modal';
import * as styles from './styles'

const buttonStyleSize = "default";

const CTA = ({ 
  percChange, 
  children, 
  onClick = () => null, 
  onSoundEnded = () => null } = {}) => {

  if (!percChange) {
    return null;
  }

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
  const [showDaySummary, setShowDaySummary] = useState(false);
  const percChange = day.data.avgChangePerc24hr;
  const formattedPercChange = formatPerc(percChange);
  const badDay = (percChange < 0);
  let unmounted = false;


  useEffect( async() => {
    const isStale = false;
    if (isStale) {
      history.replace(paths.overview);
    } 

    dispatch(getDayThunk());
    return () => {
      unmounted = true;
    }
  }, []);

  const handleOnMyShit = (coins) => {
    if (coins?.length) {
      !unmounted && setMyShitClassName('withMyShit');
    } else {
      !unmounted && setMyShitClassName('withoutMyShit');
    }
  }

  const handleCTAClick = () => {
    summaryRef.current.classList.remove('hidden');
    // setShowDaySummary(true);
  }

  const handleOnSoundEnded = () => {
    history.push(paths.overview);
  }

  const handleSummaryClick = () => {
    history.push(paths.overview);
  }

  return (
    <>
      <styles.SplashStyle className={myShitClassName}>
        <div className="logoRow">
          <Logo showDayFlag={false} />
        </div>
        <div className="myShitRow">
          <MyShitStack sort={myShitSortDesc} onCoins={handleOnMyShit} />
        </div>
        <div className="bottomContainer">
          <div className="ctaContainer">
            <PointTo />
            <CTA percChange={percChange} onClick={handleCTAClick} onSoundEnded={handleOnSoundEnded}>
              TodayZ marketZ
            </CTA>
            <div className="searchRow">
              <SearchButtonAndModal styleSize={buttonStyleSize} />
            </div>
          </div>

          <div className="imgContainer">
            { percChange && (!badDay ? getRandomGoodImg() : getRandomBadImg()) }
          </div>

        </div>
      </styles.SplashStyle>
      <styles.DaySummaryStyle badDay={badDay} className="hidden" ref={summaryRef} onClick={handleSummaryClick}>
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