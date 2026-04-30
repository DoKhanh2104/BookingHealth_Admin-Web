import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import SideBar from './Sidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9FAFB' }}>
      {/* 1. Header cố định trên cùng */}
      <Header onToggleSidebar={handleSidebarToggle} />

      {/* 2. Menu bên trái */}
      <SideBar open={sidebarOpen} onClose={handleSidebarClose} />

      {/* 3. Vùng nội dung chính */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0, // Ngăn flex child tràn ra ngoài
          p: { xs: 2, sm: 3 },
          mt: '76px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
