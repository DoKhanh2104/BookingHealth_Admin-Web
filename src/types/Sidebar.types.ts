import type { ListItemButtonProps } from '@mui/material';
import React from 'react';

export interface SidebarItemProps extends ListItemButtonProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  isSubItem?: boolean;
  rightElement?: React.ReactNode;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

