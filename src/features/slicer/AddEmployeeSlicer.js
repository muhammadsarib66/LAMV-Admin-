import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getEmployeeApi } from "./GetEmployeeSlicer";

export const AddEmployeeApi = createAsyncThunk(
  "adminPanel/AddNewEmployee",
  async (AddEmPloyee, { dispatch }) => {
    return await axios
      .post(`${baseUrl}employees/register-employee`, AddEmPloyee, config)
      .then((resp) => {
        toast.success("Employee Added Successfully");
        dispatch(getEmployeeApi());
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

const AddEmployeeSlicer = createSlice({
  name: "addnewemployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddEmployeeApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddEmployeeApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddEmployeeApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//   export const {showCustomer} = Delete.actions;
export default AddEmployeeSlicer.reducer;
