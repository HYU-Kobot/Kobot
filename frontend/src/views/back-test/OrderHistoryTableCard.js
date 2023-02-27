import MainCard from "../../ui-component/cards/MainCard";
import { DataGrid } from '@mui/x-data-grid';

import * as React from 'react';
import {CardContent, Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../store/constant";
import CoinCardCompnent from "../dashboard/Default/CoinCardComponent";
import {useState} from "react";
import OrderHistoryComponent from "./OrderHistoryComponent";
import {Pagination} from "@mui/lab";



const OrderHistoryTableCard = () => {
    const [orderInfo, setOrderInfo] = useState([
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 2, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 3, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 4, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'SELL' },
        { id: 5, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
    ]);
    const columns = [
        { field: 'trade_date', headerName: '체결시간', width: 150 },
        { field: 'coin_category', headerName: '코인명', width: 100 },
        { field: 'category', headerName: '종류', width: 100 },
        { field: 'amount', headerName: '거래수량', width: 100 },

    ];

    const rows = [
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 2, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 3, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 4, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'SELL' },
        { id: 5, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 2, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 3, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 4, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'SELL' },
        { id: 5, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 2, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 3, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 4, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'SELL' },
        { id: 5, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
    ];

    return(
        <MainCard title={"거래 내역"} >

                    <Grid item xs={12}>
                        {orderInfo &&
                            orderInfo.map((order, index) =>
                                <OrderHistoryComponent order={order} key={index}/>
                            )}
                        <Pagination
                            count={6}
                            size="large"/>
                    </Grid>
        </MainCard>
    )
}

export default OrderHistoryTableCard;