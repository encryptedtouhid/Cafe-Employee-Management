
import { Navigate } from 'react-router-dom';

// Welcome Page
import WelcomePage from './pages/WelcomePage';

// Cafe Pages
import CafeListPage from './pages/cafe/CafeListPage';
import AddCafePage from './pages/cafe/AddCafePage';
import EditCafePage from './pages/cafe/EditCafePage';

// Employee Pages
import EmployeeListPage from './pages/employee/EmployeeListPage';
import AddEmployeePage from './pages/employee/AddEmployeePage';
import EditEmployeePage from './pages/employee/EditEmployeePage';

/**
 * Application routes configuration
 */
const routes = [
    // Welcome page as default
    {
        path: '/',
        element: <WelcomePage />,
    },

    // Cafe routes
    {
        path: '/cafes',
        element: <CafeListPage />,
    },
    {
        path: '/cafe/add',
        element: <AddCafePage />,
    },
    {
        path: '/cafe/edit/:id',
        element: <EditCafePage />,
    },

    // Employee routes
    {
        path: '/employees',
        element: <EmployeeListPage />,
    },
    {
        path: '/employee/add',
        element: <AddEmployeePage />,
    },
    {
        path: '/employee/edit/:id',
        element: <EditEmployeePage />,
    },

    // Catch-all route - redirect to welcome page
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
];

export default routes;