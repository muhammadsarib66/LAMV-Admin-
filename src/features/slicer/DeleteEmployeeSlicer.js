import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getEmployeeApi } from "./GetEmployeeSlicer";

export const DeleteEmployeeApi = createAsyncThunk(
  "adminPanel/DeleteEmployee",
  async (Id, { dispatch }) => {
    return await axios
      .post(`${baseUrl}employees/delete-employee`, { employeeId: Id }, config)
      .then((resp) => {
        toast.success("Employee Deleted Successfully");
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

const DeleteEmployeeSlicer = createSlice({
  name: "deleteemployee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DeleteEmployeeApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteEmployeeApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DeleteEmployeeApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

//   export const {showCustomer} = Delete.actions;
export default DeleteEmployeeSlicer.reducer;
