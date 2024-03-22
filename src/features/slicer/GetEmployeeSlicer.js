import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, config } from "./Slicer";
import axios from "axios";

export const getEmployeeApi = createAsyncThunk(
  "adminPanel/getEmployee",
  async () => {
    return await axios
      .get(`${baseUrl}employees/employees`, config)
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
  getEmpolyees: [],
};

const GetEmployeeSlicer = createSlice({
  name: "Employees",
  initialState,
  reducers: {
    showCustomer: (state) => {
      console.log(state.getCustomers);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployeeApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployeeApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getEmpolyees = action.payload;
    });
    builder.addCase(getEmployeeApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
export default GetEmployeeSlicer.reducer;
