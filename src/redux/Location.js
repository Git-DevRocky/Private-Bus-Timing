import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  to: "",
  from: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState: INITIAL_STATE,
  reducers: {
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setFrom: (state, action) => {
      state.from = action.payload;
    },
  },
});

export const { setTo, setFrom } = locationSlice.actions;
export default locationSlice.reducer;
