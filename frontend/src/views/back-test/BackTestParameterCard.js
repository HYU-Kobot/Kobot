
import {
    Box,
    Button,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";

import * as React from 'react';
import {Autocomplete} from "@mui/lab";
import {useContext, useState} from "react";
import BackTestContext from "./BackTestContext";
import StrategyParameterComponent from "./StrategyParameterComponent";


const BackTestParameterCard = () => {

    const strategy = ["볼린저밴드", "역추세전략"];
    const [selectedStrategy, setSelectedStrategy] = useState("볼린저밴드");
    const coin_pair = ["BTCKRW", "ETHKRW"];

    const BackTestContextValue = useContext(BackTestContext);
    const pair = BackTestContextValue.pair;
    const setPair = BackTestContextValue.setPair;
    const timeframe = BackTestContextValue.timeframe;
    const setTimeframe = BackTestContextValue.setTimeframe;


    return(
        <div>
            <MainCard title="백테스트">
                <Grid container>

                    <Grid xs={12} sm={12} container>
                        <Grid xs={4.5} sm={4.5}>
                            <Typography variant={"h4"} marginTop={"25px"}>전략 선택</Typography>
                        </Grid>
                        <Grid xs={7.5} sm={7.5}>
                            <Autocomplete
                                value={selectedStrategy}
                                onChange={(event, newValue) => {
                                    setSelectedStrategy(newValue);
                                }}
                                id="strategy_select"
                                options={strategy}
                                renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} fullWidth required />}
                            />
                        </Grid>
                    </Grid>

                    <Grid xs={12} sm={12} container marginTop={"10px"}>
                        <Grid xs={4.5} sm={4.5}>
                            <Typography variant={"h4"} marginTop={"25px"}>코인 페어</Typography>
                        </Grid>
                        <Grid xs={7.5} sm={7.5}>
                            <Autocomplete
                                value={pair}
                                onChange={(event, newValue) => {
                                    setPair(newValue);
                                }}
                                id="pair_select"
                                options={coin_pair}
                                renderInput={(params) => <TextField {...params} margin="normal" variant={"standard"} fullWidth required />}
                            />
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
                                <MenuItem value={"D"}>1d</MenuItem>
                                <MenuItem value={"W"}>1w</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <StrategyParameterComponent strategy={selectedStrategy}/>
                </Grid>
            </MainCard>
        </div>
    )
}

export default BackTestParameterCard;