// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const portfolio = {
    id: 'portfolio',
    title: 'Portfolio',
    type: 'group',
    children: [
        {
            id: 'portfolio',
            title: 'portfolio',
            type: 'item',
            url: '/portfolios/portfolio-typography',
            breadcrumbs: false,
            modal: false
        }
    ]
};

export default portfolio;
