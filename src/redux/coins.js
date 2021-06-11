import { createAsyncThunk } from '@reduxjs/toolkit';
import { uniqBy, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY } from 'brains/coins';
import { megaInitialLoad } from 'services';

const filteredCoins = (coins) => {
  const uniq = uniqBy(coins, 'id');
  return filter(uniq, (coin) => {
    return coin[COIN_CHANGE_KEY] != null
      && coin.current_price != null;
  })
}

export const getCoinsMegaCall = createAsyncThunk(
  'gets/getCoinsMegaCall',
  async () => {
    return megaInitialLoad();
  }
)

export const getCoinsMegaCallQuietly = createAsyncThunk(
  'gets/getCoinsMegaCallQuietly',
  async () => {
    return megaInitialLoad();
  }
)

export const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    quietLoadStatus: null,
    loadStatus: null,
    error: null,
    coins: []
  },
  reducers: {
  },
  extraReducers: {
    [getCoinsMegaCall.pending]: (state, action) => {
      state.loadStatus = 'loading';
    },
    [getCoinsMegaCall.fulfilled]: (state, action) => {
      state.coins = filteredCoins(action.payload);
      state.loadStatus = 'loaded';
    },
    [getCoinsMegaCall.rejected]: (state, action) => {
      state.loadStatus = '';
    },
    [getCoinsMegaCallQuietly.pending]: (state, action) => {
      state.quietLoadStatus = 'loading';
    },
    [getCoinsMegaCallQuietly.fulfilled]: (state, action) => {
      state.quietLoadStatus = 'loaded';
    },
    [getCoinsMegaCall.rejected]: (state, action) => {
      state.quietLoadStatus = 'failed';
    },
  }
})

export default coinsSlice.reducer;
