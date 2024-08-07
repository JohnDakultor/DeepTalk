import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Switch, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { LogoutOutlined } from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';
import authService from '../../services/Axios';
import { useAuth } from "../../services/Authentication";
import { Link } from "react-router-dom";

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function ProductDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [logOut, setLogOut] = useState(false)
  
  const auth = useAuth()

  const productPages = [
    {name: "Dashboard", path:"/dashboard"},
    {name: "Talk", path:"/talk"},
    {name: "Log", path:"/log"},
    {name: "Notifications", path:"/notifications"},
    {name: "Settings", path: "/settings"}
  ]

  const handleLogout = async () =>{
    try{
      await auth.logout();
      setLogOut(true);
    }catch(error){
      console.log(error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <AdbIcon />
          <Typography variant="h6" noWrap component="div">
            My App
          </Typography>
        </Toolbar>
      </AppBar>
     <Drawer
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'hidden',
    },
  }}
  variant="persistent"
  anchor="left"
  open={open}
>
  <DrawerHeader>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  </DrawerHeader>
  <Divider />
  <List>
    {productPages.map((page, index) => (
      <ListItem key={index} disablePadding>
        <ListItemButton disableRipple sx={{":hover":{color:"black", textDecoration:"underline"}}} component={Link} to={page.path}>
          <ListItemIcon>
            {index === 0 && <DashboardIcon color='primary' />} 
            {index === 1 && <RecordVoiceOverIcon color='primary' />}
            {index === 2 && <HistoryIcon color='primary' />}
            {index === 3 && <NotificationsIcon color='primary' />}
            {index === 4 && <SettingsIcon color='primary' />}
          </ListItemIcon>
          <ListItemText primary={page.name} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
  <Divider />
  <List>
    <ListItem>
      <ListItemText primary="Night Mode" />
      <Switch />
    </ListItem> 
  </List>
  <Divider />
  <List>
    <ListItem onClick={handleLogout}>
      <ListItemButton sx={{border: "1px solid black", borderRadius:"20px"}}>
        <ListItemIcon>
          <LogoutOutlined color='primary' />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
  </List>
</Drawer>
      {/* <Main open={open}>
        <DrawerHeader />
        
      </Main> */}
    </Box>
  );
}
