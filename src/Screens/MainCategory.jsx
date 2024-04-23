/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Input,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setisMainCatModal } from "../features/slicer/Slicer";
import AddMainCategoryModal from "../component/AddMainCategoryModal";
import Loader from "../component/Loader";
import { DeleteMainCatApi } from "../features/slicer/DeleteMainCat";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Box, Modal } from "@mui/material";

const MainCategory = () => {
  const { getMainCat, isLoading } = useSelector(
    (state) => state.GetMainCatSlicer
  );
  const TABLE_HEAD = ["Sr No#", "Category Name", "Status", "Action"];
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  let filterMainCat =
    getMainCat &&
    getMainCat?.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const HandleDelete = (item) => {
    setId(item);
    setIsOpen(true);
    // console.log(item);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Main Cateogry
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => dispatch(setisMainCatModal())}
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                Category
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-full  md:w-72">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="  overflow-scroll   h-[70vh] px-0">
          <table className="mt-4 w-full  overflow-x-scroll min-w-max table-auto text-left">
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
              {filterMainCat?.map((item, index) => {
                const isLast = index === getMainCat.length - 1;
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
