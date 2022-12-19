import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { usePath } from "hookrouter";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";
import "./topbar.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

export default function Topbar() {
  const location = useLocation();
  const menu = [
    { path: "/app/dashboard/", title: "Dashboard" },
    { path: "/app/product/", title: "Product" },
    { path: "/app/productCategories/", title: "Product Categories" },
    { path: "/app/brands/", title: "Brands" },
    { path: "/app/product/create_product/", title: "Create Product" },
    {
      path: "/app/productCategories/create_productcategory/",
      title: "Create Product Categories",
    },
    { path: "/app/brands/create_brand/", title: "Create Brand" },
  ];

  const [title, setTitle] = React.useState({ path: "", title: "" });
  const navigate = useNavigate();
  useEffect(() => {
    setTitle(menu.find((e) => e.path === location.pathname));
  }, [navigate]);

  const matches = useMediaQuery("(min-width:600px)");
  const [expanded, setExpanded] = React.useState(false);
  const productSubMenu = [
    {
      name: "Product",
      route: "product",
    },
    {
      name: "Product Categories",
      route: "productCategories",
    },
    {
      name: "Brands",
      route: "brands",
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setExpanded(!expanded)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            {title.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        // ModalProps={{
        //   keepMounted: true, // Better open performance on mobile.
        // }}
        anchor='left'
        variant={"permanent"}
        open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <RouterLink to={"/app/dashboard/"}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary='Dashboard'
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </RouterLink>
          </ListItem>
          {open ? (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'>
                <Typography sx={{ width: "33%", ml: "50px", flexShrink: 0 }}>
                  Products
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {productSubMenu.map((txt, i) => {
                  return (
                    <>
                      <RouterLink to={`/app/${txt.route}/`}>
                        <ListItem disablePadding sx={{ display: "block" }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                            }}>
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                              }}>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={txt.name}
                              sx={{ opacity: open ? 1 : 0 }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </RouterLink>
                    </>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ) : (
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              className={matches ? "dropdown" : ""}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
                class='dropbtn'>
                <div class='dropdown-content'>
                  {productSubMenu.map((txt, i) => {
                    return (
                      <>
                        <RouterLink to={`/app/${txt.route}/`}>
                          <Typography>{txt.name}</Typography>
                        </RouterLink>
                      </>
                    );
                  })}
                </div>
                <AddShoppingCartIcon />
              </ListItemIcon>
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
