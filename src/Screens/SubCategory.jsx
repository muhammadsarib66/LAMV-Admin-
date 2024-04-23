/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import {
  UserPlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import AddSubCategoryModal from "../component/AddSubCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { setisSubCatModal } from "../features/slicer/Slicer";
import Loader from "../component/Loader";
import { DeleteSubCatApi } from "../features/slicer/DeleteSubCatSlicer";
import { useState } from "react";
import { Box, Modal } from "@mui/material";

const SubCategory = () => {
  const TABLE_HEAD = [
    "ID",
    "MainCategory ",
    "Sub Category",
    "Status",
    "Action",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const { getSubCat, isLoading } = useSelector(
    (state) => state.GetSubCatSlicer
  );
  const dispatch = useDispatch();

  let filterSubCat =
    getSubCat &&
    getSubCat?.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const HandleDelete = (item) => {
    setId(item);
    setIsOpen(true);
    // dispatch(DeleteSubCatApi(item));
  };
  return (
    <>
      {isLoading && <Loader />}
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Sub Cateogry
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => dispatch(setisSubCatModal())}
                className="flex items-center gap-3"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                SubCategory
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
        <CardBody className="    overflow-scroll  h-[70vh] px-0">
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
              {filterSubCat?.map((item, index) => {
                const isLast = index === getSubCat.length - 1;
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
                      onClick={() => HandleDelete(item?._id)}
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
      <SubCatDeleteModal id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
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

  const handleDelete = () => {
    dispatch(DeleteSubCatApi(id));
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
          <Button variant="contained" onClick={handleDelete} >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
