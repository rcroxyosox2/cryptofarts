
import { createAsyncThunk } from '@reduxjs/toolkit';
import { uniqBy, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { COIN_CHANGE_KEY } from 'brains/coins';
import { megaInitialLoad } from 'services';

export const appSlice = createSlice({
  name: "app",
  initialState: {
    searchModalOpen: false,
    detailModalOpen: false, // will have a coin id if not false
  },
  reducers: {
    setSearchModalOpen: (state, action) => {
      state.searchModalOpen = action.payload;
    },
    setDetailModalOpen: (state, action) => {
      state.detailModalOpen = action.payload;
    }
  }
});

export const { setSearchModalOpen, setDetailModalOpen } = appSlice.actions;
export default appSlice.reducer;
