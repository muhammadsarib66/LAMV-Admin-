/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  AssignEmplBookingApi,
  setIsAssignEmpModalClose,
} from "../../features/slicer/AssignEmpBookingSlicer";
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
  const { isAssignModal } = useSelector(
    (state) => state.AssignEmpBookingSlicer
  );
  // console.log(isAssignModal)
  const dispatch = useDispatch();

  const handleAssignEmployeeBooking = () => {
    const AssigObj = {
      bookingId: AssignID,
      employeeId: userID,
    };
    console.log(AssigObj, "check")
    dispatch(AssignEmplBookingApi(AssigObj));
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
            <Button onClick={handleAssignEmployeeBooking}>
              Assign Employee Booking
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
