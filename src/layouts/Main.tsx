import { Box } from '@mui/material';
import type { MainLayoutProps } from '../types/Main.types';

const Main = ({ children, sx, ...other }: MainLayoutProps) => {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        px: { xs: 2, sm: 3, md: 4 },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};

export default Main;
