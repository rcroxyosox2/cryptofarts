import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useLiveQuery } from "dexie-react-hooks";
import { useSelector } from 'react-redux';
import useRequest from 'hooks/useRequest';
import Logo from 'components/Logo';
import SeasonFlag from 'components/SeasonFlag';
import SickDeals from 'components/SickDeals';
import Moonshots from 'components/Moonshots';
import GreensReds from 'components/GreensReds';
import Trending from 'components/Trending';

// import { AnimateOnChange, HideUntilLoaded } from 'react-animation'
// import CoinStackImageTitleCombo from 'components/CoinStackImageTitleCombo';
// import { getPumpsAndDumpsFromArr } from 'brains/coins';
// import Notif from 'components/Notif';
// import { db } from 'data/indexdb';

import {
  getRandomPumpImgStyle,
  getRandomDumpImgStyle,
} from 'images';

import * as styles from './styles';

const Overview = (props) => {
  // const coins = useLiveQuery(() => db.coins.toArray());
  // const meta = useLiveQuery(() => db.meta.get(1));
  // const [pumps, dumps] = getPumpsAndDumpsFromArr({coins, qty: 15});

  useEffect(async() => {

  }, []);

  return (
    <styles.OverviewStyle>
      <header>
        <Logo />
        <SeasonFlag />
      </header>
      <SickDeals />
      <Moonshots />
      <GreensReds />
      <Trending />
      {/* <Notif /> */}
      {/* <div>Last updated on: {moment(meta?.lastUpdated).format('LLLL')}</div> */}
      {/* <CoinStackImageTitleCombo title="Da Pumps" coins={pumps} Img={getRandomPumpImgStyle()} />
      <CoinStackImageTitleCombo title="Da Dumps" coins={dumps} Img={getRandomDumpImgStyle()} /> */}
    </styles.OverviewStyle>
  )
}

export default Overview;
