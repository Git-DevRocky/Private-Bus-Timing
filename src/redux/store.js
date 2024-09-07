import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./Location";

export const store = configureStore({
  reducer: { location: locationReducer },
});
