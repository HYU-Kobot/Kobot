// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

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

            children: [
                {
                    id: 'login3',
                    title: '로그인',
                    type: 'item',
                    url: '/authentication/login/login3',
                    target: true,
                    modal: 'login'
                },
                {
                    id: 'register3',
                    title: '회원가입',
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
