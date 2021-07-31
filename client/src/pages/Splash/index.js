import { useEffect } from 'react';
import { getDay } from 'services/';
import { SoundButton } from 'components/Sounds';
import { useDispatch, useSelector } from 'react-redux';
import { getSoundIndexFromRange } from 'sounds/';
import { getDayThunk } from 'redux/summary';
import { isGreenDay } from 'brains/general';
import { getRandomBadImg, getRandomGoodImg } from 'images/';
import numeral from 'numeral';
import Logo from 'components/Logo';
import PointTo from 'components/PointTo';
import * as styles from './styles'

const CTA = ({ percChange, children }) => {
  const soundIndex = getSoundIndexFromRange(percChange);

  const handleOnEnded = () => {
    console.log('trying')
    // changePage(() => {
    //   history.push(paths.overview)
    // });
  }

  const styleType = isGreenDay(percChange) ? 'good' : 'bad';

  return (
    <styles.CTAContainerStyle data-content={`${numeral(percChange).format('0.00')}%`}>
      <SoundButton onEnded={handleOnEnded} soundIndex={soundIndex} buttonProps={{styleType: styleType}}>
        {children}
      </SoundButton>
    </styles.CTAContainerStyle>
  )
}

const Splash = () => {
  // const socket = io();
  const dispatch = useDispatch();
  const { day } = useSelector((state) => state.summary);

  useEffect(() => {
    dispatch(getDayThunk());
    // getDay().then((r) => {
    //   console.log(r.avgChangePerc24hr);
    // })
    // socket.on('day', (msg) => {
    //   console.log(msg);
    // });

  }, []);

  const percChange = day.data.avgChangePerc24hr;

  const CTAAndImg = () => (
    <>
      <div>
        <PointTo />
        <CTA percChange={percChange}>
          TodayZ marketZ
        </CTA>
      </div>
      <div>
        { percChange > 0 ? getRandomGoodImg() : getRandomBadImg() }
      </div>
    </>
  );

  return (
    <styles.SplashStyle>
      <div className='logoRow'>
        <Logo />
      </div>
      <div className='ctaImgRow'>
          {day.data.avgChangePerc24hr && <CTAAndImg />}
      </div>
    </styles.SplashStyle>
  );
};

export default Splash;