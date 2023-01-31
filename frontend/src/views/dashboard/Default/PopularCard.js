import PropTypes from 'prop-types';
import {useEffect, useRef, useState} from 'react';
import axios from "axios";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {HorizontalRule} from "@mui/icons-material";
import CoinCardCompnent from "./CoinCardComponent";

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const [coinCode, setCoinCode] = useState([]);
    const coinTicker = [{market: 'KRW-BTC', korean_name: '비트코인'}, {market: 'KRW-ETH', korean_name: '이더리움'}, {market: 'KRW-XRP', korean_name: '리플'}, {market: 'KRW-DOGE', korean_name: '도지코인'}, {market: 'KRW-ADA', korean_name: '에이다'}, {market: 'KRW-MATIC', korean_name: '폴리곤'}, {market: 'KRW-DOT', korean_name: '폴카닷'}, {market: 'KRW-TRX', korean_name: '트론'}, {market: 'KRW-SOL', korean_name: '솔라나'}, {market: 'KRW-AVAX', korean_name: '아발란체'}];
    const [coinInfo, setCoinInfo] = useState([]);

    const HandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const HandleClose = () => {
        setAnchorEl(null);
    };

    const useInterval = (callback, delay) => {
        const savedCallback = useRef(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

        useEffect(() => {
            savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
            }
            if (delay !== null) { // 만약 delay가 null이 아니라면
                let id = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
                return () => clearInterval(id); // unmount될 때 clearInterval을 해준다.
            }
        }, [delay]); // delay가 바뀔 때마다 새로 실행된다.
    }


    const GetCoinCode = async () => {
        const response = await axios.get('https://api.upbit.com/v1/market/all?isDetails=true');
        let coinCodeArr = [];
        for (let i = 0; i < response.data.length; ++i){
            let marketTemp = response.data[i].market;
            if(marketTemp.indexOf('KRW') !== -1 && (marketTemp === 'KRW-BTC' || marketTemp === 'KRW-ETH' || marketTemp === 'KRW-XRP' || marketTemp === 'KRW-DOGE' || marketTemp === 'KRW-ADA' || marketTemp === 'KRW-MATIC' || marketTemp === 'KRW-DOT' || marketTemp === 'KRW-AVAX' || marketTemp === 'KRW-TRX' || marketTemp === 'KRW-SOL')){
                coinCodeArr = [...coinCodeArr, response.data[i]];
            }
        }
        setCoinCode(coinCodeArr);

    };

    const GetCoinInfo = async (coin) => {
        let coinInfoArr = [];
        for(let i = 0; i < 10; ++i){
            const response = await axios.get('https://api.upbit.com/v1/ticker?markets='+coin[i].market);
            let temp = response.data[0];
            temp.korean_name = coin[i].korean_name;
            coinInfoArr = [...coinInfoArr, temp];
        }
        setCoinInfo(coinInfoArr);
    }


    useEffect(() => {
        // GetCoinCode();
        GetCoinInfo(coinTicker);
    },[])


    useInterval(() => {
        GetCoinInfo(coinTicker);
    },2000)

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h3">코인 시세</Typography>
                                    </Grid>
                                    {/*<Grid item>*/}
                                    {/*    <MoreHorizOutlinedIcon*/}
                                    {/*        fontSize="small"*/}
                                    {/*        sx={{*/}
                                    {/*            color: theme.palette.primary[200],*/}
                                    {/*            cursor: 'pointer'*/}
                                    {/*        }}*/}
                                    {/*        aria-controls="menu-popular-card"*/}
                                    {/*        aria-haspopup="true"*/}
                                    {/*        onClick={HandleClick}*/}
                                    {/*    />*/}
                                    {/*    <Menu*/}
                                    {/*        id="menu-popular-card"*/}
                                    {/*        anchorEl={anchorEl}*/}
                                    {/*        keepMounted*/}
                                    {/*        open={Boolean(anchorEl)}*/}
                                    {/*        onClose={HandleClose}*/}
                                    {/*        variant="selectedMenu"*/}
                                    {/*        anchorOrigin={{*/}
                                    {/*            vertical: 'bottom',*/}
                                    {/*            horizontal: 'right'*/}
                                    {/*        }}*/}
                                    {/*        transformOrigin={{*/}
                                    {/*            vertical: 'top',*/}
                                    {/*            horizontal: 'right'*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        <MenuItem onClick={HandleClose}> Today</MenuItem>*/}
                                    {/*        <MenuItem onClick={HandleClose}> This Month</MenuItem>*/}
                                    {/*        <MenuItem onClick={HandleClose}> This Year </MenuItem>*/}
                                    {/*    </Menu>*/}
                                    {/*</Grid>*/}
                                </Grid>
                            </Grid>
                            {/*<Grid item xs={12} sx={{ pt: '16px !important' }}>*/}
                            {/*    <BajajAreaChartCard />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                {coinInfo &&
                                    coinInfo.map((coin, index) =>
                                        <CoinCardCompnent coin={coin} key={index}/>
                                    )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        {/*<Button size="small" disableElevation>*/}
                        {/*    View All*/}
                        {/*    <ChevronRightOutlinedIcon />*/}
                        {/*</Button>*/}
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
