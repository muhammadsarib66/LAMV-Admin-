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
import { useDispatch, useSelector } from "react-redux";
import { setisMainCatModal } from "../features/slicer/Slicer";
import AddMainCategoryModal from "../component/AddMainCategoryModal";
import Loader from "../component/Loader";
import { DeleteMainCatApi } from "../features/slicer/DeleteMainCat";

const MainCategory = () => {
  const { getMainCat, isLoading } = useSelector(
    (state) => state.GetMainCatSlicer
  );
  const TABLE_HEAD = ["ID", "Category Name", "Status", "Action"];

  const dispatch = useDispatch();

  const HandleDelete = (item) => {
    // console.log(item);
    dispatch(DeleteMainCatApi(item));
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
              {getMainCat?.map((item, index) => {
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
      <AddMainCategoryModal />
    </>
  );
};

export default MainCategory;
