import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email_address: "",
  user_rol: "",
  last_name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userid, name, email, rol, last_name } = action.payload;
      state.id = userid;
      state.name = name;
      state.email_address = email;
      state.user_rol = rol;
      state.last_name = last_name;
    },
    unsetUser: (state, action) => {
      state.id = "";
      state.name = "";
      state.email_address = "";
      state.user_rol = "";
      state.last_name = "";
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;
