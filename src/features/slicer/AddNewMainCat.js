import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getMainCatApi } from "./GetMainCatSlicer";

export const AddMainCatApi = createAsyncThunk(
  "adminPanel/AddMainCat",
  async (addCat, { dispatch }) => {
    return await axios
      .post(`${baseUrl}main-categories/main-categories`, addCat, config)
      .then((resp) => {
        toast.success("Main Category Added Successfully");
        dispatch(getMainCatApi());

        return resp.data;
      })
      .catch((err) => {
        toast.error(err.message);
        return err.message;
      });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};

const AddMainCatSlicer = createSlice({
  name: "addmaincat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddMainCatApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddMainCatApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddMainCatApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//   export const {showCustomer} = Delete.actions;
export default AddMainCatSlicer.reducer;
