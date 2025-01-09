import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provisionalInformeId: null,
  informe: {},
};

const informeSlice = createSlice({
  name: 'informe',
  initialState,
  reducers: {
    setProvisionalInformeId: (state, action) => {
      state.provisionalInformeId = action.payload;
    },
    setGlobalInforme: (state, action) => {
      state.informe = action.payload;
    },
  },
});

export const { setProvisionalInformeId, setGlobalInforme } = informeSlice.actions;

export default informeSlice.reducer;
