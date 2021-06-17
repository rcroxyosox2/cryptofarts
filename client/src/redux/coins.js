import { createAsyncThunk } from '@reduxjs/toolkit';
import { uniqBy, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY, filteredCoins } from 'brains/coins';
import { megaInitialLoad } from 'services';

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
    soundLoadStatus: false,
    playSoundIndex: null,
    loadStatus: null,
    error: null,
    coins: []
  },
  reducers: {
    setCoins: (state, action) => {
      state.coins = [...state.coins, ...action.payload];
    },
    setPlaySoundIndex: (state, action) => {
      state.playSoundIndex = action.payload;
    },
    setSoundLoadStatus: (state, action) => {
      state.soundLoadStatus = action.payload;
    },
    setCoinsLoadStatus: (state, action) => {
      console.log(action.payload)
      state.loadStatus = action.payload;
    },
    setCoinsLoadError: (state, action) => {
      state.error = action.payload;
    }
  }
})

export const { setCoins, setCoinsLoadStatus, setCoinsLoadError, setSoundLoadStatus, setPlaySoundIndex } = coinsSlice.actions;
export default coinsSlice.reducer;
