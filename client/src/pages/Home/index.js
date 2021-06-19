import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useLiveQuery } from "dexie-react-hooks";
import { useHistory, useLocation } from 'react-router-dom';
import medFart2Sound from 'sounds/mid-fart2-c.mp3'
import { paths } from 'Router';
import { filter, sortBy } from 'lodash';
import Button from 'theme/Button';
import sound from 'sounds/mid-fart2-c.mp3'
import tapHereImg from 'images/tapHere.png';
import PageAnimation from 'pages/PageAnimation';
import { db } from 'data/indexdb';
import { getSoundIndexFromRange } from 'sounds/';
import { SoundButton } from 'components/Sounds';
import FlyingStuff from 'components/FlyingStuff';

import {
  getTotalChangeFromCoinsResponse,
  filteredCoins,
  topCoins,
} from 'brains/coins'
import {
  setPlaySoundIndex,
} from 'redux/coins';
import {
  getRandomBadImgStyle,
  getRandomGoodImgStyle,
} from 'images';
import * as styles from './styles';

const RandomGoodImgStyle = getRandomGoodImgStyle();
const RandomBadImgStyle = getRandomBadImgStyle();

const CTA = ({ priceChange, isGood, changePage }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const soundIndex = getSoundIndexFromRange(priceChange);
  // console.log(priceChange);

  useEffect(async() => {

    try {
      const response = await fetch('/test');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message) 
      }
      console.log("yaaaayyyy",body);
    } catch(e) {
      console.error(e);
    }

  }, [])

  const handleOnEnded = () => {
    // console.log('trying')
    changePage(() => {
      history.push(paths.overview)
    });
  }

  const styleType = isGood() ? 'good' : 'bad';

  return (
    <>
      <SoundButton onEnded={handleOnEnded} soundIndex={soundIndex} buttonProps={{styleType: styleType}}>
        Todayz MarketZ
      </SoundButton>
    </>
  )
}

const HomeScreenNoMyShit = ({ pageAnimationState, isGood, priceChange, changePage }) => {
  const RandomImageStyle = isGood ? RandomGoodImgStyle : RandomBadImgStyle;
  return (
    <styles.HomeScreenNoMyShitStyle className={pageAnimationState}>
      <styles.RandomImageContainerStyle>
        {RandomImageStyle && <RandomImageStyle className="randomImg" />}
      </styles.RandomImageContainerStyle>
      <styles.TapHereImageContainerStyle>
        <img src={tapHereImg} alt="tap here" className="tapHereImg" />
      </styles.TapHereImageContainerStyle>
      <CTA isGood={isGood} priceChange={priceChange} changePage={changePage} />
    </styles.HomeScreenNoMyShitStyle>
  );
}

const HomeScreenWithMyShit = () => {
  return (<div>Todo</div>)
}

const Home = () => {
  const coins = useLiveQuery(() => db.coins.toArray());
  const { loadStatus, error } = useSelector((state) => state.coins);
  const priceChange = getTotalChangeFromCoinsResponse(coins);
  const isGood = () => priceChange > 0;
  const myShit = [];

  const floaterCoins = topCoins(coins, 50);
  const floater = <FlyingStuff stuffArr={floaterCoins.map((coin) => [coin.id, (
    <>
      <img src={coin.image} alt={coin.name} width="30" height="30" />
      {coin.id}
    </>
  )])} />;

  if (loadStatus?.status === 'loading' && !loadStatus.quiet) {
    return (
      <>
        {floater}
        <div>loading..</div>
      </>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {floater}
      <PageAnimation>
        {({pageAnimationState, changePage}) => (
          <styles.HomeStyle className={pageAnimationState}>
          {
            (myShit.length > 0)
              ? <HomeScreenWithMyShit pageAnimationState={pageAnimationState} changePage={changePage} />
              : <HomeScreenNoMyShit priceChange={priceChange} isGood={isGood} pageAnimationState={pageAnimationState} changePage={changePage} />
          }
          </styles.HomeStyle>
        )}
      </PageAnimation>
    </>
  );
}

export default Home;