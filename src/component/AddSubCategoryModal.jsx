import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { setisSubCatModalClose} from "../features/slicer/Slicer";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { Select, Option } from "@material-tailwind/react";
import { AddSubCatApi } from "../features/slicer/AddSubCatSlicer";
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

export default function AddSubCategoryModal() {
  const dispatch = useDispatch();
  const { isSubCatModal } = useSelector((state) => state.Slicer);
  const { getMainCat } = useSelector((state) => state.GetMainCatSlicer
  );
  const [mainCatSelectedValue, setMainCatSelectedValue] = useState("");
  const [title, setTitle] = useState();

  const handleSelectChange = (e) => {
    setMainCatSelectedValue(e);
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddSubCategory = () => {
    if (title === "" || mainCatSelectedValue === "") {
      toast.error("Please fill all the fields");
    } else {
      let subCatObj = { title, mainCategoryId: mainCatSelectedValue };
      dispatch(AddSubCatApi(subCatObj));
      setTitle("");
      setMainCatSelectedValue("");
      dispatch(setisSubCatModalClose());
    }
  };

  const handleClose = () => dispatch(setisSubCatModalClose());

  return (
    <div>
      <Modal
        open={isSubCatModal}
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
              <TextField
                value={title}
                name="title"
                onChange={handleChange}
                sx={{ width: "100%" }}
                label="Sub Category "
              />
              <div className="w-full">
                <Select
                  value={mainCatSelectedValue}
                  onChange={(e) => handleSelectChange(e)}
                  label="Select Main Category"
                >
                  {getMainCat?.map((item, index) => (
                    <Option key={index} value={item?._id}>
                      {item?.title}
                    </Option>
                  ))}
                    
                </Select>
              </div>
              <Button onClick={handleAddSubCategory}>Add SubCategory</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
