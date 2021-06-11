import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
  name: "test",
  initialState: {
    value: ['hello', 'there', 'world']
  },
  reducers: {
    doIt: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { doIt } = testSlice.actions;
export default testSlice.reducer;