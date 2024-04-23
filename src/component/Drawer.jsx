import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UsersIcon,
  UserGroupIcon,
  RectangleStackIcon,
  InboxIcon,
  TagIcon,
  PowerIcon,
  PhoneArrowDownLeftIcon,
  BellAlertIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useState } from "react";

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    // h-[calc(100vh-2rem)]
    <Card 
      className="  min-h-full   bg-gray-50
       w-full  p-4 shadow-xl shadow-blue-gray-900/5"
    >
      <div className="mb-2 p-4 flex justify-between items-center">
        <Typography variant="h5" color="blue-gray">
          Admin Portal
        </Typography>
        {isDrawerOpen && (
          <i  className="  fa-solid fa-bars"></i> 
        ) }

      </div>
      <List >
        <Link className="flex " to="/">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>
        <Link className="flex" to="/customers">
          <ListItem>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            Customers
          </ListItem>
        </Link>
        <Link className="flex" to="/employees">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Employees
          </ListItem>
        </Link>
        <Link className="flex" to="/booking">
          <ListItem>
            <ListItemPrefix>
              <UserGroupIcon className="h-5 w-5" />
            </ListItemPrefix>
            Bookings
          </ListItem>
        </Link>
        <Link className="flex" to="/maincategory">
          <ListItem>
            <ListItemPrefix>
              <RectangleStackIcon className="h-5 w-5" />
            </ListItemPrefix>
            Main Categories
          </ListItem>
        </Link>
        <Link className="flex" to="/subcategory">
          <ListItem>
            <ListItemPrefix>
              <TagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Sub Categories
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <PhoneArrowDownLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          Customer Support
        </ListItem>
        <Link className="flex" to="/customnotification">

        <ListItem>
          <ListItemPrefix>
            <BellAlertIcon className="h-5 w-5" />
          </ListItemPrefix>
          Custom Notification
        </ListItem>
        </Link>

        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Logout
        </ListItem>
      </List>
    </Card>
  );
};
export default Drawer;
