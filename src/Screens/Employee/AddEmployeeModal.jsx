import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { setisModalClose } from "../../features/slicer/Slicer";
import { Button } from "@material-tailwind/react";
import { AddEmployeeApi } from "../../features/slicer/AddEmployeeSlicer";
import { toast } from "react-toastify";
// import { setisModalOpen } from '../features/slicer/Slicer';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  p: 4,
};

export default function AddEmployeeModal() {
  const { isModalOpen } = useSelector((state) => state.Slicer);
  const dispatch = useDispatch();

  const [addEmployee, setAddEmployee] = useState({
    email: "",
    fullname: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    console.log(addEmployee);
    if(addEmployee.email === "" || addEmployee.fullname === "" || addEmployee.phoneNumber === "" || addEmployee.password === "") return toast.error('Please fill all the fields')
  
    dispatch(AddEmployeeApi(addEmployee));  
    setAddEmployee({
      email: "",
      fullname: "",
      phoneNumber: "",
      password: "",
    });
    dispatch(setisModalClose())
  };

  const handleClose = () => dispatch(setisModalClose());

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-4">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Employee
            </Typography>
            <div className="flex flex-col gap-4">
              <TextField
                value={addEmployee.fullname}
                name="fullname"
                onChange={handleChange}
                sx={{ width: "100%" }}
                label="Full Name"
              />
              <TextField
                value={addEmployee.email}
                name="email"
                onChange={handleChange}
                sx={{ width: "100%" }}
                label="Email Address "
              />
              <TextField
                value={addEmployee.phoneNumber}
                name="phoneNumber"
                onChange={handleChange}
                sx={{ width: "100%" }}
                label="Phone "
              />
              <TextField
                value={addEmployee.password}
                name="password"
                onChange={handleChange}
                sx={{ width: "100%" }}
                label="Password"
              />
              <Button onClick={handleAddEmployee}>Add Employeye</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
