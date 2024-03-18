import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector , useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { setisModalClose } from '../features/slicer/Slicer';
import  {Button}  from '@material-tailwind/react';
// import { setisModalOpen } from '../features/slicer/Slicer';
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

export default function AddMemberModal() {
    const {isModalOpen} = useSelector((state)=>state.Slicer);
    const dispatch = useDispatch();

    const [addEmployee , setAddEmployee] = useState({
        name: '',
        email: '',
        phone : ''
    })

    const handleChange = (e)=>{
        setAddEmployee({...addEmployee , [e.target.name] : e.target.value})
    }

const handleAddEmployee = ()=>{
    console.log(addEmployee)
}

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

            <TextField value={addEmployee.name} name="name" onChange={handleChange} sx={{width : '100%'}} label="name"/>
            <TextField value={addEmployee.email} name="email"onChange={handleChange} sx={{width : '100%'}} label="email "/>
            <TextField value={addEmployee.phone} name="phone" onChange={handleChange} sx={{width : '100%'}} label="Phone"/>
            <Button onClick={handleAddEmployee}>
                    Add Employeye
            </Button>
          </div>
          </div>

        </Box>
      </Modal>
    </div>
  );
}