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
            // icon: icons.IconTypography,
            breadcrumbs: false
        }
        // ,
        // {
        //     id: 'bot2',
        //     title: 'Bot-2',
        //     type: 'item',
        //     url: '/portfolios/portfolio-color',
        //     // icon: icons.IconPalette,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'add-bot',
        //     title: 'Add Bot',
        //     type: 'item',
        //     url: '/portfolios/portfolio-shadow',
        //     // icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     // icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // },
        // {
        //     id: 'portfolio',
        //     title: 'Portfolio',
        //     type: 'collapse',
        //     // icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default portfolio;
