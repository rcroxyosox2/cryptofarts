import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY, filteredCoins } from 'brains/coins';
import { getTrending } from 'services';

export const getTrendingThunk = createAsyncThunk(
  'gets/getTrending',
  async () => {
    return getTrending();
  }
)

export const trendingSlice = createSlice({
  name: 'trending',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {
    setTrending: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: {
    [getTrendingThunk.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      trendingSlice.caseReducers.setTrending(state, action);
    },
    [getTrendingThunk.pending]: (state, action) => {
      // Add user to the state array
      state.loading = true;
    },
    [getTrendingThunk.rejected]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.data = {};
      state.error = `error setting trending: ${action.payload}`;
    }
  }
});

export const { setTrending } = trendingSlice.actions;
export default trendingSlice.reducer;
