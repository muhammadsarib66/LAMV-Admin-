import {  useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../component/Loader";
import ActionEmployeeModal from "./ActionEmployeeModal";
import {
  setIsEmployeeActionModalOpen,
  setisModalOpen,
} from "../../features/slicer/Slicer";
import { DeleteEmployyee } from "../../features/slicer/DeleteEmployeeSlicer";
import AddEmployeeModal from "./AddEmployeeModal";
import EmployeeDeleteModal from "../../component/EmployeeDeleteModal";

const Employees = () => {
  const dispatch = useDispatch();
  const { getEmpolyees, isLoading } = useSelector(
    (state) => state.GetEmployeeSlicer
  );
  const [userId, setUserId] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [delId, setDelId] = useState("");
  const TABLE_HEAD = [
    "Sr.No",
    "Full Name",
    "User Name",
    "Phone Number",
    "Email",
    "Status",
    "Action",
  ];

  const handleAction = (id) => {
    setUserId(id);
    dispatch(setIsEmployeeActionModalOpen());
  };

  const handleDeleteEmployee = (id) => {
    dispatch(DeleteEmployyee(true));
    setDelId(id);
  };

  // useEffect(() => {
  //   // Fetch customers data when the component mounts
  //   dispatch(getEmployeeApi());
  // }, [dispatch]);
  const filteredEmployees = getEmpolyees.filter((customer) => {
    const isMatchFilter =
      filter === "all" ||
      (filter === "active" && customer.isActive === true) ||
      (filter === "blocked" && customer.isActive === false);

    const isMatchSearch =
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.fullname.toLowerCase().includes(searchQuery.toLowerCase());

    return isMatchFilter && isMatchSearch;
  });

  return (
    <>
      {isLoading && <Loader />}
      <AddEmployeeModal />
      <ActionEmployeeModal userId={userId} />

      <Card className="h-full w-full mb-10">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Employees List
              </Typography>
            </div>
            <Button
              onClick={() => dispatch(setisModalOpen())}
              className="flex items-center gap-3"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Employee
            </Button>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <select
              className="w-40 h-8  border-2 rounded-md  "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option className=" " value="all">
                All
              </option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <div className="w-full md:w-72">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="  overflow-scroll    h-[70vh] px-0">
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
              {getEmpolyees &&
                filteredEmployees?.map((item, index) => {
                  const isLast = index === getEmpolyees?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.fullname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.username}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.phoneNumber}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={item?.isActive ? "active" : "blocked"}
                            color={item?.isActive ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>

                      <td className={classes}>
                        <Tooltip content="action">
                          <IconButton
                            onClick={() => handleAction(item)}
                            variant="text"
                          >
                            <PencilIcon className=" h-5 w-5" color="blue" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete user ">
                          <IconButton
                            onClick={() => handleDeleteEmployee(item?._id)}
                            variant="text"
                          >
                            <TrashIcon className="h-5 w-5" color="red" />
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
      <EmployeeDeleteModal id={delId} />
    </>
  );
};

export default Employees;
