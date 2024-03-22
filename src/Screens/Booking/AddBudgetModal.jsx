import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  AddBudgetApi,
  setIsBudgetModalClose,
} from "../../features/slicer/AddBudgetSlicer";
import { toast } from "react-toastify";
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

export default function AddBudgetModal({ BookingID }) {
  const { isModalOpen } = useSelector((state) => state.AddBudgetSlicer);
  const dispatch = useDispatch();

  const [addBudget, setAddBudget] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setAddBudget(file);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };
  const handleAddBudget = () => {
    
    const formData = new FormData();
    formData.append('budgetFile', addBudget);
    formData.append('bookingId', BookingID);
    dispatch(AddBudgetApi(formData));
    dispatch(setIsBudgetModalClose());
    setAddBudget("");
  };

  const handleClose = () => dispatch(setIsBudgetModalClose());

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
              Add Budget PDF
            </Typography>
            <div className="flex flex-col gap-4">
              <div className="mb-3">
                <label htmlFor="profileImage" className="form-label">
                  Add Budget
                </label>
                <input
                  onChange={handleFileChange}
                  accept="application/pdf"
                  type="file"
                />
              </div>
              <div>
                {addBudget && (
                  <div>
                    <embed
                      src={URL.createObjectURL(addBudget)}
                      type="application/pdf"
                      width="100%"
                      height="400px"
                    />
                  </div>
                )}
              </div>
              <div>
                <Button onClick={handleAddBudget}>Add Budget</Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
