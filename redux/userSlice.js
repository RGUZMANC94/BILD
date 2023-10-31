import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email_address: "",
  user_rol: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, email_address, user_rol } = action.payload;
      state.id = id;
      state.name = name;
      state.email_address = email_address;
      state.user_rol = user_rol;
    },
    unsetUser: (state, action) => {
      state.id = "";
      state.name = "";
      state.email_address = "";
      state.user_rol = "";
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
