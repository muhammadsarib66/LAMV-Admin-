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
import { Divider } from "@mui/material";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  // p: 4,
};

export default function ActionEmployeeModal({ userId }) {
  const dispatch = useDispatch();
  console.log(userId)
  const { isEmployeeActionModalOpen } = useSelector((state) => state.Slicer);
  const handleClose = () => dispatch(setIsEmployeeActionModalClose());

  const handleActive = async () => {
    await axios
      .post(
        `${baseUrl}employees/unblock-employee`,
        { employeeId: userId?._id },
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
        { employeeId: userId?._id },
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
       <Box sx={style} className=' flex flex-col gap-4 p-4'>
            <div className="flex justify-between  ">
            <h1 className='text-xl font-semibold '>
              Employee is currently {userId && userId.isActive ? 'Active' : 'Blocked'} 
            </h1>
            <i onClick={handleClose} className="fa-solid text-xl fa-xmark cursor-pointer"></i>
              </div>
              <p> please click on button to perform an action</p>
           

          <Divider />
         <div className='flex justify-end gap-2'>
          {
            userId?.isActive ? <Button onClick={handleBlock} variant='standard'>block</Button> : <Button onClick={handleActive} variant='outlined'>Unblock</Button>
          }
         </div>
         

        </Box>
      </Modal>
    </div>
  );
}
