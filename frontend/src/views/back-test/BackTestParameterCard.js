
import {
    Box,
    Button,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal, Popover,
    Select,
    TextField,
    Typography
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import InfoIcon from '@mui/icons-material/Info';

import * as React from 'react';
import {Autocomplete} from "@mui/lab";
import {useContext, useState} from "react";
import BackTestContext from "./BackTestContext";
import StrategyParameterComponent from "./StrategyParameterComponent";


const BackTestParameterCard = () => {

    const strategy = ["볼린저밴드", "역추세전략"];
    const [selectedStrategy, setSelectedStrategy] = useState("볼린저밴드");
    const coin_pair = ["BTCKRW", "ETHKRW"];

    const [popOver, setPopOver] = useState(null);
    const open = Boolean(popOver);
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setPopOver(null);
    };

    const StrategyPopOver = (strategy) => {
        switch (strategy) {
            case "볼린저밴드":
                return (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={popOver}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{p: 2}} display={"block"}>
                            <p>
                                볼린저밴드에 기반을 둔 매우 유명하고 성공적인 상업적 전략으로
                            </p>
                            <p>
                                '퓨처스 트루스'지가 선정한 역대 최고의 10대 매매 시스템 중 하나로 꼽힌 전략입니다.
                            </p>
                        </Typography>
                    </Popover>
                )

            case "역추세전략":
                return (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={popOver}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{p: 2}} display={"block"}>
                            <p>
                                역추세전략
                            </p>
                        </Typography>
                    </Popover>
                )

            default:

                return (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={popOver}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{p: 2}} display={"block"}>
                            <p>
                                전략을 선택해주세요.
                            </p>
                        </Typography>
                    </Popover>
                )
        }
    }

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
                        <Grid xs={4.5} sm={4.5} container>
                            <Grid xs={5.5} sm={5.5}>
                                <Typography variant={"h4"} marginTop={"25px"}>전략 선택</Typography>
                            </Grid>
                            <Grid xs={6.5} sm={6.5}>
                                <InfoIcon aria-describedby={id} style={{marginTop:"21px"}}
                                          onMouseEnter={(e) => {setPopOver(e.currentTarget)}}
                                />
                                {StrategyPopOver(selectedStrategy)}
                            </Grid>
                        </Grid>
                        <Grid xs={7.5} sm={7.5}>
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