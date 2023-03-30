import {Avatar, Button, Card, Divider, Grid, TextField, Typography} from "@mui/material";
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

import * as React from "react";
import SubCard from "../../ui-component/cards/SubCard";
import {useState} from "react";

const StrategyParameterComponent = (strategy) => {

    const [bollinger_period_buy, setBollinger_period_buy] = useState(50);
    const [bollinger_period_sell, setBollinger_period_sell] = useState(50);
    const [bollinger_standardDeviation_buy, setBollinger_standardDeviation_buy] = useState(0.1);
    const [bollinger_standardDeviation_sell, setBollinger_standardDeviation_sell] = useState(0.1);
    const [bollinger_risk, setBollinger_risk] = useState(2);

    switch (strategy.strategy){
        case "볼린저밴드":
            return(
                <Grid xs={12} sm={12}>
                    <Divider sx={{ my: 1.5 }} />

                    <SubCard title={"매수 기준"} secondary={"볼린저밴드 상단"} style={{backgroundColor:"rgba(0,200,83,0.2)"}}>
                        <Grid xs={12} sm={12} container>
                            <Grid xs={4.5} sm={4.5}>
                                <Typography marginTop={"30px"}>기간 설정</Typography>
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
                                <Typography marginTop={"30px"}>표준 편차</Typography>
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

                    <SubCard title={"매도 기준"} secondary={"볼린저밴드 중단"} style={{backgroundColor:"rgba(216,67,21,0.2)"}}>
                        <Grid xs={12} sm={12} container>
                            <Grid xs={4.5} sm={4.5}>
                                <Typography marginTop={"30px"}>기간 설정</Typography>
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
                                <Typography marginTop={"30px"}>표준 편차</Typography>
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

                    <SubCard title={"리스크 비율"} style={{backgroundColor:"rgba(32,47,73,0.2)"}}>
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

                    <Grid xs={12} sm={12}>
                        <Button fullWidth variant={"contained"} style={{fontSize:"30px", backgroundColor:"rgba(0,150,80,0.8)"}} startIcon={<PlayCircleOutlineRoundedIcon style={{fontSize:"30px"}}/>}>
                            백테스트 실행
                        </Button>
                    </Grid>

                </Grid>
            )

        case "역추세전략":
            return(
                <>

                </>
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