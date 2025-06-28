import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CssBaseline from '@mui/material/CssBaseline';

import GoogleAuth from '../GoogleAuth';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const navItems = [
    ...(isSignedIn ? [{ label: 'Create Stream', to: '/streams/new' }] : []),
    { label: 'Auth', react: <GoogleAuth /> },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{ my: 2, color: 'inherit', textDecoration: 'none', display: 'block' }}
      >
        BeamHarbor
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label || 'auth'} disablePadding>
            {item.to ? (
              <ListItemButton component={Link} to={item.to} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : item.external ? (
              <ListItemButton component="a" href={item.href} sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton sx={{ justifyContent: 'center' }}>{item.react}</ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#fff', textDecoration: 'none' } }}
          >
            BeamHarbor
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navItems.map((item) =>
              item.to ? (
                <Button key={item.label} component={Link} to={item.to} sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff' } }}>
                  {item.label}
                </Button>
              ) : item.external ? (
                <Button key={item.label} component="a" href={item.href} sx={{ color: '#fff', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)', color: '#fff' } }} target="_blank">
                  {item.label}
                </Button>
              ) : (
                <Box key="auth">{item.react}</Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
