// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
let flag = false

const authenticationChildren = flag ? [
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
    ] : [
        {
            id: 'api_register',
            title: 'API 등록',
            type: 'item',
            url: '/authentication/login/apiRegister',
            target: true,
            modal: 'apiRegister'
        }
    ]

const authentication = {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,

            children: authenticationChildren
        }
    ]
};

export default authentication;
