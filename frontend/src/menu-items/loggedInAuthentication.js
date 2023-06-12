// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const loggedInAuthentication = {
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
                    id: 'api_register',
                    title: 'API 등록',
                    type: 'item',
                    url: '/authentication/login/apiRegister',
                    target: true,
                    modal: 'apiRegister'
                }
            ]
        }
    ]
};

export default loggedInAuthentication;
