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

/** Shared CardHeader sx — tránh lặp lại ở mỗi sub-component */
export const getCardHeaderSx = (theme: Theme): SxProps<Theme> => ({
  px: { xs: 2, sm: 3, md: 4 },
  color: theme.palette.text.primary,
});

/** Shared CardContent center layout */
export const cardContentCenterSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  py: 4,
  // Đảm bảo chart/content không tràn ra ngoài
  overflow: 'hidden',
  '& > *': {
    maxWidth: '100%',
  },
};

/** Time filter dropdown style */
export const getTimeFilterSx = (): SxProps<Theme> => ({
  minWidth: { xs: 140, sm: 200 },
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    background: (theme: Theme) => alpha(theme.palette.background.paper, 0.8),
  },
  '& .MuiSelect-select': {
    py: '8px',
    fontSize: '0.875rem',
  },
});

export const titleCardSx: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: { xs: 12, sm: 16, md: 20 },
};
