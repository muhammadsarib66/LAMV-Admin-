/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  TrashIcon,
} from "@heroicons/react/24/solid";
import AddSubCategoryModal from "../component/AddSubCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { setisSubCatModal } from "../features/slicer/Slicer";
import Loader from "../component/Loader";
import { DeleteSubCatApi } from "../features/slicer/DeleteSubCatSlicer";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import Header from "../component/CardHeader";

const SubCategory = () => {
  const { getSubCat, isLoading } = useSelector(
    (state) => state.GetSubCatSlicer
  );
  const TABLE_HEAD = [
    "ID",
    "MainCategory ",
    "Sub Category",
    "Status",
    "Action",
  ];
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [subCatid, setSubCatid] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = getSubCat?.filter((data) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      setFilterData(getSubCat);
    }
  }, [search, getSubCat]);


  const HandleDelete = (item) => {

    setSubCatid(item?._id);
    setIsOpen(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Card className="h-full  pt-10 md:pt-0  w-full mb-10">
        <Header
          handleAddBtn={() => dispatch(setisSubCatModal())}
          BtnTitle={"Add Sub Category"}
          heading={"Sub Category "}
          headingDetail="See information about  Sub Category"
          setSearch={setSearch}
        />

        <CardBody className="     h-[70vh]  overflow-auto px-0">
          <table className="mt-4 w-full   min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterData?.map((item, index) => {
                const isLast = index === filterData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={item?._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.mainCategory?.title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={item?.isDisabled ? "ture" : "false"}
                          color={item?.isDisabled ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>

                    <td
                      onClick={() =>{ HandleDelete(item)}}
                      className={classes}
                    >
                      <Tooltip content="Info User">
                        <IconButton variant="text">
                          <TrashIcon className="w-5 h-5" color="red" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <AddSubCategoryModal />
      <SubCatDeleteModal id={subCatid} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default SubCategory;

export const SubCatDeleteModal = ({ id, isOpen, setIsOpen }) => {
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

  const dispatch = useDispatch();
  const handleClose = () => setIsOpen(false);

  const handleDeleteSubCat = () => {
    dispatch(DeleteSubCatApi(id));
    handleClose()
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
            Do You want to delete the Subcategory .?
          </h1>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteSubCat} >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
