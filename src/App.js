import React, { useRef, useEffect } from "react";
import { useStore } from './store';
import Router from './Router';
import useRequest from './hooks/useRequest';
import { megaInitialLoad } from './services';
import {
  checkForUpdatesInterval,
} from 'brains/coins';

import './App.css';

const App = () => {
  const store = useStore();
  const interval = useRef();
  const {
    makeRequest,
  } = useRequest({
    request: megaInitialLoad
  });

  // const coins = store.coins;

  useEffect(() => {
    const callTheCoins = () => {
      return makeRequest().then((coins) => {
        store.setCoinsLoading(false);
        store.setCoinsLoadingQuietly(false);
        store.setCoinsError(null);
        store.setCoins(coins);
        return coins;
      }).catch(e => {
        store.setCoinsLoading(false);
        store.setCoinsLoadingQuietly(false);
        store.setCoinsError(e);
        store.setCoins([]);
        return e;
      })
    }

    store.setCoinsLoading(true);
    callTheCoins();

    if (!interval.current) {
      interval.current = setInterval(() => {
        if (!store.coinsLoading && !store.coinsLoadingQuietly) {
          store.setCoinsLoadingQuietly(true);
          callTheCoins(false);
        }
      }, checkForUpdatesInterval);
    }

  }, []);

  return (<Router />);
}

export default App;
