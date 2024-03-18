import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector , useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { setisMainCatModalClose } from '../features/slicer/Slicer';
import  {Button}  from '@material-tailwind/react';
import { toast } from 'react-toastify';
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

export default function AddMainCategoryModal({AddCat}) {
    const {isMainCatModal} = useSelector((state)=>state.Slicer);
    const dispatch = useDispatch();

    const [addMainCat , setAddMainCat] = useState({
        mainCategory: '',
        Brand: '',
    })

    const handleChange = (e)=>{
        setAddMainCat({...addMainCat , [e.target.name] : e.target.value})
        console.log(addMainCat)
    }

const handleAddEmployee = ()=>{
    if(addMainCat.main === '' || addMainCat.brand === ''){
        toast.error('Please fill all the fields')
    }
    else{
        AddCat(addMainCat)
        console.log(addMainCat)
        toast.success('Main Category Added')
        
        dispatch(setisMainCatModalClose())
    }
}

    const handleClose = () => dispatch(setisMainCatModalClose());

  return (
    <div>
      <Modal
        open={isMainCatModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="flex flex-col gap-4">

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Main Category
          </Typography>
          <div className="flex flex-col gap-4">

            <TextField value={addMainCat.mainCategory} name="mainCategory" onChange={handleChange} sx={{width : '100%'}} label="main"/>
            <TextField value={addMainCat.Brand} name="Brand"onChange={handleChange} sx={{width : '100%'}} label="brand "/>
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