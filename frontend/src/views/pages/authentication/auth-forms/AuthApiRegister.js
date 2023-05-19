import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Autocomplete} from "@mui/lab";
import * as React from "react";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthApiRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const market_list = ["업비트", "빗썸", "바이낸스"];



    const initialValues = {
            api_key: '',
            secret_key: '',
            other: '',
            market: '',
            submit: null
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h4">API KEY 등록</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    api_key: Yup.string().max(255).required('Api Key 는 필수 입력 사항입니다.'),
                    secret_key: Yup.string().max(255).required('Secret key 는 필수 입력 사항입니다.'),
                    market: Yup.string().required('거래소는 필수 입력 사항입니다.')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log(values)
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values , setFieldValue}) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>

                        <FormControl fullWidth error={Boolean(touched.market && errors.market)} sx={{ ...theme.typography.customInput }}>
                            <Autocomplete
                                id="market_select"
                                options={market_list}
                                style={{textAlign:"right"}}
                                onChange={(e, value) => setFieldValue("market", value !== null ? value : initialValues.market)}
                                renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} label={"거래소를 선택해주세요."} fullWidth style={{textAlign:"center"}} />}
                            />
                            {touched.market && errors.market && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.market}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.api_key && errors.api_key)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-api_key-register">Api Key 를 입력해주세요.</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-api_key-register"
                                type="api_key"
                                value={values.api_key}
                                name="api_key"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.api_key && errors.api_key && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.api_key}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.secret_key && errors.secret_key)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-secret_key-register">Secret Key 를 입력해주세요.</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-secret_key-register"
                                type='secret_key'
                                value={values.secret_key}
                                name="secret_key"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}

                                inputProps={{}}
                            />
                            {touched.secret_key && errors.secret_key && (
                                <FormHelperText error id="standard-weight-helper-text-secret_key-register">
                                    {errors.secret_key}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-other-register">추가 키를 입력해주세요.</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-other-register"
                                type='other'
                                value={values.other}
                                name="other"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}

                                inputProps={{}}
                            />
                        </FormControl>

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    API KEY 등록
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthApiRegister;
