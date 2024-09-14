import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provisionalInspectionId: null,
};

const inspectionSlice = createSlice({
  name: 'inspection',
  initialState,
  reducers: {
    setProvisionalInspectionId: (state, action) => {
      state.provisionalInspectionId = action.payload;
    },
  },
});

export const { setProvisionalInspectionId } = inspectionSlice.actions;

export default inspectionSlice.reducer;
