import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import AddSubCategoryModal from "../component/AddSubCategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { setisSubCatModal } from "../features/slicer/Slicer";
import Loader from "../component/Loader";
import { DeleteSubCatApi } from "../features/slicer/DeleteSubCatSlicer";

const SubCategory = () => {
  const TABLE_HEAD = [
    "ID",
    "MainCategory ",
    "Sub Category",
    "Status",
    "Action",
  ];

  const { getSubCat, isLoading } = useSelector(
    (state) => state.GetSubCatSlicer
  );
  const dispatch = useDispatch();

  const HandleDelete = (item) => {
    dispatch(DeleteSubCatApi(item));
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
              {getSubCat?.map((item, index) => {
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
                          <TrashIcon className="w-5 h-5" />
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
    </>
  );
};

export default SubCategory;
