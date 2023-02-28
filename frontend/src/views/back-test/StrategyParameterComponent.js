import {Avatar, Button, Card, Divider, Grid, TextField, Typography} from "@mui/material";
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';

import * as React from "react";
import SubCard from "../../ui-component/cards/SubCard";
import {useState} from "react";

const StrategyParameterComponent = (strategy) => {

    const [period_buy, setPeriod_buy] = useState();
    const [period_sell, setPeriod_sell] = useState();
    const [standardDeviation_buy, setStandardDeviation_buy] = useState();
    const [standardDeviation_sell, setStandardDeviation_sell] = useState();

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
                                    fullWidth
                                    margin={"normal"}
                                />
                            </Grid>
                        </Grid>

                        <Grid xs={12} sm={12} container>
                            <Grid xs={4.5} sm={4.5}>
                                <Typography marginTop={"30px"}>표준 편차</Typography>
                            </Grid>
                            <Grid xs={7.5} sm={7.5}>
                                <TextField
                                    fullWidth
                                    margin={"normal"}
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
                                    fullWidth
                                    margin={"normal"}
                                />
                            </Grid>
                        </Grid>


                        <Grid xs={12} sm={12} container>
                            <Grid xs={4.5} sm={4.5}>
                                <Typography marginTop={"30px"}>표준 편차</Typography>
                            </Grid>
                            <Grid xs={7.5} sm={7.5}>
                                <TextField
                                    fullWidth
                                    margin={"normal"}
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
                                    fullWidth
                                    margin={"normal"}
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