import {Avatar, Divider, Grid, Typography} from "@mui/material";
import {HorizontalRule} from "@mui/icons-material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {useTheme} from "@mui/material/styles";

const PortfolioOrderHistory = ({order}) => {

    switch (order.category){
        case "BUY":
            return(
                <>
                    <Grid container>
                        <Grid container alignItems="center" xs={2} md={2}>
                            <Grid item>
                                <Typography variant="h3" color="success.dark">
                                    매수
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider orientation="vertical" flexItem/>
                        <Grid textAlign={'center'} container direction="column" xs={9} md={9}>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={6} marginBottom={'5px'}>
                                        <Typography variant="subtitle2" color="inherit">
                                            코인 페어
                                        </Typography>
                                        <Typography variant="h5" color="inherit">
                                            {order.market}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            코인 갯수
                                        </Typography>
                                        <Typography variant="h5" color="inherit">
                                            {order.amount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            거래 일시
                                        </Typography>
                                        <Typography variant="h5" color="inherit">
                                            {order.tradeDate}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            코인 가격
                                        </Typography>
                                        <Typography variant="h5" color="success.dark">
                                            \ {order.price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 1.5 }} />
                </>
            )
        case "SELL":
            return(
                <>
                    <Grid container>
                        <Grid container alignItems="center" xs={2} md={2}>
                            <Grid item>
                                <Typography variant="h3" color="orange.dark">
                                    매도
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider orientation="vertical" flexItem/>
                        <Grid textAlign={"center"} container direction="column" xs={9} md={9}>
                            <Grid item marginBottom={'5px'}>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            코인 페어
                                        </Typography>
                                        <Typography variant="h5" color="inherit">
                                            {order.market}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            코인 갯수
                                        </Typography>
                                        <Typography variant="h5" color="inherit">
                                            {order.amount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            거래 일시
                                        </Typography>
                                        <Typography variant="h5" color="inherit">
                                            {order.tradeDate}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="subtitle2" color="inherit">
                                            코인 가격
                                        </Typography>
                                        <Typography variant="h5" color="orange.dark">
                                            \ {order.price}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 1.5 }} />
                </>
            )
    }

}

export default PortfolioOrderHistory