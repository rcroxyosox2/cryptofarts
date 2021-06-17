import { createAsyncThunk } from '@reduxjs/toolkit';
import { uniqBy, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY } from 'brains/coins';
import { megaInitialLoad } from 'services';

const newsSources = {
  CRYPTO_NEWS: 'https://www.reddit.com/r/javascript/hot.json',
};

export const notifTypes = {
  ARTICLE: 'ARTICLE',
  LOADING_QUIET: 'LOADING_QUIET',
}

// Shape:
// {
//   id: '',
//   text: '',
//   img: '',
//   action: () => null,
//   type: <notifTypes>
// }

// export const getLatestFromReddit = createAsyncThunk(
//   'gets/getCoinsMegaCall',
//   async () => {
//     return megaInitialLoad();
//   }
// )

export const notifSlice = createSlice({
  name: "coins",
  initialState: {
    notif: null,
  },
  reducers: {
    setNotif: (state, action) => {
      state.notif = action.payload;
    }
  }
})

export const { setNotif } = notifSlice.actions;
export default notifSlice.reducer;
