import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  { baseUrl ,config } from "./Slicer";


export const getCustomersApi = createAsyncThunk(
    "adminPanel/getCustomers",
    async () => {
      return await axios
        .get(`${baseUrl}users/users`,config)
        .then((resp) => {
          return resp.data.data;
        })
        .catch((err) => {
            return err.message
        });
    }
  );
 
  const initialState = {
    isLoading: false,
    isError: false,
    getCustomers: [],
  };

  const CustomerSlicer = createSlice({
    name: 'customers',
    initialState,
    reducers :{ },
    extraReducers : (builder)=>{
        builder.addCase(getCustomersApi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getCustomersApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getCustomers = action.payload;
        });
        builder.addCase(getCustomersApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        
    }
  })




  export default CustomerSlicer.reducer;

