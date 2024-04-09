import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getSubCatApi } from "./GetSubCatSlicer";

export const DeleteSubCatApi = createAsyncThunk(
  "adminPanel/DeleteSubCat",
  async (Id, { dispatch }) => {
    return await axios
      .post(
        `${baseUrl}sub-categories/delete-subcategory`,
        { subCategoryId: Id },
        config
      )
      .then((resp) => {
        toast.success("Sub Category Deleted Successfully");
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

const DeleteSubCatSlicer = createSlice({
  name: "deletsubcat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /// for delete user
    builder.addCase(DeleteSubCatApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteSubCatApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DeleteSubCatApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export default DeleteSubCatSlicer.reducer;
