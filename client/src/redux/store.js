import { configureStore } from '@reduxjs/toolkit';
import testReducer, { doIt } from './test';
import coinsReducer, { getCoinsMegaCall, getCoinsMegaCallQuietly } from './coins';
import notifReducer, { setNotif } from './notif';
import summaryReducer from './summary';


  export { 
    doIt, 
    getCoinsMegaCall, 
    getCoinsMegaCallQuietly, 
    setNotif,
  };

  export default configureStore({
    reducer: {
      test: testReducer,
      coins: coinsReducer,
      notif: notifReducer,
      summary: summaryReducer,
    }
  });

