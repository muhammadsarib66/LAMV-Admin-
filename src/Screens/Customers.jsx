import {  useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import {  setIsCustomerDelModal } from "../features/slicer/DeleteCustomerSlicer";
import Loader from "../component/Loader";
import EditCustomerModal from "../component/EditCustomerModal";
import { setIsCustomerActionModalOpen } from "../features/slicer/Slicer";
import CustomerDeleteModal from "../component/CustomerDeleteModal";
import Header from "../component/CardHeader";

const Customers = () => {
  const dispatch = useDispatch();
  const { getCustomers, isLoading } = useSelector(
    (state) => state.CustomerSlicer
  );
  const [userId, setUserId] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [statusTab, setStatusTab] = useState("all");
  const [search, setSearch] = useState("");
  
  const [ delId, setDelId] = useState('')
  
  const TABLE_HEAD = [
    "Sr.No",
    "Full Name",
    "User Name",
    "Phone Number",
    "Email",
    "Status",
    "Action",
  ];
  const CustomerStatusTABS = [
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

  const handleAction = (item) => {
    setUserId(item);
    dispatch(setIsCustomerActionModalOpen());
  };

  const handleDeleteCustomer = (id) => {
    dispatch(setIsCustomerDelModal(true));
    setDelId(id)  
  };
 

  useEffect(() => {
    if (search.length > 0) {
      const filteredData = getCustomers?.filter((data) => {
        return data.username.toLowerCase().includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filterData based on statusTab
      const filteredData = getCustomers?.filter((data) => {
        if (statusTab === "all") {
          return true;
        } else {
          return data.isActive.toString() == statusTab;
        }
      });
      setFilterData(filteredData);
    }
  }, [search, getCustomers, statusTab]);
  // console.log('filterData', filterData)
  return (
    <>
      {isLoading && <Loader />}
      <EditCustomerModal userId={userId} />

      <Card className="h-full  pt-10 md:pt-0  w-full mb-10">
      <Header
        heading={"Customer List"}
        headingDetail="See information about  Customers"
        statusTabs={CustomerStatusTABS}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
      />
        <CardBody className="     h-[70vh]  overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto  text-left">
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
              {getCustomers.length>0 ?
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
                            onClick={() => handleDeleteCustomer(item?._id)}
                            variant="text"
                          >
                            <TrashIcon className="text-red-700 h-4 w-4" />
                            
                            {/* <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} id={delId}  /> */}
                          </IconButton>
                          
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }):
                  <p> loading Data...</p>
                }
            </tbody>
          </table>
        </CardBody>
      </Card>
      <CustomerDeleteModal  id={delId}  />
    </>
  );
};


export default Customers;
