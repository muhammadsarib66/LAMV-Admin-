/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material";
import {
  deleteCustomerApi,
  setIsCustomerDelModalClose,
} from "../features/slicer/DeleteCustomerSlicer";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const CustomerDeleteModal = ({ id }) => {
  const { isOpen } = useSelector((state) => state.DeleteCustomerSlicer);
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleDelete = () => {
    console.log(id);
    // deleteCustomerApi
    dispatch(deleteCustomerApi(id));

    dispatch(setIsCustomerDelModalClose());
  };
  const handleClose = () => {
    dispatch(setIsCustomerDelModalClose());
  };
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold ">
            Do You want to delete the Customer .?
          </h1>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomerDeleteModal;
