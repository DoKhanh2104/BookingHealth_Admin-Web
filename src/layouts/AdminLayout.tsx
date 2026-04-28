import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './Sidebar';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* 1. Header cố định trên cùng */}
      <Header />

      {/* 2. Menu bên trái */}
      <SideBar />

      {/* 3. Vùng nội dung chính */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '76px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
