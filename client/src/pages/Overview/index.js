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
import MainFooter from 'components/MainFooter';
import CoinDetail from 'pages/CoinDetail';
import Modal from 'theme/Modal';
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
  // const coins = useLiveQuery(() => db.coins.toArray());
  // const meta = useLiveQuery(() => db.meta.get(1));
  // const [pumps, dumps] = getPumpsAndDumpsFromArr({coins, qty: 15});

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  // const [searchModalOpen, setSearchModalOpen] = useState(false);

  // const handleDocKeyDown = (e) => {
  //   if (eventHasKeyCode(e, KEYCODES.FSLASH)) {
  //     setSearchModalOpen(true);
  //   }
  // }

  const handleHistoryChanged = () => {
    setDetailModalOpen(false);
  }

  // window.onpopstate = window.history.onpushstate = function(e) { 
  //   setDetailModalOpen(false);
  // };

  useEffect(() => {
    // document.addEventListener('keydown', handleDocKeyDown);
    window.addEventListener('popstate', handleHistoryChanged);
    return () => {
      // document.removeEventListener('keydown', handleDocKeyDown);
      window.removeEventListener('popstate', handleHistoryChanged);
    }
  }, []);

  const handleDetailModalOpen = (coinId) => {
    const newRoute = paths.coindetail.replace(':id', coinId);
    window.history.pushState(null, 'CoinDetail', newRoute);
    setDetailModalOpen(coinId);
  };

  const handleDetailModalClose = () => {
    window.history.replaceState(null, 'CoinDetail', paths.overview);
    setDetailModalOpen(false);
  };

  const handleKeyDown = (e) => {
    console.log(eventHasKeyCode(e, KEYCODES.UP));
  }

  // const handleSearchModalClose = (e) => {
  //   setSearchModalOpen(false);
  // }

  return (
    <styles.OverviewStyle>
      <header>
        <Logo />
        <SeasonFlag />
      </header>
      <SickDeals handleDetailModalOpen={handleDetailModalOpen} />
      <Moonshots />
      <GreensReds handleDetailModalOpen={handleDetailModalOpen} />
      
      <Modal isOpen={!!detailModalOpen} onModalClose={handleDetailModalClose}>
        <CoinDetail coinId={detailModalOpen} handleBackClick={handleDetailModalClose} />
      </Modal>

      <Trending />
      {/* <Notif /> */}
      {/* <div>Last updated on: {moment(meta?.lastUpdated).format('LLLL')}</div> */}
      {/* <CoinStackImageTitleCombo title="Da Pumps" coins={pumps} Img={getRandomPumpImgStyle()} />
      <CoinStackImageTitleCombo title="Da Dumps" coins={dumps} Img={getRandomDumpImgStyle()} /> */}
      <MainFooter />
    </styles.OverviewStyle>
  )
}

export default Overview;
