import { useState, useRef, useEffect } from 'react';
// import { AnimateOnChange, HideUntilLoaded } from 'react-animation'
import { useSelector } from 'react-redux';
import CoinStackImageTitleCombo from 'components/CoinStackImageTitleCombo';
import { getPumpsAndDumpsFromArr } from 'brains/coins';
import Notif from 'components/Notif';
import {
  getRandomPumpImg,
  getRandomDumpImg,
} from 'images';
import * as styles from './styles';

const Overview = (props) => {
  const { coins } = useSelector((state) => state.coins);
  const [pumps, dumps] = getPumpsAndDumpsFromArr({coins, qty: 15});

  return (
    <styles.OverviewStyle>
      <Notif />
      <CoinStackImageTitleCombo title="Da Pumps" coins={pumps} imgProps={{
        src: getRandomPumpImg(),
        title: 'pump'
      }} />
      <CoinStackImageTitleCombo title="Da Dumps" coins={dumps} imgProps={{
        src: getRandomDumpImg(),
        title: 'dump'
      }}/>
    </styles.OverviewStyle>
  )
}

export default Overview;
