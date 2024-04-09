import { useEffect, useState } from "react";
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
} from "@material-tailwind/react";
import {
  getBookingApi,
  setIsModalOpen,
} from "../../features/slicer/GetBookingSlicer";
import Loader from "../../component/Loader";
import { DeleteBookingApi } from "../../features/slicer/DeleteBookingSlicer";
import BookingDetailModal from "./BookingDetailModal";
import AddBudgetModal from "./AddBudgetModal";
import { setIsBudgetModalOpen } from "../../features/slicer/AddBudgetSlicer";
import AssigEmpBookingModal from "./AssigEmpBookingModal";
import { setIsAssignEmpModalOpen } from "../../features/slicer/AssignEmpBookingSlicer";
const Booking = () => {
  const dispatch = useDispatch();
  const { getBookings, isLoading } = useSelector(
    (state) => state.GetBookingSlicer
  );
  const TABLE_HEAD = [
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
    // console.log(item);
    dispatch(setIsModalOpen());
  };
  const handleDeleteBooking = (id) => {
    dispatch(DeleteBookingApi(id));
  };
  useEffect(() => {
    // Fetch customers data when the component mounts
    dispatch(getBookingApi());
  }, [dispatch]);

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
              {FilterTab.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>
        <CardBody className="  overflow-scroll    h-[70vh] px-0">
          <table className="mt-4 w-full  overflow-x-scroll min-w-max table-auto text-left">
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
            <tbody>
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
                          {item?._id}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.bookedOn}
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
                          <TrashIcon className=" text-red-500 h-6 w-6" />
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
    </>
  );
};

export default Booking;
