import { configureStore } from '@reduxjs/toolkit';
import testReducer, { doIt } from './test';
import coinsReducer, { getCoinsMegaCall, getCoinsMegaCallQuietly } from './coins';
import notifReducer, { setNotif } from './notif';
import summaryReducer from './summary';
import moonShotsReducer, { setMoonShots } from './moonshots';
import trendingReducer, { setTrending } from './trending';
import appReducer, { setSearchModalOpen, setDetailModalOpen } from './app';


  export { 
    doIt, 
    getCoinsMegaCall, 
    getCoinsMegaCallQuietly, 
    setNotif,
    setMoonShots,
    setTrending,
    setSearchModalOpen,
    setDetailModalOpen,
  };

  export default configureStore({
    reducer: {
      test: testReducer,
      coins: coinsReducer,
      notif: notifReducer,
      summary: summaryReducer,
      moonShots: moonShotsReducer,
      trending: trendingReducer,
      app: appReducer,
    }
  });

