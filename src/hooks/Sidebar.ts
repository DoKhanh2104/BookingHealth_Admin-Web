import { useState } from 'react';
import { useTranslation } from '../libs/i18n.hooks';
import type { NavMenuItem } from '../types/Sidebar.types';
import React from 'react';
import {
  Category as CategoryIcon,
  LocalHospital as LocalHospitalIcon,
  People as PeopleIcon,
  HomeRepairService as HomeRepairServiceIcon,
  CalendarMonth as CalendarMonthIcon,
  Schedule as ScheduleIcon,
  Accessible as AccessibleIcon,
  Games as GamesIcon,
  NotificationsActive as NotificationsActiveIcon,
  AppSettingsAlt as AppSettingsAltIcon,
  Summarize as SummarizeIcon,
} from '@mui/icons-material';

export const useSidebarHooks = () => {
  const tSidebar = useTranslation('Sidebar');

  const [openSystemMenu, setOpenSystemMenu] = useState(false);
  const [openMedicalMenu, setOpenMedicalMenu] = useState(false);
  const [openOperationMenu, setOpenOperationMenu] = useState(false);

  const handleToggleSystemMenu = () => {
    setOpenSystemMenu(!openSystemMenu);
  };

  const handleToggleMedicalMenu = () => {
    setOpenMedicalMenu(!openMedicalMenu);
  };

  const handleToggleOperationMenu = () => {
    setOpenOperationMenu(!openOperationMenu);
  };

  const medicalMenuItems: NavMenuItem[] = [
    {
      text: tSidebar('medicalManagement.specialtyManagement'),
      icon: React.createElement(CategoryIcon, { fontSize: 'small' }),
      path: '/manage-specialty',
    },
    {
      text: tSidebar('medicalManagement.clinicManagement'),
      icon: React.createElement(LocalHospitalIcon, { fontSize: 'small' }),
    },
    {
      text: tSidebar('medicalManagement.doctorList'),
      icon: React.createElement(PeopleIcon, { fontSize: 'small' }),
    },
    {
      text: tSidebar('medicalManagement.serviceCatalog'),
      icon: React.createElement(HomeRepairServiceIcon, { fontSize: 'small' }),
    },
  ];

  const operationMenuItems: NavMenuItem[] = [
    {
      text: tSidebar('operationManagement.appointmentManagement'),
      icon: React.createElement(CalendarMonthIcon, { fontSize: 'small' }),
    },
    {
      text: tSidebar('operationManagement.workScheduleManagement'),
      icon: React.createElement(ScheduleIcon, { fontSize: 'small' }),
    },
    {
      text: tSidebar('operationManagement.patientList'),
      icon: React.createElement(AccessibleIcon, { fontSize: 'small' }),
    },
  ];

  const systemMenuItems: NavMenuItem[] = [
    {
      text: tSidebar('systemAdministration.userManagement'),
      icon: React.createElement(GamesIcon, { fontSize: 'small' }),
      path: '/user-management',
    },
    {
      text: tSidebar('systemAdministration.notificationManagement'),
      icon: React.createElement(NotificationsActiveIcon, { fontSize: 'small' }),
    },
    {
      text: tSidebar('systemAdministration.configurationManagement'),
      icon: React.createElement(AppSettingsAltIcon, { fontSize: 'small' }),
    },
    {
      text: tSidebar('systemAdministration.reportManagement'),
      icon: React.createElement(SummarizeIcon, { fontSize: 'small' }),
    },
  ];

  return {
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
  };
};
