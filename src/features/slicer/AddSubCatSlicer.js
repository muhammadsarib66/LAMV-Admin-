import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getSubCatApi } from "./getSubCat";

export const AddSubCatApi = createAsyncThunk(
  "adminPanel/AddSubCat",
  async (addSubCat, { dispatch }) => {
    return await axios
      .post(`${baseUrl}sub-categories/sub-categories`, addSubCat, config)
      .then((resp) => {
        toast.success("Sub Category Added Successfully");
        dispatch(getSubCatApi());
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
const AddSubCatSlicer = createSlice({
  name: "addsubcat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddSubCatApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddSubCatApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddSubCatApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//   export const {showCustomer} = Delete.actions;
export default AddSubCatSlicer.reducer;
