import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";
import CustomerSlicer from "../slicer/CustomerSlicer";
import DeleteCustomerSlicer from "../slicer/DeleteCustomerSlicer";
import GetMainCatSlicer from "../slicer/GetMainCatSlicer";
import GetSubCatSlicer from "../slicer/getSubCat" 
import DeleteSubCatSlicer from "../slicer/DeleteSubCatSlicer" 
import GetEmployeeSlicer from "../slicer/GetEmployeeSlicer";
import DeleteEmployeeSlicer from "../slicer/DeleteEmployeeSlicer";
import AddEmployeeSlicer from "../slicer/AddEmployeeSlicer";
import GetBookingSlicer from "../slicer/GetBookingSlicer";
import DeleteBookingSlicer from "../slicer/DeleteBookingSlicer";
import AddBudgetSlicer from "../slicer/AddBudgetSlicer";
import AssignEmpBookingSlicer from "../slicer/AssignEmpBookingSlicer"
export const store = configureStore({
  reducer: {
    Slicer,
    CustomerSlicer,
    DeleteCustomerSlicer,
    GetMainCatSlicer,
    GetSubCatSlicer,
    DeleteSubCatSlicer,
    GetEmployeeSlicer,
    DeleteEmployeeSlicer,
    AddEmployeeSlicer,
    GetBookingSlicer,
    DeleteBookingSlicer,
    AddBudgetSlicer,
    AssignEmpBookingSlicer
   
  },
});
