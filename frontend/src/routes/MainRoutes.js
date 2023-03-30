import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import BackTest from "../views/back-test";

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// portfolios routing
const PortfolioTypography = Loadable(lazy(() => import('views/portfolios')));
const UtilsColor = Loadable(lazy(() => import('views/portfolios/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/portfolios/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/portfolios/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/portfolios/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/back-test')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'portfolios',
            children: [
                {
                    path: 'portfolio-typography',
                    element: <PortfolioTypography />
                }
            ]
        },
        {
            path: 'portfolios',
            children: [
                {
                    path: 'portfolio-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'portfolios',
            children: [
                {
                    path: 'portfolio-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'back-test',
            element: <BackTest />
        }
    ]
};

export default MainRoutes;
