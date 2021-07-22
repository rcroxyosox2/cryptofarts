import { configureStore } from '@reduxjs/toolkit';
import testReducer, { doIt } from './test';
import coinsReducer, { getCoinsMegaCall, getCoinsMegaCallQuietly } from './coins';
import notifReducer, { setNotif } from './notif';
import summaryReducer from './summary';
import moonShotsReducer, { setMoonShots } from './moonshots';
import trendingReducer, { setTrending } from './trending';


  export { 
    doIt, 
    getCoinsMegaCall, 
    getCoinsMegaCallQuietly, 
    setNotif,
    setMoonShots,
    setTrending,
  };

  export default configureStore({
    reducer: {
      test: testReducer,
      coins: coinsReducer,
      notif: notifReducer,
      summary: summaryReducer,
      moonShots: moonShotsReducer,
      trending: trendingReducer,
    }
  });

