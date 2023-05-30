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
import {useState} from "react";
import BackTestContext from "./BackTestContext";
import Loading from "./Loading";

const BackTest = () => {

    const dateNow = new Date(); // Creating a new date object with the current date and time
    const year = dateNow.getFullYear(); // Getting current year from the created Date object
    const monthWithOffset = dateNow.getMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
    const month = // Setting current Month number from current Date object
        monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
            ? `0${monthWithOffset}`
            : monthWithOffset;
    const date =
        dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
            ? `0${dateNow.getDate()}`
            : dateNow.getDate();

    const materialDateInput = `${year}-${month}-${date}`; // combining to format for defaultValue or value attribute of material <TextField>


    const [market, setMarket] = useState("UPBIT");
    const [pair, setPair] = useState("BTCKRW");
    const [timeframe, setTimeframe] = useState("D");
    const [startDate, setStartDate] = useState("2017-10-01");
    const [endDate, setEndDate] = useState(materialDateInput);
    const [statOpen, setStatOpen] = React.useState(false);
    const [html, setHtml] = useState("<!doctype html>\n" +
        "<html>\n" +
        "    <head>\n" +
        "        <title>example 1-2</title>\n" +
        "    </head>\n" +
        "    <body>\n" +
        "        <H2>백테스트를 실행해주세요</H2>\n" +
        "    </body>\n" +
        "</html>");
    const [orderList, setOrderList] = useState([
        { id: 1, trade_date: '백테스트를 실행해주세요', market: '', category: 'BUY', amount: '' , price: '' },
    ]);
    const [backTestLoading, setBackTestLoading] = useState(false);

    const backTestState = {backTestLoading, setBackTestLoading, market, setMarket, pair, setPair,statOpen, setStatOpen, timeframe, setTimeframe, startDate, setStartDate, endDate, setEndDate, html, setHtml, orderList, setOrderList};

    return (
        <Grid container spacing={gridSpacing}>
            <BackTestContext.Provider value={backTestState}>
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
                            <CoinChartCard chartHeight={550} market={market} pair={pair} timeframe={timeframe} />
                        </Grid>
                        {/*<Grid item lg={6} md={6} sm={6} xs={12}>*/}
                        {/*    <ProfitChartCard/>*/}
                        {/*</Grid>*/}
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <OrderHistoryTableCard/>
                        </Grid>
                    </Grid>
                </Grid>
                <Loading/>
            </BackTestContext.Provider>
        </Grid>
    );
}

export default BackTest;
