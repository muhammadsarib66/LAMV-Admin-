/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Button, Option, Select } from "@material-tailwind/react";
import {
  AssignEmplBookingApi,
  setIsAssignEmpModalClose,
} from "../../features/slicer/AssignEmpBookingSlicer";
import { useState } from "react";
import { toast } from "react-toastify";
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

export default function AssigEmpBookingModal({ AssignID,userID }) {
  const [selectEmploye, setSelectEmploye] = useState('');
  const { isAssignModal } = useSelector(
    (state) => state.AssignEmpBookingSlicer
  );
  const { getEmpolyees,  } = useSelector(
    (state) => state.GetEmployeeSlicer
  );
  // console.log(isAssignModal)
  const dispatch = useDispatch();
    const handleSelectChange = (e)=>{
      console.log(e)
      setSelectEmploye(e)
    }
  const handleAssignEmployeeBooking = () => {
      if(selectEmploye === ""){
        toast.error("Please Select Employee")
      }
      else{
    const AssigObj = {
      bookingId: AssignID,
      employeeId: selectEmploye,
    };
    console.log(AssigObj, "check")
    dispatch(AssignEmplBookingApi(AssigObj));
  }
  };
  const handleClose = () => dispatch(setIsAssignEmpModalClose());

  return (
    <div>
      <Modal
        open={isAssignModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-4">
          <div className="w-full">
                <Select
                  value={selectEmploye}
                  onChange={(e)=>handleSelectChange(e)}
                  label="Select Employee"
                >
                  {getEmpolyees?.map((item, index) => (
                    <Option key={index} value={item?._id}>
                      {item?.fullname}
                    </Option>
                  ))}
                    
                </Select>
              </div>
            <Button onClick={handleAssignEmployeeBooking}>
              Assign Employee Booking
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
