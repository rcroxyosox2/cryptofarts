import React, { useRef, useEffect } from "react";
// import { useStore } from './store';
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router';
import useRequest from './hooks/useRequest';
import { megaInitialLoad } from './services';
import {
  getCoinsMegaCall,
  getCoinsMegaCallQuietly,
  setNotif,
} from 'redux/store';
import {
  checkForUpdatesInterval,
} from 'brains/coins';


const App = () => {
  // const store = useStore();
  const interval = useRef();
  const dispatch = useDispatch();
  const { quietLoadStatus, loadStatus } = useSelector((state) => state.coins);

  useEffect(() => {

    if (!loadStatus) {
      dispatch(getCoinsMegaCall());
    }

    if(loadStatus === 'loaded') {
      interval.current = setTimeout(() => {
        if (quietLoadStatus !== 'loading') {
          dispatch(getCoinsMegaCallQuietly());
        }
      }, checkForUpdatesInterval);
      dispatch(setNotif({
        id: 'hello',
        text: 'hello',
        img: null,
        type: 'ARTICLE',
        expires: 5000,
      }))
    }

    return () => {
      interval.current && clearInterval(interval.current);
    }
  }, [loadStatus, quietLoadStatus, dispatch]);

  return (<Router />);
}

export default App;
