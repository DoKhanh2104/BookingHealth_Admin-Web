import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/dashboard/Dashboard';
import AdminLayout from '../../layouts/AdminLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
