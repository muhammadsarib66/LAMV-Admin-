import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen : false,
  isMainCatModal : false,
};

const Slicer = createSlice({
    name: "slicer",
    initialState,
    reducers: {
     
      setisModalOpen :(state)=>{
        state.isModalOpen = true;
      },
      setisModalClose :(state)=>{
        state.isModalOpen = false;
      },
      setisMainCatModal :(state)=>{
        state.isMainCatModal = true;
      },
      setisMainCatModalClose :(state)=>{
        state.isMainCatModal = false;
      },
     
    },
  });
  
  export const { setisModalOpen,setisModalClose,setisMainCatModal,setisMainCatModalClose} = Slicer.actions;
  export default Slicer.reducer;
  