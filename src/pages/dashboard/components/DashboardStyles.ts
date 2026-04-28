import { alpha, type Theme, type SxProps } from '@mui/material';

export const getDashboardCardSx = (theme: Theme): SxProps<Theme> => {
  const mainColor = theme.palette.primary.main;
  return {
    borderRadius: 4,
    height: '100%',
    boxShadow: `0 0 2px 0 ${alpha(mainColor, 0.2)}, 0 12px 24px -4px ${alpha(mainColor, 0.12)}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 0 2px 0 ${alpha(mainColor, 0.2)}, 0 20px 40px -4px ${alpha(mainColor, 0.16)}`,
      borderColor: alpha(mainColor, 0.3),
    },
  };
};
