import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { baseUrl, config } from "./Slicer";
// import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isError: false,
  users: [],
  SentedNotification: [],
};
const CustomNotiSlicer = createSlice({
  name: "custNoti",
  initialState,
  reducers: {},
});

export const { showCustomer } = CustomNotiSlicer.actions;
export default CustomNotiSlicer.reducer;
