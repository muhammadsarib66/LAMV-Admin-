import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    UsersIcon,
    UserGroupIcon,
    RectangleStackIcon,
    InboxIcon,
    TagIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
   
  const Drawer= ()=> {
    return (
        // h-[calc(100vh-2rem)]
      <Card className="  h-auto min-h-screen   bg-gray-50
       w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Admin Portal
          </Typography>
        </div>
        <List>
            <Link className="flex" to="/">
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
            <ListItemSuffix>
              {/* <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" /> */}
            </ListItemSuffix>
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
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Customer Support
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </Card>
    );
  }
  export default Drawer