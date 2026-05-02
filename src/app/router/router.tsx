import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import AdminLayout from '../../layouts/AdminLayout';
import ManageUser from '../../pages/manageUser/ManageUser';

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
]);
