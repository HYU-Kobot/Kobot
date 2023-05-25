import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, InputAdornment,
    TextField, Typography
} from '@mui/material';

// project imports
import * as React from "react";
import {Autocomplete} from "@mui/lab";
import SubCard from "../../ui-component/cards/SubCard";
import {useState} from "react";

// ==============================|| TYPOGRAPHY ||============================== //

const options = ['Bitcoin', 'Ethereum', 'Ripple'];
const strategyList = ['볼린저밴드', 'B', 'C'];

const AddBotModal = ({botList}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [coinValue, setCoinValue] = React.useState(options[0]);
    const [coinInputValue, setCoinInputValue] = React.useState('');
    const [strategyValue, setStrategyValue] = React.useState(strategyList[0]);
    const [strategyInputValue, setStrategyInputValue] = React.useState('');

    const [bollinger_period_buy, setBollinger_period_buy] = useState(50);
    const [bollinger_period_sell, setBollinger_period_sell] = useState(50);
    const [bollinger_standardDeviation_buy, setBollinger_standardDeviation_buy] = useState(0.1);
    const [bollinger_standardDeviation_sell, setBollinger_standardDeviation_sell] = useState(0.1);
    const [bollinger_risk, setBollinger_risk] = useState(2);


    const strategySetting = (strategy) => {
        console.log(strategy)
        switch (strategy){
            case strategyList[0]:
                return(
                    <Grid xs={12} sm={12} container>
                        <SubCard title={"매수 기준"} secondary={"볼린저밴드 상단"} style={{backgroundColor:"rgba(0,200,83,0.2)", width:"100%"}}>
                            <Grid xs={12} sm={12} container>
                                <Grid xs={4.5} sm={4.5}>
                                    <Typography marginTop={"30px"}>이동평균선 기간</Typography>
                                </Grid>
                                <Grid xs={7.5} sm={7.5}>
                                    <TextField
                                        style={{textAlign:"right"}}
                                        value={bollinger_period_buy}
                                        fullWidth
                                        type={"number"}
                                        inputProps={{style:{textAlign:"right"}}}
                                        margin={"normal"}
                                        onChange={(e)=>{setBollinger_period_buy(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>

                            <Grid xs={12} sm={12} container>
                                <Grid xs={4.5} sm={4.5}>
                                    <Typography marginTop={"30px"}>표준 편차 승수</Typography>
                                </Grid>
                                <Grid xs={7.5} sm={7.5}>
                                    <TextField
                                        value={bollinger_standardDeviation_buy}
                                        fullWidth
                                        type={"number"}
                                        inputProps={{step:0.1, style:{textAlign:"right"}}}
                                        margin={"normal"}
                                        onChange={(e)=>{setBollinger_standardDeviation_buy(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>

                        <Grid xs={12} sm={12}>
                            <br/>
                        </Grid>

                        <SubCard title={"매도 기준"} secondary={"볼린저밴드 중단"} style={{backgroundColor:"rgba(216,67,21,0.2)", width:"100%"}}>
                            <Grid xs={12} sm={12} container>
                                <Grid xs={4.5} sm={4.5}>
                                    <Typography marginTop={"30px"}>이동평균선 기간</Typography>
                                </Grid>
                                <Grid xs={7.5} sm={7.5}>
                                    <TextField
                                        style={{textAlign:"right"}}
                                        value={bollinger_period_sell}
                                        fullWidth
                                        inputProps={{style:{textAlign:"right"}}}
                                        type={"number"}
                                        margin={"normal"}
                                        onChange={(e)=>{setBollinger_period_sell(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>


                            <Grid xs={12} sm={12} container>
                                <Grid xs={4.5} sm={4.5}>
                                    <Typography marginTop={"30px"}>표준 편차 승수</Typography>
                                </Grid>
                                <Grid xs={7.5} sm={7.5}>
                                    <TextField
                                        value={bollinger_standardDeviation_sell}
                                        fullWidth
                                        type={"number"}
                                        inputProps={{step:0.1, style:{textAlign:"right"}}}
                                        margin={"normal"}
                                        onChange={(e)=>{setBollinger_standardDeviation_sell(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>


                        <Grid xs={12} sm={12}>
                            <br/>
                        </Grid>

                        <SubCard title={"리스크 비율"} style={{backgroundColor:"rgba(32,47,73,0.2)", width:"100%"}}>
                            <Grid xs={12} sm={12} container>
                                <Grid xs={6} sm={6}>
                                    <Typography marginTop={"30px"}>거래당 최대 손실 (%)</Typography>
                                </Grid>
                                <Grid xs={6} sm={6}>
                                    <TextField
                                        value={bollinger_risk}
                                        fullWidth
                                        type={"number"}
                                        inputProps={{step:0.1, style:{textAlign:"right"}}}
                                        margin={"normal"}
                                        onChange={(e)=>{setBollinger_risk(e.target.value)}}
                                    />
                                </Grid>
                            </Grid>
                        </SubCard>

                        <Grid xs={12} sm={12}>
                            <br/>
                        </Grid>
                    </Grid>
                )
            case strategyList[1]:
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
            case strategyList[2]:
                return(
                    <Grid xs={12} sm={12}>
                        <TextField
                            margin="normal"
                            id="C_param_1"
                            label="C-Parameter-1"
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
            <Button onClick={handleOpen}>Add Bot</Button>
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
                        <SubCard style={{backgroundColor:"rgba(33,150,243,0.2)", width:"100%"}}>
                            <Grid xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    id="bot_name"
                                    label="Bot Name"
                                    fullWidth
                                    variant="standard"
                                    autoComplete='off'
                                    required
                                />
                            </Grid>
                            <Grid xs={12} sm={12}>
                                <Autocomplete
                                    value={coinValue}
                                    onChange={(event, newValue) => {
                                        setCoinValue(newValue);
                                    }}
                                    inputValue={coinInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setCoinInputValue(newInputValue);
                                    }}
                                    id="coin_select"
                                    options={options}
                                    renderInput={(params) => <TextField {...params} label="Coin" margin="normal" variant={"standard"} fullWidth required />}
                                />
                            </Grid>
                            <Grid xs={12} sm={12}>
                                <TextField
                                    margin="normal"
                                    id="inputMoney"
                                    label="입금액"
                                    type={'number'}
                                    fullWidth
                                    variant="standard"
                                    autoComplete='off'
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">￦</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid xs={12} sm={12}>
                                <Autocomplete
                                    value={strategyValue}
                                    onChange={(event, newValue) => {
                                        setStrategyValue(newValue);
                                    }}
                                    inputValue={strategyInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setStrategyInputValue(newInputValue);
                                    }}
                                    id="strategy_select"
                                    options={strategyList}
                                    renderInput={(params) => <TextField {...params} label="Strategy" margin="normal" variant={"standard"} fullWidth required />}
                                />
                            </Grid>
                        </SubCard>
                        <Grid xs={12} sm={12}>
                            <br/>
                        </Grid>
                        {strategySetting(strategyValue)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Add</Button>
                    <Button onClick={handleClose} color={'error'}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddBotModal;
