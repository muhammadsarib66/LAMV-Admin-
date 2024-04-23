/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import {  useState } from "react";
import {
  DocumentPlusIcon,
  InformationCircleIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Input,
  Button,
  Option,
  Select
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
  const FilterTab = [
    {
      value: "active",
      title: "Active",
    },
    {
      value: "pending",
      title: "Pending",
    },
    {
      value: "cancelled",
      title: "Cancelled",
    },
    {
      value: "completed",
      title: "Completed",
    },
    {
      value: "ongoing",
      title: "Ongoing",
    },
    {
      value: "budgetAttached",
      title: "budget Attached",
    },
  ];
  const [bookingDetail, setBookingDetail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  let filteredBookings;
  if (selectedStatus === "active") {
    filteredBookings = getBookings.active;
  } else if (selectedStatus === "pending") {
    filteredBookings = getBookings.pending;
  } else if (selectedStatus === "cancelled") {
    filteredBookings = getBookings.cancelled;
  } else if (selectedStatus === "completed") {
    filteredBookings = getBookings.completed;
  } else if (selectedStatus === "ongoing") {
    filteredBookings = getBookings.ongoing;
  } else if (selectedStatus === "budgetAttached") {
    filteredBookings = getBookings.budgetAttached;
  } else {
    // Handle other cases, such as 'cancelled', 'completed', etc.
    filteredBookings = [];
  }
  
  if (searchQuery) {
    filteredBookings = filteredBookings.filter((booking) => {
      return (
        booking?.bookedBy?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking?.bookedFor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking?.bookingId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }
  
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

  return (
    <>
      {isLoading && <Loader />}
      <BookingDetailModal bookingDetail={bookingDetail} />
      <AddBudgetModal BookingID={bookingId} />
      <AssigEmpBookingModal AssignID={bookingId} />
      <Card className="h-full  mb-10">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Booking List
              </Typography>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
            <select
              className="w-40 h-8  border-2 rounded-md  "
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {FilterTab.map((item, index) => {
                 let arrayLength = 0; // Initialize array length
                 if (getBookings.hasOwnProperty(item.value)) {
                   arrayLength = getBookings[item.value].length; // Get the length of the array based on the option value
                 }
                return(
                <option className=" flex" key={index} value={item.value}>
                <span>  {item.title} </span>
                   <span className=" ">
                   ({arrayLength})
                    </span>

                </option>
              )})}
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
        <CardBody className="    h-[70vh] overflow-y-scroll     px-0">
          <table className="mt-4 w-full    min-w-max table-auto text-left">
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
              {filteredBookings?.map((item, index) => {
                const isLast = index === filteredBookings.length - 1;
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
                      {selectedStatus === "active" && (
                        <Tooltip content="Assign Employee Booking">
                          <IconButton
                            onClick={() => handleAsignEmpBooking(item)}
                            variant="text"
                          >
                            <UserPlusIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {selectedStatus === "ongoing" && (
                        <Tooltip content="Assign Employee Booking">
                          <IconButton
                            onClick={() => handleAsignEmpBooking(item)}
                            variant="text"
                          >
                            <UserPlusIcon className="h-6 w-6" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {selectedStatus === "pending" && (
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