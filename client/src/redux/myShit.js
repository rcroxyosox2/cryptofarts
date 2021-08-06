
import { createAsyncThunk } from '@reduxjs/toolkit';
import { uniqBy, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY } from 'brains/coins';
import { getAvgShit } from 'services';

export const getShitThunk = createAsyncThunk(
  'gets/getShit',
  async (coinIds) => {
    return getAvgShit(coinIds);
  }
)

export const myShitSlice = createSlice({
  name: "myShit",
  initialState: {
    myCoins: [],
  },
  setMyCoins: (state, action) => {
    state.myCoins = action.payload;
  },
  extraReducers: {
    [getShitThunk.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.data = action.payload
    },
    [getShitThunk.pending]: (state, action) => {
      // Add user to the state array
      state.loading = true;
    },
    [getShitThunk.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.data = [];
      state.error = `error getting the moonshots: ${action.payload}`;
    }
  }
});

export const { setMyCoins } = myShitSlice.actions;
export default myShitSlice.reducer;
