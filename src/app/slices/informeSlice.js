import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provisionalInformeId: null,
};

const informeSlice = createSlice({
  name: 'informe',
  initialState,
  reducers: {
    setProvisionalInformeId: (state, action) => {
      state.provisionalInformeId = action.payload;
    },
  },
});

export const { setProvisionalInformeId } = informeSlice.actions;

export default informeSlice.reducer;
