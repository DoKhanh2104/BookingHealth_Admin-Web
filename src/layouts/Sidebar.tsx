// src/layouts/AdminLayout/Sidebar.tsx
import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import type { SidebarItemProps } from '../types/Sidebar.types';

// Import Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 280;

const NavItem = ({ icon, text, active, isSubItem, rightElement, ...props }: SidebarItemProps) => {
  return (
    <ListItemButton
      {...props}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        pl: isSubItem ? 4 : 2,
        bgcolor: active ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
        color: active ? 'primary.main' : 'text.secondary',
        '&:hover': {
          bgcolor: 'rgba(25, 118, 210, 0.12)',
        },
        ...props.sx,
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}>{icon}</ListItemIcon>
      <ListItemText
        primary={text}
        slotProps={{
          primary: {
            sx: {
              fontWeight: active ? 600 : 500,
              fontSize: 14,
            },
          },
        }}
      />
      {rightElement}
    </ListItemButton>
  );
};

export default function Sidebar() {
  const [openSystemMenu, setOpenSystemMenu] = useState(true);

  const handleToggleSystemMenu = () => {
    setOpenSystemMenu(!openSystemMenu);
  };

  const systemMenuItems = [
    { text: 'Quản lý chuyên khoa', icon: <CategoryIcon fontSize="small" /> },
    { text: 'Quản lý cơ sở y tế', icon: <LocalHospitalIcon fontSize="small" /> },
    { text: 'Danh sách bác sĩ', icon: <PeopleIcon fontSize="small" /> },
    { text: 'Quản lý lịch hẹn', icon: <CalendarMonthIcon fontSize="small" /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
        },
      }}
    >
      {/* 1. Khu vực Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <img src="./assets/logo.png" alt="BookingHealth Logo" width={40} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: 'primary.main', letterSpacing: 0.5 }}
        >
          BookingHealth
        </Typography>
      </Box>

      {/* 2. Danh sách Menu */}
      <List sx={{ px: 2 }}>
        {/* Menu 1 */}
        <NavItem icon={<DashboardIcon />} text="Dashboard" active />

        {/* Menu 2 (Có Collapse) */}
        <NavItem
          icon={<SettingsSuggestIcon />}
          text="Quản trị hệ thống"
          onClick={handleToggleSystemMenu}
          rightElement={openSystemMenu ? <ExpandLess /> : <ExpandMore />}
        />

        {/* Danh sách con */}
        <Collapse in={openSystemMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {systemMenuItems.map((item, index) => (
              <NavItem key={index} isSubItem icon={item.icon} text={item.text} />
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
