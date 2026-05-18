import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import AdminLayout from '../../layouts/AdminLayout';
import ManageUser from '../../pages/manage-user/ManageUser';
import ManageSpecialty from '../../pages/manage-specialty/ManageSpecialty';
import ManageClinic from '../../pages/manage-clinic/ManageClinic';
import ManageDoctor from '../../pages/manage-doctor/ManageDoctor';
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
      {
        path: 'manage-specialty',
        element: <ManageSpecialty />,
      },
      {
        path: 'manage-clinic',
        element: <ManageClinic />,
      },
      {
        path: 'manage-doctor',
        element: <ManageDoctor />,
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
