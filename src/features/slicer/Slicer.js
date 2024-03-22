import { createSlice } from "@reduxjs/toolkit";

export const baseUrl = "http://65.20.104.196:3002/";
export const token =
  "a6b4d9aba8128a07146dc3c6892805112c99172ca050fb09c0be38cef2b35ae3";
export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen: false,
  isMainCatModal: false,
  isSubCatModal: false,
  isCustomerActionModalOpen: false,
  isEmployeeActionModalOpen: false,
};

const Slicer = createSlice({
  name: "slicer",
  initialState,
  reducers: {
    setisModalOpen: (state) => {
      state.isModalOpen = true;
    },
    setisModalClose: (state) => {
      state.isModalOpen = false;
    },
    setisMainCatModal: (state) => {
      state.isMainCatModal = true;
    },
    setisMainCatModalClose: (state) => {
      state.isMainCatModal = false;
    },
    setisSubCatModal: (state) => {
      state.isSubCatModal = true;
    },

    setisSubCatModalClose: (state) => {
      state.isSubCatModal = false;
    },
    setIsCustomerActionModalOpen: (state) => {
      state.isCustomerActionModalOpen = true;
    },
    setIsCustomerActionModalClose: (state) => {
      state.isCustomerActionModalOpen = false;
    },
    setIsEmployeeActionModalOpen: (state) => {
      state.isEmployeeActionModalOpen = true;
    },
    setIsEmployeeActionModalClose: (state) => {
      state.isEmployeeActionModalOpen = false;
    },
  },
});

export const {
  setisModalOpen,
  setisModalClose,
  setisMainCatModal,
  setisMainCatModalClose,
  setisSubCatModal,
  setisSubCatModalClose,
  setIsCustomerActionModalOpen,
  setIsCustomerActionModalClose,
  setIsEmployeeActionModalOpen,
  setIsEmployeeActionModalClose,
} = Slicer.actions;
export default Slicer.reducer;
