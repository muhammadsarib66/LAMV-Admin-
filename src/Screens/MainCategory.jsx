/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {  TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setisMainCatModal } from "../features/slicer/Slicer";
import AddMainCategoryModal from "../component/AddMainCategoryModal";
import Loader from "../component/Loader";
import { DeleteMainCatApi } from "../features/slicer/DeleteMainCat";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import Header from "../component/CardHeader";

const MainCategory = () => {
  const { getMainCat, isLoading } = useSelector(
    (state) => state.GetMainCatSlicer
  );
  const TABLE_HEAD = ["Sr No#", "Category Name", "Status", "Action"];
  const [isOpen, setIsOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);

  const [search, setSearch] = useState("");

  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const HandleDelete = (item) => {
    console.log(item)
    setId(item);
    setIsOpen(true);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = getMainCat?.filter((data) => {
        return data.title.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      setFilterData(getMainCat);
    }
  }, [search, getMainCat]);

  return (
    <>
      {isLoading && <Loader />}
      <Card className="h-full  pt-10 md:pt-0  w-full mb-10">
        <Header
          handleAddBtn={() => dispatch(setisMainCatModal())}
          BtnTitle={"Add Main Category"}
          heading={"Main Category "}
          headingDetail="See information about  Main Category"
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
                  <tr key={index}>
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
                        {item?.title}
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
                      onClick={() => HandleDelete(item?._id)}
                      className={classes}
                    >
                      <Tooltip content="Delete">
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
      <AddMainCategoryModal />
      <MainCatDeleteModal id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default MainCategory;

export const MainCatDeleteModal = ({ id, isOpen, setIsOpen }) => {
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

  const handleDelete = () => {
    dispatch(DeleteMainCatApi(id));
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
            Do You want to delete the MainCategory .?
          </h1>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
