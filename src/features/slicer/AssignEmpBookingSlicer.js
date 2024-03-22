import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  { baseUrl ,config } from "./Slicer";
import { toast } from "react-toastify";
import { getBookingApi } from "./GetBookingSlicer";


  // delete customer/user
export const AssignEmplBookingApi = createAsyncThunk(
    "adminPanel/AssignEmpBooking",
    async (asignE,{ dispatch })=>{
        console.log(asignE,'check')
        return await axios.post(`${baseUrl}booking/assign-employee`,asignE,config)
        .then((resp)=>{
            toast.success(resp.statusText)
            dispatch(getBookingApi())
            console.log(resp.data)
            
            return resp.data
        }).catch((err)=>{
            toast.error(err.message)
            console.log(err.message)
            return err.message
        })
    }
)

  //////////
  const initialState = {
    isLoading: false,
    isError: false,
    isAssignModal : false
  };

  const AssignEmpBookingSlicer = createSlice({
    name: 'assignempbooking',
    initialState,
    reducers :{
        setIsAssignEmpModalOpen : (state)=>{
        state.isAssignModal = true
        },
        setIsAssignEmpModalClose : (state)=>{
            state.isAssignModal = false
        }

    },
    extraReducers : (builder)=>{
        /// for delete user
        builder.addCase(AssignEmplBookingApi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(AssignEmplBookingApi.fulfilled, (state) => {
            state.isLoading = false;
            // console.log(action.payload)
        });
        builder.addCase(AssignEmplBookingApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
  })




  export const {setIsAssignEmpModalOpen, setIsAssignEmpModalClose } = AssignEmpBookingSlicer.actions;
  export default AssignEmpBookingSlicer.reducer;

