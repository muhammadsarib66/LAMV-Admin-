import {useState} from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
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
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
const Customers = () => {
    const TABLE_HEAD = [
        "Member",
        "Phone Number",
        "Address",
        "Status",
        "Employed",
        "",
      ];
    const TABLE_ROWS = [
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
          name: "John Michael",
          email: "john@creative-tim.com",
          phone: "03103102100",
          online: true,
          date: "23/04/18",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
          name: "Alexa Liras",
          email: "alexa@creative-tim.com",
          online: false,
          phone: "03103102100",
          date: "23/04/18",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
          name: "Laurent Perrier",
          email: "laurent@creative-tim.com",
          online: false,
      
          phone: "03103102100",
          date: "19/09/17",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
          name: "Michael Levi",
          email: "michael@creative-tim.com",
          job: "Programator",
          org: "Developer",
          online: true,
          phone: "03103102100",
          date: "24/12/08",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
          name: "Michael Levi",
          email: "michael@creative-tim.com",
          job: "Programator",
          address: "house 24 area wise Hyderabad",
          org: "Developer",
          online: true,
          phone: "03103102100",
          date: "24/12/08",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
          name: "Michael Levi",
          email: "michael@creative-tim.com",
          job: "Programator",
          org: "Developer",
          online: true,
          phone: "03103102100",
          date: "24/12/08",
        },
        {
          img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
          name: "Richard Gran",
          email: "richard@creative-tim.com",
          job: "Manager",
          org: "Executive",
          online: false,
          date: "04/10/21",
        },
      ];
      const TABS = [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Online",
          value: true,
        },
        {
          label: "Offline",
          value: false,
        },
      ];
      const [TableData , setTableData] = useState(TABLE_ROWS)
  return (
    <Card className="h-full w-full mb-10">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
             Customers
            </Typography>
           
          </div>
          
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab  key={value} value={value}>
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
                <tr key={item.name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={item.img} alt={item.name} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {item.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.address}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={item.online ? "online" : "offline"}
                        color={item.online ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.date}
                    </Typography>
                  </td>
                  <td onClick={() => console.log(item)} className={classes}>
                    <Tooltip content="Edit User">
                      <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
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
  )
}

export default Customers