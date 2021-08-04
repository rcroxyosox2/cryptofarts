import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { getDay } from 'services';

export const getDayThunk = createAsyncThunk(
  'gets/getDay',
  async () => {
    return getDay();
  }
)

export const summarySlice = createSlice({
  name: 'summary',
  initialState: { 
    day: {
      loading: false, 
      error: null,
      data: {},
    },
  },
  reducers: {
    saveDay: (state, action) => {
      state.day.data = {...state.day.data, ...action.payload}
    } 
  },
  extraReducers: {
    [getDayThunk.fulfilled]: (state, action) => {
      // Add user to the state array
      state.day.loading = false;
      summarySlice.caseReducers.saveDay(state, action);
    },
    [getDayThunk.pending]: (state, action) => {
      // Add user to the state array
      state.day.loading = true;
    },
    [getDayThunk.rejected]: (state, action) => {
      // Add user to the state array
      state.day.loading = false;
      state.day.data = {};
      state.day.error = `error getting the day: ${action.payload}`;
    }
  }
});

export const { saveDay } = summarySlice.actions;
export default summarySlice.reducer;
