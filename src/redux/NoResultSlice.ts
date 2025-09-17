import { createSlice } from '@reduxjs/toolkit';

interface NoResultState {
  noResult: boolean;
}

const initialState: NoResultState = {
  noResult: false,
};

export const noResultSlice = createSlice({
  name: 'noResult',
  initialState,
  reducers: {
    noRecordFoundTrue: (state) => {
      state.noResult = true;
    },
    noRecordFoundFalse: (state) => {
      state.noResult = false;
    },
  },
});

export const { noRecordFoundTrue, noRecordFoundFalse } = noResultSlice.actions;

export default noResultSlice.reducer;
