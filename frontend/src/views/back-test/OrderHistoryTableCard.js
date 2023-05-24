import MainCard from "../../ui-component/cards/MainCard";

import * as React from 'react';
import {CardContent, Grid, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import OrderHistoryComponent from "./OrderHistoryComponent";
import {Pagination} from "@mui/lab";
import BackTestContext from "./BackTestContext";
import StatModal from "./StatModal";


const OrderHistoryTableCard = () => {
    const BackTestContextValue = useContext(BackTestContext);
    const orderList = BackTestContextValue.orderList;
    const setOrderList = BackTestContextValue.setOrderList;

    const last_page = orderList.length % 16 === 0 ? parseInt(orderList.length / 16) : parseInt(orderList.length/16)+1;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const handlePage = (e,v) => {
        setPage(v);
    }
    useEffect(() => {
        setData(orderList.slice(0,16));
        if(page === last_page){
            setData(orderList.slice(16 * (page -1)));
        } else{
            setData(orderList.slice(16 * (page - 1), 16 * (page - 1) + 16));
        }
    }, [page, orderList]);


    return(
        <MainCard title={"거래 내역"} secondary={<StatModal/>}>
                    <Grid item xs={12}>
                        <Grid xs={12} container>
                            {orderList &&
                                data.map((order, index) =>{
                                    if(index % 2 === 0){
                                        return (
                                            <Grid xs={6}>
                                                <OrderHistoryComponent order={order} key={index}/>
                                            </Grid>
                                        )
                                    }
                                    else{
                                        return (
                                            <Grid xs={6}>
                                                <OrderHistoryComponent order={order} key={index}/>
                                            </Grid>
                                        )
                                    }
                                }
                                )}
                        </Grid>
                        <Pagination
                            count={last_page}
                            defaultPage={1}
                            onChange={(e,v) => {handlePage(e,v)}}
                            size="large"/>
                    </Grid>
        </MainCard>
    )
}

export default OrderHistoryTableCard;