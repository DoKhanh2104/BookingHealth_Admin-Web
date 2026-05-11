import React, { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[]; // Có thể thêm tính năng giới hạn role sau này
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Chuyển hướng về login và lưu lại đường dẫn cũ để redirect lại sau khi login thành công (nếu cần)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu có truyền allowedRoles vào thì kiểm tra thêm role của user
  if (allowedRoles && allowedRoles.length > 0 && role) {
    if (!allowedRoles.includes(role)) {
      // Nếu không có quyền, đá ra trang 404 hoặc trang báo lỗi không đủ quyền
      return <Navigate to="/404" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
