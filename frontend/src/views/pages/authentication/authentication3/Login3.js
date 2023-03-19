import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Button, Dialog, Divider, Grid, Stack, Typography, useMediaQuery} from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import {useContext} from "react";
import AuthenticationContext from "../AuthenticationContext";

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const AuthenticationContextValue = useContext(AuthenticationContext);
    const loginOpen = AuthenticationContextValue.loginOpen;
    const setLoginOpen = AuthenticationContextValue.setLoginOpen;
    const registerOpen = AuthenticationContextValue.registerOpen;
    const setRegisterOpen = AuthenticationContextValue.setRegisterOpen;


    const loginClose = () => setLoginOpen(false);

    const loginCloseAndRegisterOpen = () => {
        loginClose();
        setRegisterOpen(true);
    }


    return (
        <Dialog
            open={loginOpen}
            onClose={loginClose}
        >
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '60vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(60vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 3 }}>
                                            <br/>
                                            <Typography variant={"h1"}>KOBOT</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <AuthLogin />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Button
                                                    variant={'text'}
                                                    onClick={loginCloseAndRegisterOpen}
                                                >
                                                    계정이 없으신가요?
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </Dialog>
    );
};

export default Login;
