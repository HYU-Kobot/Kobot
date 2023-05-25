// material-ui
import { useTheme } from '@mui/material/styles';
import {Button, Dialog, Divider, Grid, Stack, Typography, useMediaQuery} from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthRegister from '../auth-forms/AuthRegister';
import AuthFooter from 'ui-component/cards/AuthFooter';
import {useContext} from "react";
import AuthenticationContext from "../AuthenticationContext";
import AuthApiRegister from "../auth-forms/AuthApiRegister";

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const ApiRegister = () => {
    const theme = useTheme();


    const AuthenticationContextValue = useContext(AuthenticationContext);
    const apiRegisterOpen = AuthenticationContextValue.apiRegisterOpen;
    const setApiRegisterOpen = AuthenticationContextValue.setApiRegisterOpen;


    const apiRegisterClose = () => setApiRegisterOpen(false);

    return (
        <Dialog
            open={apiRegisterOpen}
            onClose={apiRegisterClose}
        >
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '60vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(60vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 3 }}>
                                            <Typography variant={"h1"}>KOBOT</Typography>
                                        </Grid>
                                        <Grid item sx={{ mb: 3 }}>
                                            <Typography variant={"h4"}>13.209.2.199로 아이피를 입력하고 등록해주세요.</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <AuthApiRegister />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </Dialog>
    );
};

export default ApiRegister;
