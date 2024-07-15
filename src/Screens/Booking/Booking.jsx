/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import {  useEffect, useState } from "react";
import {
  DocumentPlusIcon,
  InformationCircleIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  setIsModalOpen,
} from "../../features/slicer/GetBookingSlicer";
import Loader from "../../component/Loader";
import { DeleteBookingApi } from "../../features/slicer/DeleteBookingSlicer";
import BookingDetailModal from "./BookingDetailModal";
import AddBudgetModal from "./AddBudgetModal";
import { setIsBudgetModalOpen } from "../../features/slicer/AddBudgetSlicer";
import AssigEmpBookingModal from "./AssigEmpBookingModal";
import { setIsAssignEmpModalOpen } from "../../features/slicer/AssignEmpBookingSlicer";
import moment from "moment";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Box, Modal } from "@mui/material";
import Header from "../../component/CardHeader";
const Booking = () => {
  const dispatch = useDispatch();
  const { getBookings, isLoading } = useSelector(
    (state) => state.GetBookingSlicer
  );
  const TABLE_HEAD = [
    "Sr No",
    "Booking By",
    "Booked on",
    "Booked For",
    "Booking ID",
    "Status",
    "Action",
  ];
 
  const [bookingDetail, setBookingDetail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [filterData, setFilterData] = useState(getBookings?.Active);
  console.log(filterData)
  const [statusTab, setStatusTab] = useState("active");
  const [search, setSearch] = useState("");
  // const [statusTab, setstatusTab] = useState("active");

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");
  const FilterTab = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "pending",
      label: "Pending",
    },
    {
      value: "cancelled",
      label: "Cancelled",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "ongoing",
      label: "Ongoing",
    },
    {
      value: "budgetAttached",
      label: "budgetAttached",
    },
  ];
 
  
  const handleAsignEmpBooking = (item) => {
    const {  _id } = item;
    // console.log(bookingId, _id);
    setBookingId(_id);
    dispatch(setIsAssignEmpModalOpen());
  };
  const handleAddBudget = (id) => {
    setBookingId(id);
    dispatch(setIsBudgetModalOpen());
  };
  const handleInfoOpen = (item) => {
    setBookingDetail(item);
    console.log(item);
    dispatch(setIsModalOpen());
  };
  const handleDeleteBooking = (id) => {
    setId(id);
    setIsOpen(true);
  };


  useEffect(() => {
    if (search.length > 0) {
      // Filter based on search input
      const filteredData = Object.values(getBookings).flatMap((array) =>
        array.filter((data) =>
          data.bookingId.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilterData(filteredData);
    } else {
      // Filter based on statusTab matching keys in getBookings
      const filteredData = Object.entries(getBookings).flatMap(([key, array]) =>
        key === statusTab ? array : []
      );
      setFilterData(filteredData);
    }
  }, [search, getBookings, statusTab]);
  // useEffect(() => {
  //   if (search.length > 0) {
  //     // Filter based on search input
  //     const filteredData = Object.values(getBookings).flatMap((array) =>
  //       array.filter((data) =>
  //         data.bookingId.toLowerCase().includes(search.toLowerCase())
  //       )
  //     );
  //     setFilterData(filteredData);
  //   } else {
  //     // Filter based on statusTab
  //     const filteredData = Object.values(getBookings).flatMap((array) =>
  //       array.filter((data) => {
          
  //         if (statusTab === "active") {
  //           return true; // Return all data if statusTab is "active"
  //         } else {

  //           console.log(Object.keys(data), statusTab);
  //           return data.status === statusTab; // Adjust this condition based on your actual data structure
  //         }
  //       })
  //     );
  //     setFilterData(filteredData);
  //   }
  // }, [search, getBookings, statusTab]);
  
  // useEffect(() => {
  //   if (search.length > 0) {
  //     const filteredData = getBookings?.filter((data) => {
  //       return data.bookingId.toLowerCase().includes(search.toLowerCase());
  //     });
  //     setFilterData(filteredData);
  //   } else {
  //     // If search is cleared, reset filterData based on statusTab
  //     const filteredData = getBookings?.filter((data) => {
  //       if (statusTab === "active") {
  //         return true;
  //       } else {
  //         return data.toString() == statusTab;
  //       }
  //     });
  //     setFilterData(filteredData);
  //   }
  // }, [search, getBookings, statusTab]);
  return (
    <>
      {isLoading && <Loader />}
      <BookingDetailModal bookingDetail={bookingDetail} />
      <AddBudgetModal BookingID={bookingId} />
      <AssigEmpBookingModal AssignID={bookingId} />
      <Card className="h-full  pt-10 md:pt-0  w-full mb-10">
      <Header
        heading={"Booking List"}
        headingDetail="See information about  Bookings"
        statusTabs={FilterTab}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
      />
        <CardBody className="     h-[70vh]  overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto  text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, ind) => (
                  <th
                    key={ind}
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
            <tbody className="    overflow-scroll">
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
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.bookedBy?.fullname? item?.bookedBy?.fullname : "Uknown Person"}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                       { moment(item?.bookedOn).format("MMM Do YYYY")
                        }
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.bookedFor}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.bookingId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={item?.bookingStatus}
                          color={
                            (item?.bookingStatus === "Active" && "green") ||
                            (item?.bookingStatus === "Cancelled" && "red") ||
                            (item?.bookingStatus === "Completed" && "blue") ||
                            (item?.bookingStatus === "Ongoing" && "orange")
                          }
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      {statusTab === "active" && (
                        <Tooltip content="Assign Employee Booking">
                          <IconButton
                            onClick={() => handleAsignEmpBooking(item)}
                            variant="text"
                          >
                            <UserPlusIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {statusTab === "ongoing" && (
                        <Tooltip content="Assign Employee Booking">
                          <IconButton
                            onClick={() => handleAsignEmpBooking(item)}
                            variant="text"
                          >
                            <UserPlusIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {statusTab === "pending" && (
                        <Tooltip content="Add Budget">
                          <IconButton
                            onClick={() => handleAddBudget(item?._id)}
                            variant="text"
                          >
                            <DocumentPlusIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip content="Booking Info">
                        <IconButton
                          onClick={() => handleInfoOpen(item)}
                          variant="text"
                        >
                          <InformationCircleIcon className="h-6 w-6" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete Booking">
                        <IconButton
                          onClick={() => handleDeleteBooking(item?._id)}
                          variant="text"
                        >
                          <TrashIcon className=" text-red-500 h-5 w-5" />
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
      <BokingDetteModal id={id} isOpen={isOpen} setIsOpen={setIsOpen} />  
    </>
  );
};

export default Booking;



export const BokingDetteModal = ({ id, isOpen, setIsOpen }) => {
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
    dispatch(DeleteBookingApi(id));
    handleClose()
    // dispatch(DeleteMainCatApi(id));
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
            Do You want to delete the Booking .?
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