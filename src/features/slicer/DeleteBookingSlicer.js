import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getBookingApi } from "./GetBookingSlicer";

export const DeleteBookingApi = createAsyncThunk(
  "adminPanel/DeleteBooking",
  async (Id, { dispatch }) => {
    return await axios
      .post(`${baseUrl}booking/delete-booking`, { bookingId: Id }, config)
      .then((resp) => {
        toast.success("Main Category Deleted Successfully");
        dispatch(getBookingApi());

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

const DeleteBookingSlicer = createSlice({
  name: "deletebooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /// for delete user
    builder.addCase(DeleteBookingApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteBookingApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DeleteBookingApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//   export const {showCustomer} = Delete.actions;
export default DeleteBookingSlicer.reducer;
