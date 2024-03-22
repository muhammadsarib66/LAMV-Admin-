import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  { baseUrl ,config } from "./Slicer";
import { toast } from "react-toastify";
import { getBookingApi } from "./GetBookingSlicer";


  
export const AddBudgetApi = createAsyncThunk(
    "adminPanel/AddBudget",
    async (budget,{ dispatch })=>{
        return await axios.post(`${baseUrl}booking/attach-budget`,budget,config)
        .then((resp)=>{
            toast.success('Budget Added Successfully')
            dispatch(getBookingApi())
            // console.log(resp.data)
            return resp.data
        }).catch((err)=>{
            toast.error(err.message)
            return err.message
        })
    }
)

  //////////
  const initialState = {
    isLoading: false,
    isError: false,
    isModalOpen : false
  };

  const AddBudgetSlicer = createSlice({
    name: 'Addbudget',
    initialState,
    reducers :{
        setIsBudgetModalOpen : (state)=>{
            state.isModalOpen = true
        },
        setIsBudgetModalClose : (state)=>{
            state.isModalOpen = false
        }
    },
    extraReducers : (builder)=>{
        /// for delete user
        builder.addCase(AddBudgetApi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(AddBudgetApi.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(AddBudgetApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
  })




  export const {setIsBudgetModalOpen ,setIsBudgetModalClose} = AddBudgetSlicer.actions;
  export default AddBudgetSlicer.reducer;

