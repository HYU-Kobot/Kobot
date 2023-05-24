// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import BackTestContext from "../../../../views/back-test/BackTestContext";
import Context from "../../../../Context";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const ContextValue = useContext(Context);
    const loginState = ContextValue.loginState;

    let loginItemList = [];

    if(loginState === false){ // log out
        loginItemList = menuItem.items.slice(0,4);

    }
    else{ // log in
        const temp1 = menuItem.items.slice(0,3);
        const temp2 = menuItem.items.slice(4,5);
        loginItemList = loginItemList.concat(temp1, temp2);
    }

    const navItems = loginItemList.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
