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


    const GetCoinCode = () => {
        const codeOptions = {
            method: 'GET',
            url: 'https://api.upbit.com/v1/market/all?isDetails=true',
            headers: {accept: 'application/json'}
        };
        axios
            .request(codeOptions)
            .then(function (response) {
                let coinCodeArr = [];
                for (let i = 0; i < response.data.length; ++i){
                    let marketTemp = response.data[i].market;
                    if(marketTemp.indexOf('KRW') !== -1){
                        coinCodeArr = [...coinCodeArr, response.data[i]];
                    }
                }
                setCoinCode(coinCodeArr);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    const GetCoinInfo = (coin) => {
        let coinInfoArr = [];
        for(let i = 0; i < 5; ++i){
            const coinInfoOptions = {
                method: 'GET',
                url: 'https://api.upbit.com/v1/ticker?markets='+coin[i].market,
                headers: {accept: 'application/json'}
            };
            axios
                .request(coinInfoOptions)
                .then(function (response) {
                    let temp = response.data[0];
                    temp.korean_name = coin[i].korean_name;
                    coinInfoArr = [...coinInfoArr, temp];
                })
                .catch(function (error) {
                    console.error(error);
                })
                .then(function () {
                    setCoinInfo(coinInfoArr);
                })
        }
        //웹소켓을 이용해야 가능 그러지 않고는 10개만 가능
        // console.log(...url)
        // axios.all([...url])
        //     .then(axios.spread((res1, res2, res3) => {
        //         console.log(res1.data);
        //         console.log(res2.data);
        //         console.log(res3.data);
        //     }))
        //     .catch(function (error) {
        //         console.error(error);
        //     });

    }

    useEffect(() => {
        GetCoinCode();
    },[])

    useEffect(() => {
        if(coinCode.length > 0) GetCoinInfo(coinCode);
    },[coinCode])

    useInterval(() => {
        if(coinCode.length > 0) GetCoinInfo(coinCode);
    },10000)

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
                                        <Typography variant="h4">Popular Stocks</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={HandleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={HandleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={HandleClose}> Today</MenuItem>
                                            <MenuItem onClick={HandleClose}> This Month</MenuItem>
                                            <MenuItem onClick={HandleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/*<Grid item xs={12} sx={{ pt: '16px !important' }}>*/}
                            {/*    <BajajAreaChartCard />*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                {coinInfo &&
                                    coinInfo.map((coin, index) =>
                                        <CoinCardCompnent coin={coin}/>
                                    )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
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
