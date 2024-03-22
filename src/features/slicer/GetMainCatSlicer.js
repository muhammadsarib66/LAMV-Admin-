import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, config } from "./Slicer";
import axios from "axios";

export const getMainCatApi = createAsyncThunk(
  "adminPanel/getMainCat",
  async () => {
    return await axios
      .get(`${baseUrl}main-categories/main-categories-admin`, config)
      .then((resp) => {
        return resp.data.data;
      })
      .catch((err) => {
        console.log(err.message);
        return err.message;
      });
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  getMainCat: [],
};

const GetMainCatSlicer = createSlice({
  name: "maincategory",
  initialState,
  reducers: {
    showCustomer: (state) => {
      console.log(state.getCustomers);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMainCatApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMainCatApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getMainCat = action.payload;
    });
    builder.addCase(getMainCatApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export default GetMainCatSlicer.reducer;
