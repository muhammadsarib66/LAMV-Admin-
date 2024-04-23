/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { Button } from "@material-tailwind/react";
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { baseUrl, config, setIsCustomerActionModalClose } from '../features/slicer/Slicer';
import axios from 'axios';
import { getCustomersApi } from '../features/slicer/CustomerSlicer';
import { toast } from 'react-toastify';
import { Divider } from '@mui/material';
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

export default function EditCustomerModal({userId}) {
  console.log(userId)
    const dispatch = useDispatch();
    const {isCustomerActionModalOpen} = useSelector((state) => state.Slicer);
    const handleClose = () => dispatch(setIsCustomerActionModalClose());

    const handleActive = async () => {
         await axios.post(`${baseUrl}users/unblock-user`,{userId:userId?._id},config)
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
         await axios.post(`${baseUrl}users/block-user`,{userId:userId?._id},config)
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
        <Box sx={style} className=' flex flex-col gap-4 p-4'>
            <div className="flex justify-between  ">
            <h1 className='text-xl font-semibold '>
              Customer is currently {userId && userId.isActive ? 'Active' : 'Blocked'} 
            </h1>
            <i className="fa-solid text-xl fa-xmark"></i>
              </div>
              <p> please click on button to perform an action</p>
           

          <Divider />
         <div className='flex justify-end gap-2'>
         <Button disabled={userId?.isActive} onClick={handleActive}  variant='outlined'>Active</Button>
         <Button  disabled={userId?.isBlocked} onClick={handleBlock} variant='standard'>block</Button>
         </div>
         

        </Box>
      </Modal>
    </div>
  );
}
