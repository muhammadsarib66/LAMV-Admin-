import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl, config } from "./Slicer";
import axios from "axios";
import { toast } from "react-toastify";

export const getSubCatApi = createAsyncThunk(
    "adminPanel/getSubCat",
    async () => {
      return await axios
        .get(`${baseUrl}sub-categories/sub-categories-admin`,config)
        .then((resp) => {
          return resp.data.data;
        })
        .catch((err) => {
            toast.error(err.message)
            return err.message

        });
    }
  );
  const initialState = {
    isLoading: false,
    isError: false,
    getSubCat: [],
  };

  const GetSubCatSlicer = createSlice({
    name: 'subcategory',
    initialState,
    reducers :{},
    extraReducers : (builder)=>{
        builder.addCase(getSubCatApi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSubCatApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.getSubCat = action.payload;
        });
        builder.addCase(getSubCatApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        
    }
  })
  export default GetSubCatSlicer.reducer;