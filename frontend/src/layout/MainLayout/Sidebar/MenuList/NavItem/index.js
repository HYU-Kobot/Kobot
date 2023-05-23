import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import {LOGIN_TOGGLE, MENU_OPEN, REGISTER_TOGGLE, SET_MENU} from 'store/actions';
import AuthenticationContext from "../../../../../views/pages/authentication/AuthenticationContext";

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import * as React from "react";
import Login from "../../../../../views/pages/authentication/authentication3/Login3";
import Register from "../../../../../views/pages/authentication/authentication3/Register3";
import ApiRegister from "../../../../../views/pages/authentication/authentication3/ApiRegister";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    // const [loginOpen, setLoginOpen] = React.useState(false);
    // const [registerOpen, setRegisterOpen] = React.useState(false);
    const [apiRegisterOpen, setApiRegisterOpen] = React.useState(false);

    const loginOpened = useSelector((state => state.customization.loginOpen));
    const loginToggle = () => {
        dispatch({type: LOGIN_TOGGLE, loginOpen: !loginOpened});
    }

    const registerOpened = useSelector((state => state.customization.registerOpen));
    const RegisterToggle = () => {
        dispatch({type: REGISTER_TOGGLE, registerOpen: !registerOpened});
    }
    console.log(registerOpened);

    const authenticationModalState = {apiRegisterOpen, setApiRegisterOpen};

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }
    if(item.modal){
        listItemProps = {};
    }

    const itemHandler = (id, modal) => {
        if(modal === 'register'){
            RegisterToggle();
        }
        else if(modal === 'login'){
            loginToggle();
        }
        else if(modal === 'apiRegister'){
            setApiRegisterOpen(true)
        }

        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });

    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <ListItemButton
                {...listItemProps}
                disabled={item.disabled}
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
                onClick={() => itemHandler(item.id, item.modal)}
            >
                <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                            {item.title}
                        </Typography>
                    }
                    secondary={
                        item.caption && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {item.caption}
                            </Typography>
                        )
                    }
                />
                {item.chip && (
                    <Chip
                        color={item.chip.color}
                        variant={item.chip.variant}
                        size={item.chip.size}
                        label={item.chip.label}
                        avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                    />
                )}
            </ListItemButton>
            {!loginOpened && <Login/>}
            {!registerOpened && <Register/>}
            <AuthenticationContext.Provider value={authenticationModalState}>
                <ApiRegister/>
            </AuthenticationContext.Provider>
        </>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
