import {
    Avatar, Box,
    Button,
    Card,
    Divider,
    FormControl, FormHelperText,
    Grid, IconButton, InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

import * as React from "react";
import SubCard from "../../ui-component/cards/SubCard";
import {useContext, useState} from "react";
import BackTestContext from "./BackTestContext";
import axios from "axios";
import StatModal from "./StatModal";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import {Formik} from "formik";
import useScriptRef from "../../hooks/useScriptRef";
import {useTheme} from "@mui/material/styles";

const StrategyParameterComponent = ({strategy}) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    // const [lowerMovingAverage, setLowerMovingAverage] = useState(50);
    // const [upperMovingAverage, setUpperMovingAverage] = useState(50);
    // const [upperK, setUpperK] = useState(0.2);
    // const [lowerK, setLowerK] = useState(0.2);
    // const [riskRate, setRiskRate] = useState(10);


    const BackTestContextValue = useContext(BackTestContext);
    const pair = BackTestContextValue.pair;
    const setPair = BackTestContextValue.setPair;
    const timeframe = BackTestContextValue.timeframe;
    const setTimeframe = BackTestContextValue.setTimeframe;
    const startDate = BackTestContextValue.startDate;
    const setStartDate = BackTestContextValue.setStartDate;
    const endDate = BackTestContextValue.endDate;
    const setEndDate = BackTestContextValue.setEndDate;
    const html = BackTestContextValue.html;
    const setHtml = BackTestContextValue.setHtml;
    const orderList = BackTestContextValue.orderList;
    const setOrderList = BackTestContextValue.setOrderList;
    const statOpen = BackTestContextValue.statOpen;
    const setStatOpen = BackTestContextValue.setStatOpen;
    const backTestLoading = BackTestContextValue.backTestLoading;
    const setBackTestLoading = BackTestContextValue.setBackTestLoading;

    console.log(backTestLoading)


    switch (strategy){
        case "볼린저밴드":
            return(
                <Grid xs={12} sm={12}>
                    <Divider sx={{ my: 1.5 }} />

                    <Formik
                        initialValues={{
                            lowerMovingAverage: 50,
                            upperMovingAverage: 50,
                            lowerK: 0.2,
                            upperK : 0.2,
                            riskRate: 10,
                        }}
                        validationSchema={Yup.object().shape({
                            lowerMovingAverage: Yup.number().min(2,'이동평균선 기간은 2 에서 300 사이의 수입니다.').max(300,'이동평균선 기간은 2 에서 300 사이의 수입니다.').required('필수 입력 사항입니다.'),
                            upperMovingAverage: Yup.number().min(2,'이동평균선 기간은 2 에서 300 사이의 수입니다.').max(300,'이동평균선 기간은 2 에서 300 사이의 수입니다.').required('필수 입력 사항입니다.'),
                            lowerK: Yup.number().min(0,'표준편차승수는 0 에서 3 사이의 수입니다.').max(3,'표준편차승수는 0 에서 3 사이의 수입니다.').required('필수 입력 사항입니다.'),
                            upperK: Yup.number().min(0,'표준편차승수는 0 에서 3 사이의 수입니다.').max(3,'표준편차승수는 0 에서 3 사이의 수입니다.').required('필수 입력 사항입니다.'),
                            riskRate: Yup.number().min(0,'거래당 최대 손실은 0 에서 50 사이의 수입니다.').max(50,'거래당 최대 손실은 0 에서 50 사이의 수입니다.').required('필수 입력 사항입니다.'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                setBackTestLoading(true);
                                axios.get('https://backtest.kobot.kro.kr/api/backtest', {
                                    params: {
                                        market: 'KRW_BTC',
                                        startDate: startDate,
                                        endDate: endDate,
                                        upperMovingAverage: values.upperMovingAverage,
                                        lowerMovingAverage: values.lowerMovingAverage,
                                        upperK: values.lowerK,
                                        lowerK: values.upperK,
                                        riskRate: values.riskRate/100,
                                        timeFrame: 'DAY'
                                    }
                                }).catch(function (err){
                                    console.log(err.response.data.message);
                                    alert(err.response.data.message);
                                }).then(function (response){
                                    setBackTestLoading(false);
                                    setHtml(response.data.content)
                                    setOrderList(response.data.orderList)
                                    setStatOpen(true)
                                })
                                console.log(pair, timeframe, startDate, endDate, values.lowerMovingAverage, values.upperMovingAverage, values.upperK, values.lowerK, values.riskRate)
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
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>

                                <SubCard title={"매수 기준"} secondary={"볼린저밴드 하단"} style={{backgroundColor:"rgba(0,200,83,0.2)"}}>
                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography marginTop={"30px"}>이동평균선 기간</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth error={Boolean(touched.lowerMovingAverage && errors.lowerMovingAverage)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>백테스트 기간의 20% 안쪽으로 설정해주세요</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-lowerMovingAverage-login"
                                                    type="lowerMovingAverage"
                                                    value={values.lowerMovingAverage}
                                                    name="lowerMovingAverage"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                                {touched.lowerMovingAverage && errors.lowerMovingAverage && (
                                                    <FormHelperText error id="standard-weight-helper-text-lowerMovingAverage-login">
                                                        {errors.lowerMovingAverage}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography marginTop={"30px"}>표준 편차 승수</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth error={Boolean(touched.lowerK && errors.lowerK)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>0 에서 1을 권장합니다</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-lowerK-login"
                                                    type="lowerK"
                                                    value={values.lowerK}
                                                    name="lowerK"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                                {touched.lowerK && errors.lowerK && (
                                                    <FormHelperText error id="standard-weight-helper-text-lowerK-login">
                                                        {errors.lowerK}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </SubCard>

                                <Grid xs={12} sm={12}>
                                    <br/>
                                </Grid>

                                <SubCard title={"매도 기준"} secondary={"볼린저밴드 상단"} style={{backgroundColor:"rgba(216,67,21,0.2)"}}>
                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography marginTop={"30px"}>이동평균선 기간</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth error={Boolean(touched.upperMovingAverage && errors.upperMovingAverage)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>백테스트 기간의 20% 안쪽으로 설정해주세요</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-upperMovingAverage-login"
                                                    type="upperMovingAverage"
                                                    value={values.upperMovingAverage}
                                                    name="upperMovingAverage"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                                {touched.upperMovingAverage && errors.upperMovingAverage && (
                                                    <FormHelperText error id="standard-weight-helper-text-upperMovingAverage-login">
                                                        {errors.upperMovingAverage}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>


                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography marginTop={"30px"}>표준 편차 승수</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth error={Boolean(touched.upperK && errors.upperK)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>0 에서 1을 권장합니다</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-upperK-login"
                                                    type="upperK"
                                                    value={values.upperK}
                                                    name="upperK"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                                {touched.upperK && errors.upperK && (
                                                    <FormHelperText error id="standard-weight-helper-text-upperK-login">
                                                        {errors.upperK}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </SubCard>

                                <Grid xs={12} sm={12}>
                                    <br/>
                                </Grid>

                                <SubCard title={"리스크 비율"} style={{backgroundColor:"rgba(32,47,73,0.2)"}}>
                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={6} sm={6}>
                                            <Typography marginTop={"30px"}>거래당 최대 손실 (%)</Typography>
                                        </Grid>
                                        <Grid xs={6} sm={6}>
                                            <FormControl fullWidth error={Boolean(touched.riskRate && errors.riskRate)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>5 이상일 경우 레버리지를 사용해야 합니다.</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-riskRate-login"
                                                    type="riskRate"
                                                    value={values.riskRate}
                                                    name="riskRate"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                                {touched.riskRate && errors.riskRate && (
                                                    <FormHelperText error id="standard-weight-helper-text-riskRate-login">
                                                        {errors.riskRate}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </SubCard>

                                <Grid xs={12} sm={12}>
                                    <br/>
                                </Grid>

                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            fullWidth variant={"contained"} style={{fontSize:"30px", backgroundColor:"rgba(0,150,80,0.8)"}}
                                            startIcon={<PlayCircleOutlineRoundedIcon style={{fontSize:"30px"}}/>}
                                            disableElevation type={"submit"}
                                            disabled={isSubmitting}
                                        >
                                            백테스트 실행
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Grid>
            )

        case "KOBOT AI 전략":
            return(
                <Grid xs={12} sm={12}>
                    <Divider sx={{ my: 1.5 }} />

                    <Formik
                        initialValues={{
                            riskRate: 10,
                        }}
                        validationSchema={Yup.object().shape({
                            riskRate: Yup.number().min(0,'거래당 최대 손실은 0 에서 50 사이의 수입니다.').max(50,'거래당 최대 손실은 0 에서 50 사이의 수입니다.').required('필수 입력 사항입니다.'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                setBackTestLoading(true);
                                axios.get('https://backtest.kobot.kro.kr/api/kobotAI', {
                                    params: {
                                        market: 'KRW_BTC',
                                        startDate: startDate,
                                        endDate: endDate,
                                        riskRate: values.riskRate/100,
                                        timeFrame: 'DAY'
                                    }
                                }).catch(function (err){
                                    console.log(err.response.data.message);
                                    alert(err.response.data.message);
                                }).then(function (response){
                                    setBackTestLoading(false);
                                    setHtml(response.data.content)
                                    setOrderList(response.data.orderList)
                                    setStatOpen(true)
                                })
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
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>

                                <SubCard title={"리스크 비율"} style={{backgroundColor:"rgba(32,47,73,0.2)"}}>
                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={6} sm={6}>
                                            <Typography marginTop={"30px"}>거래당 최대 손실 (%)</Typography>
                                        </Grid>
                                        <Grid xs={6} sm={6}>
                                            <FormControl fullWidth error={Boolean(touched.riskRate && errors.riskRate)} sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>5 이상일 경우 레버리지를 사용해야 합니다.</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-riskRate-login"
                                                    type="riskRate"
                                                    value={values.riskRate}
                                                    name="riskRate"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                                {touched.riskRate && errors.riskRate && (
                                                    <FormHelperText error id="standard-weight-helper-text-riskRate-login">
                                                        {errors.riskRate}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </SubCard>

                                <Grid xs={12} sm={12}>
                                    <br/>
                                </Grid>

                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            fullWidth variant={"contained"} style={{fontSize:"30px", backgroundColor:"rgba(0,150,80,0.8)"}}
                                            startIcon={<PlayCircleOutlineRoundedIcon style={{fontSize:"30px"}}/>}
                                            disableElevation type={"submit"}
                                            disabled={isSubmitting}
                                        >
                                            백테스트 실행
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>

                </Grid>
            )

        default:
            return(
                <Grid xs={12} sm={12}>
                    <Divider sx={{ my: 1.5 }} />

                    <SubCard>
                        <Typography>전략을 선택해주세요.</Typography>
                    </SubCard>
                </Grid>
            )
    }

}

export default StrategyParameterComponent