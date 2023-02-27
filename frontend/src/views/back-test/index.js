// material-ui
import {Box, Button, Grid, Modal, Typography} from '@mui/material';
import * as React from 'react';
// project imports
import {gridSpacing} from "../../store/constant";
import CoinChartCard from "../dashboard/Default/CoinChartCard";
import BackTestParameterCard from "./BackTestParameterCard";
import MainCard from "../../ui-component/cards/MainCard";
import ProfitChartCard from "./ProfitChartCard";
import OrderHistoryTableCard from "./OrderHistoryTableCard";

let plotData = [
    {
        "id": "japan",
        "color": "hsl(139, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 66
            },
            {
                "x": "helicopter",
                "y": 26
            },
            {
                "x": "boat",
                "y": 164
            },
            {
                "x": "train",
                "y": 273
            },
            {
                "x": "subway",
                "y": 204
            },
            {
                "x": "bus",
                "y": 173
            },
            {
                "x": "car",
                "y": 221
            },
            {
                "x": "moto",
                "y": 194
            },
            {
                "x": "bicycle",
                "y": 273
            },
            {
                "x": "horse",
                "y": 81
            },
            {
                "x": "skateboard",
                "y": 248
            },
            {
                "x": "others",
                "y": 255
            }
        ]
    }
];

const BackTest = () => {

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={3.5}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <BackTestParameterCard/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8.5}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <CoinChartCard chartHeight={550}/>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <ProfitChartCard/>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                        <OrderHistoryTableCard/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default BackTest;
