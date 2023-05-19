import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthApiRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/ApiRegister')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/authentication/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/authentication/register/register3',
            element: <AuthRegister3 />
        },
        {
            path: '/authentication/register/apiRegister',
            element: <AuthApiRegister />
        }
    ]
};

export default AuthenticationRoutes;
