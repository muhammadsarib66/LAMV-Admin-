import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./component/Navbar";
import { Employees } from "./Screens/Employees";
import Drawer from "./component/Drawer";
import Customers from "./Screens/Customers";
import Booking from "./Screens/Booking";
import Dashboard from "./Screens/Dashboard";
import MainCategory from "./Screens/MainCategory";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <section className="flex  ">
          <Router>
      <Drawer />
      <div>
        <AppBar />
        <div className="mt-5">
            <Routes>

              <Route path="/" element={<Dashboard/>} />
              <Route path="customers" element={<Customers/>} />
              <Route path="customers" element={<Customers/>} />
              <Route path="employees" element={<Employees/>} />
              <Route path="booking" element={<Booking/>} />
              <Route path="maincategory" element={<MainCategory/>} />
            </Routes>
        </div>
      </div>
          </Router>
          <ToastContainer />
    </section>
  );
}

export default App;
