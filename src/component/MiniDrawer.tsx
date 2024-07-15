import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Route, Routes } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import LAMVLogo from "../images/Logo.png"; 
import {
  PresentationChartBarIcon,
  UsersIcon,
  UserGroupIcon,
  RectangleStackIcon,
  InboxIcon,
  TagIcon,
  PowerIcon,
  PhoneArrowDownLeftIcon,
  BellAlertIcon,
  Bars3Icon,
  ChevronLeftIcon
} from "@heroicons/react/24/solid";
import { Avatar } from "@mui/material";
import Dashboard from "../Screens/Dashboard";
import Customers from "../Screens/Customers";
import Employees from "../Screens/Employee/Employees";
import Booking from "../Screens/Booking/Booking";
import MainCategory from "../Screens/MainCategory";
import SubCategory from "../Screens/SubCategory";
import CustomNotification from "../Screens/CustomNotification";
const drawerWidth = 240;
const tabs = [
  {
    title: "Dashboard",
    link: "/",
    icon: <PresentationChartBarIcon className="h-5 w-5" />,
  },
  {
    title: "Customers",
    link: "/customers",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    title: "Employees",
    link: "/employees",
    icon: <InboxIcon className="h-5 w-5" />,
  },
  {
    title: "Bookings",
    link: "/booking",
    icon: <UserGroupIcon className="h-5 w-5" />,
  },
  {
    title: "Main Category",
    link: "/maincategory",
    icon: <RectangleStackIcon className="h-5 w-5" />,
  },
  {
    title: "Sub Category",
    link: "/subcategory",
    icon: <TagIcon className="h-5 w-5" />,
  },
  {
    title: "Customer Support",
    link: "/customersupport",
    icon: <PhoneArrowDownLeftIcon className="h-5 w-5" />,
  },
  {
    title: "Custom Notification",
    link: "/customnotification",
    icon: <BellAlertIcon className="h-5 w-5" />,
  },
];


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {

  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar
        sx={{ background: "white", color: "gray" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
          <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          </IconButton>
          <div className="flex justify-between w-full pr-4">
            {!open && (
              <div className="flex items-center gap-4">
                <img src={LAMVLogo} alt="logo" className="w-12 h-fit" />
                <h1 className="font-semibold text-[#0F1C93]"> LAMV Portal</h1>
              </div>
            )}
            {open && <div></div>}
            <div className="flex items-center gap-3">
              <div>
                <h5 className="font-semibold text-gray-800 "> Guest User</h5>
                <p className="text-xs"> admin</p>
              </div>
              <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
        />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            justifyContent: "space-between",
            paddingX: 2,
            fontSize: "16px",
            fontWeight: 600,
          }}
          className="uppercase "
        >
          <div className="flex items-center gap-4">
            <img src={LAMVLogo} alt="logo" className="w-8 h-fit" />
            <h1 className=" font-semibold text-[#0F1C93]"> LAMV Portal</h1>
          </div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              ">"
            ) : (
              <ChevronLeftIcon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
      
      
        <List>
          {tabs.map((item) => (
            <ListItem
              key={item?.title}
              disablePadding
              sx={{
                display: "block",
                background:
                  location.pathname === item?.link ? "#EDF2FD" : "inherit",
                color: location.pathname === item?.link ? "#4880FF" : "inherit",
              }}
            >
              <Link to={item?.link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color:
                        location.pathname === item?.link
                          ? "#4880FF"
                          : "inherit",
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item?.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
          onClick={()=>{
            window.location.href="/"
          }}
            disablePadding
            sx={{ display: "block", background: "inherit", color: "inherit" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}
              >
               <PowerIcon className="h-5 w-5" />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: "60px",
          background: "#F5F6FA",
          height: "100vh",
          transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
          overflowY: "hidden",
          overflowX: "auto",
        //  padding: "20px",
        }}
      >
     
      <Routes>
              <Route path="*" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/maincategory" element={<MainCategory />} />
              <Route path="/subcategory" element={<SubCategory />} />
              <Route
                path="/customnotification"
                element={<CustomNotification />}
              />
            </Routes>
      </Box>
    </Box>
  );
}
