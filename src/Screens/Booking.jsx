import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
const Booking = () => {
  const TABLE_HEAD = [
    "Booking ID",
    "Booking Date",
    "Product Name",
    "Customer Name",
    "Address",
    "Status",
    "Info",
  ];
  const TABLE_ROWS = [
    {
      BookingID: "22203",
      BookingDate: "20/12/2024",
      ProductName: "Shoes",
      CustomerName: "Ahmed",
      Address: "hyder 26 city Hyderabad",
      Status: "placed",
    },
    {
      BookingID: "99822",
      BookingDate: "10/12/2024",
      ProductName: "Shirt",
      CustomerName: "Ali",
      Address: "Hyderbad  Qaasimabas d jsaksdj",
      Status: "canceled",
    },
    {
      BookingID: "99822",
      BookingDate: "10/12/2024",
      ProductName: "Shirt",
      CustomerName: "Ali",
      Address: "Hyderbad  Qaasimabas d jsaksdj",
      Status: "pending",
    },
  ];
  const TABS = [
    {
      label: "placed",
      value: "all",
    },
    {
      label: "pending",
      value: "pending",
    },
    {
      label: "canceled",
      value: "canceled",
    },
  ];
  const [TableData, setTableData] = useState(TABLE_ROWS);
  return (
    <Card className="h-full w-full mb-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Booking
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
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
            {TableData.map((item, index) => {
              const isLast = index === TableData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item.BookingID}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.BookingID}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.BookingDate}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.ProductName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.CustomerName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.Address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={
                          item.Status == "placed"
                            ? item.Status
                            : item.Status == "pending"
                            ? item.Status
                            : "canceled"
                        }
                        color={
                          item.Status == "placed"
                            ? "green"
                            : item.Status == "pending"
                            ? "gray"
                            : "red"
                        }
                      />
                    </div>
                  </td>

                  <td onClick={() => console.log(item)} className={classes}>
                    <Tooltip content="Info User">
                      <IconButton variant="text">
                        <InformationCircleIcon className="h-6 w-6" />
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
  );
};

export default Booking;
