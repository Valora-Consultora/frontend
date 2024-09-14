import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  nombre: '',
  tipoUsuario: '',
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.username = action.payload.username;
        state.nombre = action.payload.nombre;
        state.tipoUsuario = action.payload.tipoUsuario;
        state.id = action.payload.id;
      },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
