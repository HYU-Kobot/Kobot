import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, FormControl, FormHelperText,
    Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select,
    TextField, Typography
} from '@mui/material';

// project imports
import * as React from "react";
import {Autocomplete} from "@mui/lab";
import SubCard from "../../ui-component/cards/SubCard";
import {useContext, useState} from "react";
import InfoIcon from "@mui/icons-material/Info";
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import {useTheme} from "@mui/material/styles";
import useScriptRef from "../../hooks/useScriptRef";
import {number} from "prop-types";
import Context from "../../Context";

// ==============================|| TYPOGRAPHY ||============================== //

const AddBotModal = () => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [botName, setBotName] = useState("")
    const [price, setPrice] = useState()
    const strategy = ["볼린저밴드", "KOBOT AI 전략"];
    const [selectedStrategy, setSelectedStrategy] = useState("볼린저밴드");
    const [pair, setPair] = useState("KRW_BTC")

    const [timeframe, setTimeframe] = useState("DAY");

    const ContextValue = useContext(Context)
    const setLoginState = ContextValue.setLoginState;


    const strategySetting = (strategy) => {
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
                                    await axios.post("https://api.kobot.kro.kr/api/bot", {
                                        name: botName,
                                        market: pair,
                                        strategy: 'bollingerband',
                                        parameters : [{name: "upperMovingAverage", values: values.upperMovingAverage},
                                            {name: "upperMovingAverage", values: values.lowerMovingAverage},
                                            {name: "upperMovingAverage", values: values.upperK},
                                            {name: "upperMovingAverage", values: values.lowerK}
                                        ],
                                        price: price,
                                        riskRate: values.riskRate,
                                        timeframe: timeframe
                                    },{
                                        headers: {
                                            Authorization: 'Bearer ' + localStorage.getItem('loginToken')
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
                                        alert('자동매매 봇 등록이 완료되었습니다!')
                                    })
                                    console.log(pair, timeframe, values.lowerMovingAverage, values.upperMovingAverage, values.upperK, values.lowerK, values.riskRate)
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
                                                봇 추가
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
                        <TextField
                            margin="normal"
                            id="B_param_1"
                            label="B-Parameter-1"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                            required
                        />
                    </Grid>
                )
            default:
                return(
                    <Grid xs={12} sm={12}>
                        <Typography align={'center'} variant={'h3'}>전략을 선택해주세요.</Typography>
                    </Grid>
                )
        }

    }

    return(
        <div>
            <Button onClick={handleOpen}>봇 추가</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullwidth
                maxWidth={'xs'}
            >
                <DialogTitle>
                    <Typography variant={'h3'}>Setting</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container xs={12} sm={12}>
                        <Formik
                            initialValues={{
                                botName: '',
                                price: 0,
                            }}
                            validationSchema={Yup.object().shape({
                                botName: Yup.string().required('필수 입력 사항입니다.'),
                                price: Yup.number().required('필수 입력 사항입니다.').min(0,'입금액은 양수입니다.'),
                            })}
                            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                console.log(pair, timeframe, botName, values.upperMovingAverage, values.upperK, values.lowerK, values.riskRate)
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} style={{width:"100%"}}>
                                    <Grid xs={12} sm={12} container style={{width:"100%"}}>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography variant={"h4"} marginTop={"30px"}>봇 이름</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth  sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>봇 이름을 설정해주세요</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-botName-login"
                                                    type="botName"
                                                    value={botName}
                                                    name="botName"
                                                    onBlur={handleBlur}
                                                    fullWidth
                                                    onChange={(e)=>{setBotName(e.target.value)}}
                                                    label="Email Address / Username"
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={12} sm={12} container style={{width:"100%"}}>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography variant={"h4"} marginTop={"30px"}>입금액</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth  sx={{ ...theme.typography.customInput }}>
                                                <InputLabel>입금액을 설정해주세요.</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-price-login"
                                                    value={price}
                                                    name="price"
                                                    onBlur={handleBlur}
                                                    fullWidth
                                                    onChange={(e)=>{setPrice(e.target.value)}}
                                                    inputProps={{style:{textAlign:"right"}}}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={12} sm={12} container>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography variant={"h4"} marginTop={"30px"}>전략 선택</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                                <Autocomplete
                                                    style={{textAlign:"right"}}
                                                    value={selectedStrategy}
                                                    onChange={(event, newValue) => {
                                                        setSelectedStrategy(newValue);
                                                    }}
                                                    id="strategy_select"
                                                    options={strategy}
                                                    renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} fullWidth required />}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={12} sm={12} container marginTop={"10px"}>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography variant={"h4"} marginTop={"25px"}>코인 페어</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <Select
                                                labelId={"pair_select_label"}
                                                id="pair_select"
                                                value={pair}
                                                label="coinPair"
                                                onChange={(event) => {
                                                    setPair(event.target.value);
                                                }}
                                                fullWidth
                                            >
                                                <MenuItem value={"KRW_BTC"}>KRW_BTC</MenuItem>
                                                <MenuItem value={"KRW_ETH"}>KRW_ETH</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>

                                    <Grid xs={12} sm={12} container marginTop={"20px"}>
                                        <Grid xs={4.5} sm={4.5}>
                                            <Typography variant={"h4"} marginTop={"20px"}>타임 프레임</Typography>
                                        </Grid>
                                        <Grid xs={7.5} sm={7.5}>
                                            <Select
                                                labelId={"timeframe_select_label"}
                                                id="timeframe_select"
                                                value={timeframe}
                                                label="타임프레임"
                                                onChange={(event) => {
                                                    setTimeframe(event.target.value);
                                                }}
                                                fullWidth
                                            >
                                                <MenuItem value={"1"}>1m</MenuItem>
                                                <MenuItem value={"3"}>3m</MenuItem>
                                                <MenuItem value={"5"}>5m</MenuItem>
                                                <MenuItem value={"15"}>15m</MenuItem>
                                                <MenuItem value={"30"}>30m</MenuItem>
                                                <MenuItem value={"60"}>1h</MenuItem>
                                                <MenuItem value={"240"}>4h</MenuItem>
                                                <MenuItem value={"DAY"}>1d</MenuItem>
                                                <MenuItem value={"W"}>1w</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>


                                    <Grid xs={12} sm={12}>
                                        <br/>
                                    </Grid>

                                </form>
                            )}
                        </Formik>
                        {/*<SubCard style={{backgroundColor:"rgba(33,150,243,0.2)", width:"100%"}}>*/}

                        {/*    <Grid xs={12} sm={12} container>*/}
                        {/*        <Grid xs={4.5} sm={4.5}>*/}
                        {/*            <Typography variant={"h4"} marginTop={"35px"}>봇 이름</Typography>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid xs={7.5} sm={7.5}>*/}
                        {/*            <TextField*/}
                        {/*                value={price}*/}
                        {/*                fullWidth*/}
                        {/*                inputProps={{step:0.1, style:{textAlign:"right"}}}*/}
                        {/*                margin={"normal"}*/}
                        {/*                onChange={(e)=>{setBotName(e.target.value)}}*/}
                        {/*                label="Bot Name"*/}
                        {/*                variant="standard"*/}
                        {/*                required*/}
                        {/*            />*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}

                        {/*    <Grid xs={12} sm={12} container>*/}
                        {/*        <Grid xs={4.5} sm={4.5} container>*/}
                        {/*            <Grid xs={5.5} sm={5.5}>*/}
                        {/*                <Typography variant={"h4"} marginTop={"25px"}>전략 선택</Typography>*/}
                        {/*            </Grid>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid xs={7.5} sm={7.5}>*/}
                        {/*            <Autocomplete*/}
                        {/*                style={{textAlign:"right"}}*/}
                        {/*                value={selectedStrategy}*/}
                        {/*                onChange={(event, newValue) => {*/}
                        {/*                    setSelectedStrategy(newValue);*/}
                        {/*                }}*/}
                        {/*                id="strategy_select"*/}
                        {/*                options={strategy}*/}
                        {/*                renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} fullWidth required />}*/}
                        {/*            />*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}

                        {/*    <Grid xs={12} sm={12} container marginTop={"10px"}>*/}
                        {/*        <Grid xs={4.5} sm={4.5}>*/}
                        {/*            <Typography variant={"h4"} marginTop={"25px"}>코인 페어</Typography>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid xs={7.5} sm={7.5}>*/}
                        {/*            <Autocomplete*/}
                        {/*                value={pair}*/}
                        {/*                onChange={(event, newValue) => {*/}
                        {/*                    setPair(newValue);*/}
                        {/*                }}*/}
                        {/*                id="pair_select"*/}
                        {/*                options={coin_pair}*/}
                        {/*                renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} fullWidth required />}*/}
                        {/*            />*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}

                        {/*    <Grid xs={12} sm={12}>*/}
                        {/*        <TextField*/}
                        {/*            margin="normal"*/}
                        {/*            id="bot_name"*/}
                        {/*            label="Bot Name"*/}
                        {/*            fullWidth*/}
                        {/*            variant="standard"*/}
                        {/*            autoComplete='off'*/}
                        {/*            required*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*    <Grid xs={12} sm={12}>*/}
                        {/*        <TextField*/}
                        {/*            margin="normal"*/}
                        {/*            id="inputMoney"*/}
                        {/*            label="입금액"*/}
                        {/*            type={'number'}*/}
                        {/*            fullWidth*/}
                        {/*            variant="standard"*/}
                        {/*            autoComplete='off'*/}
                        {/*            InputProps={{*/}
                        {/*                endAdornment: <InputAdornment position="start">￦</InputAdornment>,*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </Grid>*/}
                        {/*    <Grid xs={12} sm={12} container marginTop={"20px"}>*/}
                        {/*        <Grid xs={4.5} sm={4.5}>*/}
                        {/*            <Typography marginTop={"20px"}>타임 프레임</Typography>*/}
                        {/*        </Grid>*/}
                        {/*        <Grid xs={7.5} sm={7.5}>*/}
                        {/*            <Select*/}
                        {/*                labelId={"timeframe_select_label"}*/}
                        {/*                id="timeframe_select"*/}
                        {/*                value={timeframe}*/}
                        {/*                label="타임프레임"*/}
                        {/*                onChange={(event) => {*/}
                        {/*                    setTimeframe(event.target.value);*/}
                        {/*                }}*/}
                        {/*                fullWidth*/}
                        {/*            >*/}
                        {/*                <MenuItem value={"1"}>1m</MenuItem>*/}
                        {/*                <MenuItem value={"3"}>3m</MenuItem>*/}
                        {/*                <MenuItem value={"5"}>5m</MenuItem>*/}
                        {/*                <MenuItem value={"15"}>15m</MenuItem>*/}
                        {/*                <MenuItem value={"30"}>30m</MenuItem>*/}
                        {/*                <MenuItem value={"60"}>1h</MenuItem>*/}
                        {/*                <MenuItem value={"240"}>4h</MenuItem>*/}
                        {/*                <MenuItem value={"D"}>1d</MenuItem>*/}
                        {/*                <MenuItem value={"W"}>1w</MenuItem>*/}
                        {/*            </Select>*/}
                        {/*        </Grid>*/}
                        {/*    </Grid>*/}

                        {/*</SubCard>*/}

                        {strategySetting(selectedStrategy)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={'error'}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddBotModal;
