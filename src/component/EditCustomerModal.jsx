/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { Button } from "@material-tailwind/react";
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, config, setIsCustomerActionModalClose } from '../features/slicer/Slicer';
import axios from 'axios';
import { getCustomersApi } from '../features/slicer/CustomerSlicer';
import { toast } from 'react-toastify';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditCustomerModal({userId}) {
    const dispatch = useDispatch();
    const {isCustomerActionModalOpen} = useSelector((state) => state.Slicer);
    const handleClose = () => dispatch(setIsCustomerActionModalClose());

    const handleActive = async () => {
         await axios.post(`${baseUrl}users/unblock-user`,{userId:userId},config)
         .then((resp)=>{
           toast.success('Customer unblocked Successfully')
           dispatch(setIsCustomerActionModalClose())
           dispatch(getCustomersApi())
           return resp.data;

        })
        .catch((err)=>{

            return err.message;
        })
    }
      const handleBlock = async () => {
         await axios.post(`${baseUrl}users/block-user`,{userId:userId},config)
        .then(()=>{
          toast.info('Customer Blocked Successfully')
          dispatch(setIsCustomerActionModalClose())
          dispatch(getCustomersApi())
        })
        .catch((err)=>{
          console.log(err.message)
        })
      }


  return (
    <div>
      <Modal
        open={isCustomerActionModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className='flex justify-around'>
         <Button onClick={handleActive}  color='green'>Active</Button>
         <Button  onClick={handleBlock} color='red'>block</Button>
         </div>
        </Box>
      </Modal>
    </div>
  );
}
