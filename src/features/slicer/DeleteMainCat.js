import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getMainCatApi } from "./GetMainCatSlicer";

// delete customer/user
export const DeleteMainCatApi = createAsyncThunk(
  "adminPanel/DeleteMainCat",
  async (Id, { dispatch }) => {
    return await axios
      .post(
        `${baseUrl}main-categories/delete-maincategory`,
        { mainCategoryId: Id },
        config
      )
      .then((resp) => {
        toast.success("Main Category Deleted Successfully");
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

const DeleteMainCatSlicer = createSlice({
  name: "deletemaincat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /// for delete user
    builder.addCase(DeleteMainCatApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteMainCatApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DeleteMainCatApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default DeleteMainCatSlicer.reducer;
