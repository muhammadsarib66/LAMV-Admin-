/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { Button } from "@material-tailwind/react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  baseUrl,
  config,
  setIsEmployeeActionModalClose,
} from "../../features/slicer/Slicer";
import { getEmployeeApi } from "../../features/slicer/GetEmployeeSlicer";
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

export default function ActionEmployeeModal({ userId }) {
  const dispatch = useDispatch();
  const { isEmployeeActionModalOpen } = useSelector((state) => state.Slicer);
  const handleClose = () => dispatch(setIsEmployeeActionModalClose());

  const handleActive = async () => {
    await axios
      .post(
        `${baseUrl}employees/unblock-employee`,
        { employeeId: userId },
        config
      )
      .then(() => {
        toast.success("Employee unblocked Successfully");
        dispatch(setIsEmployeeActionModalClose());
        dispatch(getEmployeeApi());
      })
      .catch((err) => {
        return err.message;
      });
  };
  const handleBlock = async () => {
    await axios
      .post(
        `${baseUrl}employees/block-employee`,
        { employeeId: userId },
        config
      )
      .then(() => {
        toast.info("Employee Blocked Successfully");
        dispatch(setIsEmployeeActionModalClose());
        dispatch(getEmployeeApi());
      })
      .catch((err) => {
        return err.message;
      });
  };

  return (
    <div>
      <Modal
        open={isEmployeeActionModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-around">
            <Button onClick={handleActive} color="green">
              Active
            </Button>
            <Button onClick={handleBlock} color="red">
              block
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
