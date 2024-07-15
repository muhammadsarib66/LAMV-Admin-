import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCustomersApi } from "./features/slicer/CustomerSlicer";
import { getMainCatApi } from "./features/slicer/GetMainCatSlicer";
import { getSubCatApi } from "./features/slicer/GetSubCatSlicer";
import { getEmployeeApi } from "./features/slicer/GetEmployeeSlicer";
import { getBookingApi } from "./features/slicer/GetBookingSlicer";
import MiniDrawer from "./component/MiniDrawer";
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
    <>
      <Router>
        <MiniDrawer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
