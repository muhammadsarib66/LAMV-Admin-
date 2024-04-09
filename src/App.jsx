import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./component/Navbar";
import Employees from "./Screens/Employee/Employees";
import Drawer from "./component/Drawer";
import Customers from "./Screens/Customers";
import Booking from "./Screens/Booking/Booking";
import Dashboard from "./Screens/Dashboard";
import MainCategory from "./Screens/MainCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubCategory from "./Screens/SubCategory";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCustomersApi } from "./features/slicer/CustomerSlicer";
import { getMainCatApi } from "./features/slicer/GetMainCatSlicer";
import { getSubCatApi } from "./features/slicer/GetSubCatSlicer";
import { getEmployeeApi } from "./features/slicer/GetEmployeeSlicer";
import { getBookingApi } from "./features/slicer/GetBookingSlicer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomersApi());
    dispatch(getMainCatApi());
    dispatch(getSubCatApi());
    dispatch(getEmployeeApi());
    dispatch(getBookingApi());
  }, []);
  return (
    <section className="flex  ">
      <Router>
        <Drawer />
        <div>
          <AppBar />
          <div className="mt-5">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="employees" element={<Employees />} />
              <Route path="booking" element={<Booking />} />
              <Route path="maincategory" element={<MainCategory />} />
              <Route path="subcategory" element={<SubCategory />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </section>
  );
}

export default App;
