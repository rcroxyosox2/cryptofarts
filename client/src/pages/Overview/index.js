import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getDayThunk } from 'redux/summary';
import { useLiveQuery } from "dexie-react-hooks";
import useRequest from 'hooks/useRequest';
import Logo from 'components/Logo';
import SeasonFlag from 'components/SeasonFlag';
import SickDeals from 'components/SickDeals';
import Moonshots from 'components/Moonshots';
import GreensReds from 'components/GreensReds';
import Trending from 'components/Trending';
import MainFooter from 'components/MainFooter';
import CoinDetail from 'pages/CoinDetail';
import Modal from 'theme/Modal';
import DetailModal from 'components/DetailModal';
import PercChangeBox from 'components/PercChangeBox';

import { paths } from 'Router';
import { KEYCODES, eventHasKeyCode } from 'utils';

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
  const [coinIdClicked, setCoinIdClicked] = useState(null);
  const handleCoinIdClicked = (coinId) => {
    setCoinIdClicked(coinId);
  }

  const dispatch = useDispatch();
  const { day } = useSelector((state) => state.summary);
  const percChange = day.data.avgChangePerc24hr;
  useEffect(() => {
    dispatch(getDayThunk());
  }, []);

  return (
    <styles.OverviewStyle>
      <PercChangeBox>{percChange}</PercChangeBox>
      <header>
        <Logo />
        <SeasonFlag />
      </header>
      <SickDeals onCoinIdClicked={handleCoinIdClicked} />
      <Moonshots />
      <GreensReds />
      <DetailModal onModalClose={() => setCoinIdClicked(false)} coinId={coinIdClicked} />
      <Trending onCoinIdClicked={handleCoinIdClicked} />
      {/* <Notif /> */}
      {/* <div>Last updated on: {moment(meta?.lastUpdated).format('LLLL')}</div> */}
      {/* <CoinStackImageTitleCombo title="Da Pumps" coins={pumps} Img={getRandomPumpImgStyle()} />
      <CoinStackImageTitleCombo title="Da Dumps" coins={dumps} Img={getRandomDumpImgStyle()} /> */}
      <MainFooter handleDetailModalOpen={handleCoinIdClicked} />
    </styles.OverviewStyle>
  )
}

export default Overview;
