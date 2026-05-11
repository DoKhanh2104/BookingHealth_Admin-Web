import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import AdminLayout from '../../layouts/AdminLayout';
import ManageUser from '../../pages/manage-user/ManageUser';
import PageNotFound from '../../pages/error/PageNotFound';
import AuthLayout from '../../layouts/AuthLayout';
import Login from '../../pages/auth/Login';
import AuthGuard from '../../components/common/AuthGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard allowedRoles={['ROLE_ADMIN', 'ADMIN']}>
        <AdminLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'user-management',
        element: <ManageUser />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
