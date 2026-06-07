import { useState } from 'react';
import { useTranslation } from '../libs/i18n.hooks';
import type { NavMenuItem } from '../types/Sidebar.types';
import React from 'react';
import {
  Category as CategoryIcon,
  LocalHospital as LocalHospitalIcon,
  People as PeopleIcon,
  // HomeRepairService as HomeRepairServiceIcon,
  CalendarMonth as CalendarMonthIcon,
  Schedule as ScheduleIcon,
  Accessible as AccessibleIcon,
  Games as GamesIcon,
  NotificationsActive as NotificationsActiveIcon,
  // AppSettingsAlt as AppSettingsAltIcon,
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
      path: '/manage-clinic',
    },
    {
      text: tSidebar('medicalManagement.doctorList'),
      icon: React.createElement(PeopleIcon, { fontSize: 'small' }),
      path: '/manage-doctor',
    },
    // {
    //   text: tSidebar('medicalManagement.serviceCatalog'),
    //   icon: React.createElement(HomeRepairServiceIcon, { fontSize: 'small' }),
    // },
  ];

  const operationMenuItems: NavMenuItem[] = [
    {
      text: tSidebar('operationManagement.appointmentManagement'),
      icon: React.createElement(CalendarMonthIcon, { fontSize: 'small' }),
      path: '/manage-appointment',
    },
    {
      text: tSidebar('operationManagement.workScheduleManagement'),
      icon: React.createElement(ScheduleIcon, { fontSize: 'small' }),
      path: '/manage-schedule',
    },
    {
      text: tSidebar('operationManagement.patientList'),
      icon: React.createElement(AccessibleIcon, { fontSize: 'small' }),
      path: '/manage-patient',
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
      path: '/manage-notification',
    },
    // {
    //   text: tSidebar('systemAdministration.configurationManagement'),
    //   icon: React.createElement(AppSettingsAltIcon, { fontSize: 'small' }),
    // },
    {
      text: tSidebar('systemAdministration.reportManagement'),
      icon: React.createElement(SummarizeIcon, { fontSize: 'small' }),
      path: '/manage-report',
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
