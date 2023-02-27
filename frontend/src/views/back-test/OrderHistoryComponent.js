import {Avatar, Divider, Grid, Typography} from "@mui/material";
import {HorizontalRule} from "@mui/icons-material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {useTheme} from "@mui/material/styles";

const OrderHistoryComponent = ({order}) => {

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
                        <Grid container direction="column" xs={9} md={9}>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h5" color="inherit">
                                            {order.coin_category}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" color="success.dark">
                                            {order.amount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h5" color="inherit">
                                            {order.trade_date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" color="success.dark">
                                            {order.category}
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
                        <Grid container direction="column" xs={9} md={9}>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h5" color="inherit">
                                            {order.coin_category}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" color="orange.dark">
                                            {order.amount}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h5" color="inherit">
                                            {order.trade_date}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5" color="orange.dark">
                                            {order.category}
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

export default OrderHistoryComponent