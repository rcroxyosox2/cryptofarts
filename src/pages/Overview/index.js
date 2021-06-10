import { useState, useEffect } from 'react';
import CoinStack from 'components/CoinStack';
import { useStore } from 'store';
import { getPumpsAndDumpsFromArr } from 'brains/coins';
import * as styles from './styles';


const Overview = (props) => {
  const store = useStore();
  const coins = (Array.isArray(store.coins)) ? store.coins.slice(0,20) : [];
  const [pumps, dumps] = getPumpsAndDumpsFromArr({coins, qty: 5});
  return (
    <styles.OverviewStyle>
      Pumps
      <CoinStack coins={pumps} />

      Dumps
      <CoinStack coins={dumps} />
    </styles.OverviewStyle>
  )
}

export default Overview;
