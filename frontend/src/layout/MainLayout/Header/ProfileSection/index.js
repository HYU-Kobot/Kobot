
import {useDispatch, useSelector} from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Chip,
} from '@mui/material';


// project imports
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconSettings } from '@tabler/icons';
import Login from "../../../../views/pages/authentication/authentication3/Login3";
import AuthenticationContext from "../../../../views/pages/authentication/AuthenticationContext";
import Register from "../../../../views/pages/authentication/authentication3/Register3";
import * as React from "react";
import {useContext} from "react";
import Context from "../../../../Context";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();

    const ContextValue = useContext(Context);
    const loginState = ContextValue.loginState;
    const setLoginState = ContextValue.setLoginState;

    const [loginOpen, setLoginOpen] = React.useState(false);
    const [registerOpen, setRegisterOpen] = React.useState(false);

    const authenticationModalState = {loginOpen, setLoginOpen, registerOpen, setRegisterOpen};

    const handleToggle = () => {
        setLoginOpen(true);
    };

    const LogOut = () => {
        localStorage.removeItem('loginToken')
        setLoginState(false)
        alert('로그아웃 되었습니다.')
    }

    const HeaderChip = (loginState) => {
        if(loginState === true){
            return (
                <>
                    <Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            borderColor: theme.palette.primary.light,
                            backgroundColor: theme.palette.primary.light,
                        }}
                        label={"환영합니다!"}
                        variant="outlined"
                        color="primary"
                    />
                    <Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            borderColor: theme.palette.error.light,
                            backgroundColor: theme.palette.error.light,
                        }}
                        label={"로그아웃"}
                        variant="outlined"
                        color="error"
                        onClick={LogOut}
                    />
                    <AuthenticationContext.Provider value={authenticationModalState}>
                        <Login/>
                        <Register/>
                    </AuthenticationContext.Provider>
                </>
            );
        }
        else{
            return (
                <>
                    <Chip
                        sx={{
                            height: '48px',
                            alignItems: 'center',
                            borderRadius: '27px',
                            transition: 'all .2s ease-in-out',
                            borderColor: theme.palette.primary.light,
                            backgroundColor: theme.palette.primary.light
                        }}
                        
                        label={"로그인 해주세요"}
                        variant="outlined"
                        onClick={handleToggle}
                        color="error"
                    />
                    <AuthenticationContext.Provider value={authenticationModalState}>
                        <Login/>
                        <Register/>
                    </AuthenticationContext.Provider>
                </>
            );
        }
    }

    return(
        <>
            {HeaderChip(loginState)}
        </>
    )



};

export default ProfileSection;
