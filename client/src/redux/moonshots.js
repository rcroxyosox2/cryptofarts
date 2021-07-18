import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY, filteredCoins } from 'brains/coins';
import { getMoonShots } from 'services';

export const getMoonShotsThunk = createAsyncThunk(
  'gets/getMoonShots',
  async (maxResults) => {
    return getMoonShots(maxResults);
  }
)

export const moonShotsSlice = createSlice({
  name: 'moonShots',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {
    setMoonShots: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: {
    [getMoonShotsThunk.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.data = action.payload
    },
    [getMoonShotsThunk.pending]: (state, action) => {
      // Add user to the state array
      state.loading = true;
    },
    [getMoonShotsThunk.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.data = [];
      state.error = `error getting the moonshots: ${action.payload}`;
    }
  }
});

export const { setMoonShots } = moonShotsSlice.actions;
export default moonShotsSlice.reducer;