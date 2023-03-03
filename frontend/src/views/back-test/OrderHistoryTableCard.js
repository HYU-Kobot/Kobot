import MainCard from "../../ui-component/cards/MainCard";
import { DataGrid } from '@mui/x-data-grid';

import * as React from 'react';
import {CardContent, Grid, Typography} from "@mui/material";
import {gridSpacing} from "../../store/constant";
import CoinCardCompnent from "../dashboard/Default/CoinCardComponent";
import {useEffect, useState} from "react";
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
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'd', category: 'BUY' },
        { id: 2, trade_date: '2023-02-09 20:48:26', coin_category: 'd', category: 'BUY' },
        { id: 3, trade_date: '2023-02-09 20:48:26', coin_category: 'BTfC', category: 'BUY' },
        { id: 4, trade_date: '2023-02-09 20:48:26', coin_category: 'BsTC', category: 'SELL' },
        { id: 5, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTasC', category: 'BUY' },
        { id: 1, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 2, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'BUY' },
        { id: 3, trade_date: '2023-02-09 20:48:26', coin_category: 'BascC', category: 'BUY' },
        { id: 4, trade_date: '2023-02-09 20:48:26', coin_category: 'BTC', category: 'SELL' },
    ]);

    const last_page = orderInfo.length % 6 === 0 ? parseInt(orderInfo.length / 6) : parseInt(orderInfo.length/6)+1;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const handlePage = (e) => {
        const nowPageInt = parseInt(e.target.outerText);
        setPage(nowPageInt);
    }
    useEffect(() => {
        setData(orderInfo.slice(0,6));
        if(page === last_page){
            setData(orderInfo.slice(6 * (page -1)));
        } else{
            setData(orderInfo.slice(6 * (page - 1), 6 * (page - 1) + 6));
        }
    }, [page]);


    return(
        <MainCard title={"거래 내역"} >

                    <Grid item xs={12}>
                        {orderInfo &&
                            data.map((order, index) =>
                                <OrderHistoryComponent order={order} key={index}/>
                            )}
                        <Pagination
                            count={last_page}
                            defaultPage={1}
                            onChange={(e) => {handlePage(e)}}
                            size="large"/>
                    </Grid>
        </MainCard>
    )
}

export default OrderHistoryTableCard;