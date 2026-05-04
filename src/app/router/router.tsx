import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import AdminLayout from '../../layouts/AdminLayout';
import ManageUser from '../../pages/manage-user/ManageUser';
import PageNotFound from '../../pages/error/PageNotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
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
    path: '*',
    element: <PageNotFound />,
  },
]);
