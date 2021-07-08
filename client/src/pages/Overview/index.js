import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useLiveQuery } from "dexie-react-hooks";
import { useSelector } from 'react-redux';
import useRequest from 'hooks/useRequest';
import { getSickDeals } from 'services/';
import socket from 'services/socket';

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

  // sick deals
  const socketName = 'sickdeals';
  const [sickDeals, setSickDeals] = useState({});
  const [sickDealsError, setSickDealsError] = useState(null);
  const [sickDealsLoading, setSickDealsLoading] = useState(false);
  const sickDealsSocketFn = (sickDeals) => {
    setSickDeals(sickDeals);
  };

  // const coins = useLiveQuery(() => db.coins.toArray());
  // const meta = useLiveQuery(() => db.meta.get(1));
  // const [pumps, dumps] = getPumpsAndDumpsFromArr({coins, qty: 15});

  useEffect(async() => {
    
    // sick deals
    getSickDeals()
    .then(res => setSickDeals(res))
    .catch(e => setSickDealsError(e));
    socket
    .off(socketName, sickDealsSocketFn)
    .on(socketName, sickDealsSocketFn)

  }, []);

  return (
    <styles.OverviewStyle>
      {/* <Notif /> */}
      {/* <div>Last updated on: {moment(meta?.lastUpdated).format('LLLL')}</div> */}
      {/* <CoinStackImageTitleCombo title="Da Pumps" coins={pumps} Img={getRandomPumpImgStyle()} />
      <CoinStackImageTitleCombo title="Da Dumps" coins={dumps} Img={getRandomDumpImgStyle()} /> */}
    </styles.OverviewStyle>
  )
}

export default Overview;
