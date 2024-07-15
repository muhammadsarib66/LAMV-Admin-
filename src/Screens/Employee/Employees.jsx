import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
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
import Header from "../../component/CardHeader";

const Employees = () => {
  const dispatch = useDispatch();
  const { getEmpolyees, isLoading } = useSelector(
    (state) => state.GetEmployeeSlicer
  );
  const [userId, setUserId] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [statusTab, setStatusTab] = useState("all");
  const [search, setSearch] = useState("");
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

  const EmployeeStatusTABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "true",
    },
    {
      label: "Blocked",
      value: "false",
    },
  ];
  const handleAction = (id) => {
    setUserId(id);
    dispatch(setIsEmployeeActionModalOpen());
  };

  const handleDeleteEmployee = (id) => {
    dispatch(DeleteEmployyee(true));
    setDelId(id);
  };

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = getEmpolyees?.filter((data) => {
        return data.username.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = getEmpolyees?.filter((data) => {
        if (statusTab === "all") {
          return true;
        } else {
          return data.isActive.toString() == statusTab;
        }
      });
      setFilterData(filteredData);
    }
  }, [search, getEmpolyees, statusTab]);

  return (
    <>
      {isLoading && <Loader />}
      <AddEmployeeModal />
      <ActionEmployeeModal userId={userId} />

      <Card className="h-full  pt-10 md:pt-0  w-full mb-10">
        <Header
          heading={"Employee List"}
          headingDetail="See information about  Employee"
          statusTabs={EmployeeStatusTABS}
          setStatusTab={setStatusTab}
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
              {getEmpolyees &&
                filterData?.map((item, index) => {
                  const isLast = index === filterData?.length - 1;
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
