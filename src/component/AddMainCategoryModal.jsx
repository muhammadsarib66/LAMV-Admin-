import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector , useDispatch } from 'react-redux';
import { TextField } from '@mui/material';
import { setisMainCatModalClose } from '../features/slicer/Slicer';
import  {Button}  from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { AddMainCatApi } from '../features/slicer/AddNewMainCat';
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

export default function AddMainCategoryModal() {
    const {isMainCatModal} = useSelector((state)=>state.Slicer);
    const dispatch = useDispatch();

    const [addMainCat , setAddMainCat] = useState({
      title: '',
        
    })

    const handleChange = (e)=>{
        setAddMainCat({...addMainCat , [e.target.name] : e.target.value})
        // console.log(addMainCat)
    }

const handleAddCategory = ()=>{
    if(addMainCat.title === ''){
        toast.error('Please fill the fields')
    }
    else{
      dispatch(AddMainCatApi(addMainCat))
        // console.log(addMainCat.title)
        dispatch(setisMainCatModalClose())
        setAddMainCat({
          title: ''
        })
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

            <TextField value={addMainCat.title } name="title" onChange={handleChange} sx={{width : '100%'}} label="main Category"/>
            <Button onClick={handleAddCategory}>
                    Add Category
            </Button>
          </div>
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}