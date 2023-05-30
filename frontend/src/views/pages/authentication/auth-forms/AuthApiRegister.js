import {useState, useEffect, useContext} from 'react';
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
import axios from "axios";
import Context from "../../../../Context";
import AuthenticationContext from "../AuthenticationContext";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const AuthApiRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const exchange_list = ["UPBIT", "빗썸", "바이낸스"];

    const AuthenticationContextValue = useContext(AuthenticationContext);
    const apiRegisterOpen = AuthenticationContextValue.apiRegisterOpen;
    const setApiRegisterOpen = AuthenticationContextValue.setApiRegisterOpen;


    const ContextValue = useContext(Context);
    const setLoginState = ContextValue.setLoginState;


    const initialValues = {
            accessKey: '',
            secretKey: '',
            other: '',
            exchange: '',
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
                    accessKey: Yup.string().max(255).required('Api Key 는 필수 입력 사항입니다.'),
                    secretKey: Yup.string().max(255).required('Secret key 는 필수 입력 사항입니다.'),
                    exchange: Yup.string().required('거래소는 필수 입력 사항입니다.')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios.post('http://172.17.70.55:8080/api/key', {
                            accessKey: values.accessKey,
                            secretKey: values.secretKey,
                            other: values.other,
                            exchange: values.exchange,
                        },{
                            headers : {
                                'Authorization' : 'Bearer ' + localStorage.getItem('loginToken')
                            }
                        }).catch(function (err){
                            console.log(err.response.data.message);
                            if(err.response.data.message === 'notValidToken'){
                                setLoginState(false)
                                localStorage.removeItem('loginToken')
                                alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
                            }
                            else{
                                if(err.response.data.message === '401 Unauthorized: \"{\"error\":{\"message\":\"This access key is incorrect.\",\"name\":\"invalid_access_key\"}}\"'){
                                    alert('유효하지 않은 키 값입니다.')
                                }
                                else{
                                    alert(err.response.data.message);
                                }
                            }

                        }).then(function (response){
                            console.log(response.data)
                            setApiRegisterOpen(false)
                            alert('API키가 등록되었습니다!')
                        })
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

                        <FormControl fullWidth error={Boolean(touched.exchange && errors.exchange)} sx={{ ...theme.typography.customInput }}>
                            <Autocomplete
                                id="exchange_select"
                                options={exchange_list}
                                style={{textAlign:"right"}}
                                onChange={(e, value) => setFieldValue("exchange", value !== null ? value : initialValues.exchange)}
                                renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} label={"거래소를 선택해주세요."} fullWidth style={{textAlign:"center"}} />}
                            />
                            {touched.exchange && errors.exchange && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.exchange}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.accessKey && errors.accessKey)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-accessKey-register">Api Key 를 입력해주세요.</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-accessKey-register"
                                type="accessKey"
                                value={values.accessKey}
                                name="accessKey"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.accessKey && errors.accessKey && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.accessKey}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.secretKey && errors.secretKey)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-secretKey-register">Secret Key 를 입력해주세요.</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-secretKey-register"
                                type='secretKey'
                                value={values.secretKey}
                                name="secretKey"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                                inputProps={{}}
                            />
                            {touched.secretKey && errors.secretKey && (
                                <FormHelperText error id="standard-weight-helper-text-secretKey-register">
                                    {errors.secretKey}
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
