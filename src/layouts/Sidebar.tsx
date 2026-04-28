import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import { GradientText } from '../components/GradientText';
import type { SidebarItemProps } from '../types/Sidebar.types';

// Import Icons
import {
  Dashboard as DashboardIcon,
  SettingsSuggest as SettingsSuggestIcon,
  LocalHospital as LocalHospitalIcon,
  People as PeopleIcon,
  CalendarMonth as CalendarMonthIcon,
  Category as CategoryIcon,
  ExpandLess,
  ExpandMore,
  MedicalServices as MedicalServicesIcon,
  AccountTree as AccountTreeIcon,
  HomeRepairService as HomeRepairServiceIcon,
  Schedule as ScheduleIcon,
  Accessible as AccessibleIcon,
  Games as GamesIcon,
  NotificationsActive as NotificationsActiveIcon,
  AppSettingsAlt as AppSettingsAltIcon,
  Summarize as SummarizeIcon,
} from '@mui/icons-material';
import { useSidebarHooks } from '../hooks/Sidebar';

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
        primaryTypographyProps={{
          sx: {
            fontWeight: active ? 600 : 500,
            fontSize: 14,
          },
        }}
      />
      {rightElement}
    </ListItemButton>
  );
};

export default function Sidebar() {
  const [openSystemMenu, setOpenSystemMenu] = useState(false);
  const [openMedicalMenu, setOpenMedicalMenu] = useState(false);
  const [openOperationMenu, setOpenOperationMenu] = useState(false);

  const { tSidebar } = useSidebarHooks();

  const handleToggleSystemMenu = () => {
    setOpenSystemMenu(!openSystemMenu);
  };

  const handleToggleMedicalMenu = () => {
    setOpenMedicalMenu(!openMedicalMenu);
  };

  const handleToggleOperationMenu = () => {
    setOpenOperationMenu(!openOperationMenu);
  };

  const medicalMenuItems = [
    {
      text: tSidebar('medicalManagement.specialtyManagement'),
      icon: <CategoryIcon fontSize="small" />,
    },
    {
      text: tSidebar('medicalManagement.clinicManagement'),
      icon: <LocalHospitalIcon fontSize="small" />,
    },
    { text: tSidebar('medicalManagement.doctorList'), icon: <PeopleIcon fontSize="small" /> },
    {
      text: tSidebar('medicalManagement.serviceCatalog'),
      icon: <HomeRepairServiceIcon fontSize="small" />,
    },
  ];

  const operationMenuItems = [
    {
      text: tSidebar('operationManagement.appointmentManagement'),
      icon: <CalendarMonthIcon fontSize="small" />,
    },
    {
      text: tSidebar('operationManagement.workScheduleManagement'),
      icon: <ScheduleIcon fontSize="small" />,
    },
    {
      text: tSidebar('operationManagement.patientList'),
      icon: <AccessibleIcon fontSize="small" />,
    },
  ];

  const systemMenuItems = [
    {
      text: tSidebar('systemAdministration.userManagement'),
      icon: <GamesIcon fontSize="small" />,
    },
    {
      text: tSidebar('systemAdministration.notificationManagement'),
      icon: <NotificationsActiveIcon fontSize="small" />,
    },
    {
      text: tSidebar('systemAdministration.configurationManagement'),
      icon: <AppSettingsAltIcon fontSize="small" />,
    },
    {
      text: tSidebar('systemAdministration.reportManagement'),
      icon: <SummarizeIcon fontSize="small" />,
    },
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
        <GradientText variant="h6" sx={{ letterSpacing: 0.5 }}>
          BookingHealth
        </GradientText>
      </Box>

      {/* 2. Danh sách Menu */}
      <List sx={{ px: 2 }}>
        {/* Menu 1 */}
        <NavItem icon={<DashboardIcon />} text={tSidebar('title.dashboard')} active />

        {/* Menu 2 (Có Collapse) */}
        {/* Quản lý y tế */}
        <NavItem
          icon={<MedicalServicesIcon />}
          text={tSidebar('title.medicalManagement')}
          onClick={handleToggleMedicalMenu}
          rightElement={openMedicalMenu ? <ExpandLess /> : <ExpandMore />}
        />

        <Collapse in={openMedicalMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {medicalMenuItems.map((item, index) => (
              <NavItem key={index} isSubItem icon={item.icon} text={item.text} />
            ))}
          </List>
        </Collapse>

        {/* Quản lý vận hành */}
        <NavItem
          icon={<AccountTreeIcon />}
          text={tSidebar('title.operationManagement')}
          onClick={handleToggleOperationMenu}
          rightElement={openOperationMenu ? <ExpandLess /> : <ExpandMore />}
        />

        <Collapse in={openOperationMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {operationMenuItems.map((item, index) => (
              <NavItem key={index} isSubItem icon={item.icon} text={item.text} />
            ))}
          </List>
        </Collapse>

        {/* Quản lý hệ thống */}
        <NavItem
          icon={<SettingsSuggestIcon />}
          text={tSidebar('title.systemAdministration')}
          onClick={handleToggleSystemMenu}
          rightElement={openSystemMenu ? <ExpandLess /> : <ExpandMore />}
        />

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
