import { useState, useEffect } from 'react';
import numeral from 'numeral';
import { getSickDeals } from 'services/';
import socket from 'services/socket';
import {
  COIN_CHANGE_KEY,
} from 'brains/coins';
import skateBoarder from 'images/skateboarder.png'
import * as styles from './styles';

const SickDeals = () => {
  const socketName = 'sickdeals';
  const [sickDeals, setSickDeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const socketFn = (sickDeals) => {
    setSickDeals(sickDeals);
  };

  useEffect(async() => {
    // sick deals
    setLoading(true);

    getSickDeals()
    .then(res => {
      setError(null);
      setLoading(false);
      setSickDeals(res);
    })
    .catch(e => {
      setLoading(false);
      setSickDeals([]);
      setError(e);
    });

    socket
    .off(socketName, socketFn)
    .on(socketName, socketFn)
  }, []);

  return (
    <styles.SickDealsStyle>
      <header>
        <h1>Sick DealZ</h1>
        <img src={skateBoarder} />
      </header>
      <styles.SickDealsContainerStyle resultCount={sickDeals.length || 0}>
      {
        sickDeals.length ? sickDeals.map((coin) => {
          return (
            <styles.SickDealItemStyle key={coin.id}>
              <img src={coin.image} />
              <div>
                  <span>{coin.name}</span>
                  <span>{coin.ath_change_percentage && `${numeral(Math.abs(coin.ath_change_percentage)).format('0.0')}%`} off</span>
                  <span>{numeral(coin.current_price).format('$0,0.00')}</span>
              </div>
            </styles.SickDealItemStyle>
        )}) : null
      }
      </styles.SickDealsContainerStyle>
    </styles.SickDealsStyle>
  );

};

export default SickDeals;
