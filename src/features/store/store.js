import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";

export const store = configureStore({
  reducer: {
    Slicer,
   
  },
});
