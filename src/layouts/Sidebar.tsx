import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GradientText } from '../components/GradientText';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import type { SidebarItemProps, SidebarProps } from '../types/Sidebar.types';
import { DRAWER_WIDTH } from './layoutConstants';

// Import Icons
import {
  Dashboard as DashboardIcon,
  SettingsSuggest as SettingsSuggestIcon,
  ExpandLess,
  ExpandMore,
  MedicalServices as MedicalServicesIcon,
  AccountTree as AccountTreeIcon,
} from '@mui/icons-material';
import { useSidebarHooks } from '../hooks/Sidebar';

const NavItem = ({
  icon,
  text,
  active,
  isSubItem,
  rightElement,
  path,
  ...props
}: SidebarItemProps) => {
  const location = useLocation();
  const isActive = active !== undefined ? active : path ? location.pathname === path : false;

  return (
    <ListItemButton
      component={path ? RouterLink : 'div'}
      {...(path ? { to: path } : {})}
      {...props}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        pl: isSubItem ? 4 : 2,
        bgcolor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
        color: isActive ? 'primary.main' : 'text.secondary',
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
            fontWeight: isActive ? 600 : 500,
            fontSize: 14,
          },
        }}
      />
      {rightElement}
    </ListItemButton>
  );
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const {
    tSidebar,
    openSystemMenu,
    openMedicalMenu,
    openOperationMenu,
    handleToggleSystemMenu,
    handleToggleMedicalMenu,
    handleToggleOperationMenu,
    medicalMenuItems,
    operationMenuItems,
    systemMenuItems,
  } = useSidebarHooks();

  const drawerContent = (
    <>
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
        <NavItem icon={<DashboardIcon />} text={tSidebar('title.dashboard')} path="/" />

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
              <NavItem key={index} isSubItem icon={item.icon} text={item.text} path={item.path} />
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
              <NavItem key={index} isSubItem icon={item.icon} text={item.text} path={item.path} />
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
              <NavItem key={index} isSubItem icon={item.icon} text={item.text} path={item.path} />
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );

  // Desktop: permanent drawer
  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: '#fff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Mobile/Tablet: temporary drawer with overlay
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#fff',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
