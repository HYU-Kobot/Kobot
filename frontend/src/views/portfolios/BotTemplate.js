import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider,
    Grid,
    TextField, Typography
} from '@mui/material';

// project imports
import * as React from "react";
import SubCard from "../../ui-component/cards/SubCard";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {useContext, useEffect, useState} from "react";
import OrderHistoryComponent from "../back-test/OrderHistoryComponent";
import {Pagination} from "@mui/lab";
import PortfolioOrderHistory from "./PortfolioOrderHistory";
import axios from "axios";
import Context from "../../Context";

// ==============================|| TYPOGRAPHY ||============================== //

const MarketValueColor = (marketValue) => {
    if(marketValue > 0){
        return(
            <Grid item xs={4}>
                <Typography variant="subtitle2" color="inherit">
                    미실현 수익
                </Typography>
                <Typography variant="h3" color='success.dark'>
                    +{marketValue}
                </Typography>
            </Grid>
        )
    }
    else if(marketValue === 0){
        return(
            <Grid item xs={4}>
                <Typography variant="subtitle2" color="secondary">
                    미실현 수익
                </Typography>
                <Typography variant="h3" color="secondary">
                    {marketValue}
                </Typography>
            </Grid>
        )
    }
    else{
        return(
            <Grid item xs={4}>
                <Typography variant="subtitle2" color="inherit">
                    미실현 수익
                </Typography>
                <Typography variant="h3" color='orange.dark'>
                    -{marketValue}
                </Typography>
            </Grid>
        )
    }
}


const NetProfitColor = (netProfit) => {
    if(netProfit > 0){
        return(
            <Grid item xs={4}>
                <Typography variant="subtitle2" color="inherit">
                    순이익
                </Typography>
                <Typography variant="h3" color='success.dark'>
                    +{netProfit}
                </Typography>
            </Grid>
        )
    }
    else if(netProfit === 0){
        return(
            <Grid item xs={4}>
                <Typography variant="subtitle2" color="secondary">
                    순이익
                </Typography>
                <Typography variant="h3" color="secondary">
                    {netProfit}
                </Typography>
            </Grid>
        )
    }
    else{
        return(
            <Grid item xs={4}>
                <Typography variant="subtitle2" color="inherit">
                    순이익
                </Typography>
                <Typography variant="h3" color='orange.dark'>
                    {netProfit}
                </Typography>
            </Grid>
        )
    }
}



const BotTemplate = ({bot}) => {

    const [orderToggle, setOrderToggle] = useState(false);

    const ContextValue = useContext(Context)
    const setLoginState = ContextValue.setLoginState;

    const last_page = bot.orderHistory.length % 9 === 0 ? parseInt(bot.orderHistory.length / 9) : parseInt(bot.orderHistory.length/9)+1;
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const handlePage = (e,v) => {
        setPage(v);
    }
    useEffect(() => {
        setData(bot.orderHistory.slice(0,9));
        if(page === last_page){
            setData(bot.orderHistory.slice(9 * (page -1)));
        } else{
            setData(bot.orderHistory.slice(9 * (page - 1), 9 * (page - 1) + 9));
        }
    }, [page, bot.orderHistory]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Grid item xs={12} sm={12}>
            <SubCard title={bot.name} secondary={
                <>
                    <Button onClick={() => setOrderToggle(!orderToggle)}>봇 거래내역</Button>
                    <Button size={"small"} color={'error'} onClick={handleOpen}>봇 삭제</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullwidth
                        maxWidth={'xs'}
                    >
                        <DialogTitle>
                            <Typography textAlign={'center'} color={'error'} variant={'h3'}>봇 삭제</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography>현재 매수되어 있는 모든 코인을 시장가로 매도하고 봇을 삭제하시겠습니까?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button size={"small"} color={'error'} onClick={() => {
                                axios.delete('https://api.kobot.kro.kr/api/bot/' + bot.botId,{
                                    headers:{
                                        Authorization: 'Bearer ' + localStorage.getItem('loginToken')
                                    }
                                })
                                    .then(function (response) {
                                        alert('봇이 삭제되었습니다.')
                                        handleClose();
                                    })
                                    .catch(function (error) {
                                        console.log(error.message)
                                        if(err.response.data.message === 'notValidToken'){
                                            setLoginState(false)
                                            localStorage.removeItem('loginToken')
                                            alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
                                        }
                                        else{
                                            if(err.response.data.message === '401 Unauthorized: \"{\"error\":{\"message\":\"This access key is incorrect.\",\"name\":\"invalid_access_key\"}}\"'){
                                                alert('유효하지 않은 키 값입니다.')
                                            }
                                            else{
                                                alert(err.response.data.message);
                                            }
                                        }
                                    })
                            }
                            }>삭제</Button>
                            <Button size={"small"} color={'primary'} onClick={handleClose}>취소</Button>
                        </DialogActions>
                    </Dialog>
                </>
            }>
                {!orderToggle &&
                <Grid container>
                    <Grid container direction="column" xs={5.5}>

                        <Grid item textAlign={'center'} marginBottom={'7px'}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={4}>
                                    <Typography variant="h4" color="primary">
                                        봇 수익정보
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        봇 투자금
                                    </Typography>
                                    <Typography variant="h3" color="inherit">
                                        {bot.purchaseAmount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        총자산
                                    </Typography>
                                    <Typography variant={"h3"} color="inherit">
                                        {bot.total}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item textAlign={'center'} marginBottom={'7px'}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={4}>
                                    <Typography variant="h4" color="primary">
                                    </Typography>
                                </Grid>
                                {NetProfitColor(bot.netProfit)}
                                {MarketValueColor(bot.marketValue)}
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid xs={1}>
                        <Divider orientation={"vertical"} flexItem variant={"middle"}/>
                    </Grid>

                    <Grid container direction="column" xs={5.5}>
                        <Grid item textAlign={'center'}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={4}>
                                    <Typography variant="h4" color="primary">
                                        봇 세팅 값
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        코인 페어
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.coinPair}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        전략
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.strategy}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br/>
                        </Grid>

                        <Grid item textAlign={'center'} marginBottom={'7px'}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        타임프레임
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.timeFrame}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        이동평균선 상단
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.upperMovingAverage}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        이동평균선 하단
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.lowerMovingAverage}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item textAlign={'center'} marginBottom={'7px'}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        거래당 손실 비율
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.riskRate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        표준편차 승수 상단
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.upperK}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="inherit">
                                        표준편차 승수 하단
                                    </Typography>
                                    <Typography variant="h4" color="inherit">
                                        {bot.lowerK}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                }
                {orderToggle &&
                <Grid item xs={12}>
                    <Grid xs={12} container>
                        {bot.orderHistory &&
                        data.map((order, index) =>{
                                if(index % 3 === 0){
                                    return (
                                        <Grid xs={4}>
                                            <PortfolioOrderHistory order={order} key={index}/>
                                        </Grid>
                                    )
                                }
                                else if(index % 3 === 1){
                                    return (
                                        <Grid xs={4}>
                                            <PortfolioOrderHistory order={order} key={index}/>
                                        </Grid>
                                    )
                                }
                                else{
                                    return (
                                        <Grid xs={4}>
                                            <PortfolioOrderHistory order={order} key={index}/>
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
                }


            </SubCard>
        </Grid>
    )
}

export default BotTemplate;
