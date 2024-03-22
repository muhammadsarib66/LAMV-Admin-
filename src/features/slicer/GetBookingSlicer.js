import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, config } from "./Slicer";
import axios from "axios";

export const getBookingApi = createAsyncThunk(
  "adminPanel/getBooking",
  async () => {
    return await axios
      .get(`${baseUrl}booking/bookings-admin`, config)
      .then((resp) => {
        return resp.data.data;
      })
      .catch((err) => {
        return err.message;
      });
  }
);
const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen: false,
  getBookings: [],
};

const GetBookingSlicer = createSlice({
  name: "Bookings",
  initialState,
  reducers: {
    setIsModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setIsModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookingApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBookingApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getBookings = action.payload;
    });
    builder.addCase(getBookingApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export const { setIsModalOpen, setIsModalClose } = GetBookingSlicer.actions;
export default GetBookingSlicer.reducer;
