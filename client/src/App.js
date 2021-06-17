import React, { useRef, useEffect, useState } from "react";
import { getTotalChangeFromCoinsResponse, filteredCoins } from 'brains/coins';
// import { useStore } from './store';
import { useLiveQuery } from "dexie-react-hooks";
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router';
import useRequest from './hooks/useRequest';
import { megaInitialLoad } from './services';
import { init, isStale } from 'data/indexdb';
import medFart2Sound from 'sounds/mid-fart2-c.mp3'
import Sounds from 'components/Sounds';
import {
  setCoinsLoadStatus,
  setCoinsLoadError,
  setCoins,
} from 'redux/coins';
import {
  setNotif,
} from 'redux/notif';
import {
  checkForUpdatesInterval,
} from 'brains/coins';

const cryptodb = init();

const App = () => { 

  const interval = useRef();
  const dispatch = useDispatch();
  const { coins: tempCoins } = useSelector((state) => state.coins);
  const { loadStatus, soundLoadStatus, playSoundIndex } = useSelector((state) => state.coins);

  const getThemCoins = async(quiet) => {
    dispatch(setCoinsLoadStatus({
      status: 'loading',
      quiet,
    }));
    try {
      const stale = await isStale(cryptodb);
      const coins = stale && await megaInitialLoad({onFetchCycle: async (coinsFetched, page) => {
        if (page > 10 && !quiet) { // if the initial run, dont block the whole app with the big ass load
          dispatch(setCoinsLoadStatus({
            status: 'loading',
            quiet: true,
          }));
        }
        // dispatch(setCoins(coinsFetched));
        if (coinsFetched) {
          const onlyValidCoins = filteredCoins(coinsFetched)
          await cryptodb.coins.bulkPut(onlyValidCoins);
        }
      }});
      await cryptodb.meta.put({
        id: 1,
        lastupdated: new Date().getTime(),
      })
      const onlyValidCoins = filteredCoins(coins);
      await cryptodb.coins.bulkPut(onlyValidCoins);
      dispatch(setCoinsLoadError(null));
      dispatch(setCoinsLoadStatus({
        status: 'loaded',
        quiet,
      }));
    } 
    catch(e) {
      dispatch(setCoinsLoadStatus(null));
      dispatch(setCoinsLoadError(e))
    }
  }

  useEffect(async () => {
    await getThemCoins();
    interval.current = setInterval(async () => {
      if (!/loading/.test(loadStatus)) {
      await getThemCoins(true);
      }
    }, checkForUpdatesInterval);

    setInterval(() => {
      dispatch(setNotif({
        id: 'hello',
        text: 'fetching...',
        img: null,
        type: 'ARTICLE',
        expires: 5000,
      }))
    }, 7000);

    // kill that timeout
    return () => {
      interval.current && clearInterval(interval.current);
    }
  }, [])

  return (
  <div>
    <Router />
  </div>
  );
}

export default App;
