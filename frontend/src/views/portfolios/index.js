import {Box, Button, Grid, Link, Modal, Typography} from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as React from "react";
import AddBotModal from "./AddBotModal";
import BotTemplate from "./BotTemplate";
import OrderHistoryComponent from "../back-test/OrderHistoryComponent";
import {useContext, useEffect} from "react";
import axios from "axios";
import BackTestContext from "../back-test/BackTestContext";
import Context from "../../Context";

// ==============================|| TYPOGRAPHY ||============================== //


const Index = () => {

    const [balance, setBalance] = React.useState({
        "moneyOnHand": 10000,
        "purchaseAmountSum": 20000,
        "netProfitSum": 30000,
        "marketValueSum": 40000,
        "totalSum": 50000,
        "bot" : [
            {
                "botId": 1,
                "botName" : "bot1",
                "purchaseAmount": 60000,
                "netProfit": -800,
                "marketValue": 80000,
                "total": 90000,
                "strategy": 'bollinger',
                "upperMovingAverage": 50,
                "lowerMovingAverage": 20,
                "upperK": 0.3,
                "lowerK": 0.5,
                "riskRate": 0.02,
                "timeFrame": 'DAY',
                "coinPair": 'KRW_BTC',
                "orderHistory":[{
                    "category":"BUY",
                    "market":'KRW_BTC',
                    "amount": 30000,
                    "tradeDate": '2017-01-27',
                    "price": 40000,
                },{
                    "category":"SELL",
                    "market":'KRW_BTC',
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                }]
            },
            {
                "botId": 1,
                "botName" : "bot1",
                "purchaseAmount": 60000,
                "netProfit": -800,
                "marketValue": 80000,
                "total": 90000,
                "strategy": 'bollinger',
                "upperMovingAverage": 50,
                "lowerMovingAverage": 20,
                "upperK": 0.3,
                "lowerK": 0.5,
                "riskRate": 0.02,
                "timeFrame": 'DAY',
                "coinPair": 'KRW_BTC',
                "orderHistory":[{
                    "category":"BUY",
                    "market":20000,
                    "amount": 30000,
                    "tradeDate": '2017-01-27',
                    "price": 40000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                }]
            },
            {
                "botId": 1,
                "botName" : "bot1",
                "purchaseAmount": 60000,
                "netProfit": -800,
                "marketValue": 80000,
                "total": 90000,
                "strategy": 'bollinger',
                "upperMovingAverage": 50,
                "lowerMovingAverage": 20,
                "upperK": 0.3,
                "lowerK": 0.5,
                "riskRate": 0.02,
                "timeFrame": 'DAY',
                "coinPair": 'KRW_BTC',
                "orderHistory":[{
                    "category":"BUY",
                    "market":20000,
                    "amount": 30000,
                    "tradeDate": '2017-01-27',
                    "price": 40000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                },{
                    "category":"SELL",
                    "market":2000,
                    "amount": 3000,
                    "tradeDate": '2027-02-30',
                    "price": 4000,
                }]
            }
        ],
    });

    const ContextValue = useContext(Context);
    const loginState = ContextValue.loginState;
    const setLoginState = ContextValue.setLoginState;

    useEffect(() => {
        if(loginState){
            axios.get('https://api.kobot.kro.kr/api/bot', {
                headers: {
                    Authorization:'Bearer ' + localStorage.getItem('loginToken')
                }
            }).catch(function (err){
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
            }).then(function (response){
                setBalance(response.data)
            })
        }
    }, [])

    return(
        <div>
            {loginState &&
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                총자산
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {balance.totalSum}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                예수금
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {balance.moneyOnHand}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                봇 투자금
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {balance.purchaseAmountSum}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                미실현수익
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {balance.marketValueSum}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                순이익
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {balance.netProfitSum}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            }
            {!loginState &&
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                총자산
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                0
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                예수금
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                0
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                봇 투자금
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                0
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                미실현수익
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                0
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={2.4} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                순이익
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                0
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            }
            <br/>
            {loginState &&
            <MainCard title="봇 리스트" secondary={<AddBotModal/>}>
                <Grid container spacing={gridSpacing}>
                    {balance &&
                    balance.bot.map((botInfo, index) => {
                            return(<BotTemplate bot={botInfo} key={index}/>)
                        }
                    )}
                </Grid>
            </MainCard>
            }
            {!loginState &&
            <MainCard title="자동매매 서비스">
                <Typography textAlign={'center'} variant={'h2'}>
                    로그인 후 이용가능합니다.
                </Typography>
            </MainCard>
            }

        </div>
    )
}

export default Index;
