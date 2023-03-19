// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const authentication = {
    id: 'authentication',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/authentication/login/login3',
                    target: true,
                    modal: 'login'
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/authentication/register/register3',
                    target: true,
                    modal: 'register'
                }
            ]
        }
    ]
};

export default authentication;
