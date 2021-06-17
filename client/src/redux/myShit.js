
import { createAsyncThunk } from '@reduxjs/toolkit';
import { uniqBy, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY } from 'brains/coins';
import { megaInitialLoad } from 'services';

export const myShitSlice = createSlice({
  name: "myShit",
  initialState: {
    myCoins: [],
  },
  setMyCoins: (state, action) => {
    state.myCoins = action.payload;
  }
});