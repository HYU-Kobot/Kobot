import {Avatar, Divider, Grid, Typography} from "@mui/material";
import {HorizontalRule} from "@mui/icons-material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {useTheme} from "@mui/material/styles";

const CoinCardCompnent = ({coin}) => {
    const theme = useTheme();

    switch (coin.change){
        case "RISE":
            return(
                <>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4" color="inherit">
                                        {coin.korean_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                {coin.trade_price}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '5px',
                                                    backgroundColor: theme.palette.success.light,
                                                    color: theme.palette.success.dark,
                                                    ml: 2
                                                }}
                                            >
                                                <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                        +{(coin.change_rate * 100).toFixed(2)}%
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="caption" color="inherit">
                                                {(coin.acc_trade_price_24h / 1000000).toFixed(0)}백만
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                </>
            )
        case "FALL":
            return(
                <>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4" color="inherit">
                                        {coin.korean_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                {coin.trade_price}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '5px',
                                                    backgroundColor: theme.palette.orange.light,
                                                    color: theme.palette.orange.dark,
                                                    ml: 2
                                                }}
                                            >
                                                <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'orange.dark' }}>
                                        -{(coin.change_rate * 100).toFixed(2)}%
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="caption" color="inherit">
                                                {(coin.acc_trade_price_24h / 1000000).toFixed(0)}백만
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                </>
            )
        default:
            return(
                <>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h4" color="inherit">
                                        {coin.korean_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="subtitle1" color="inherit">
                                                {coin.trade_price}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '5px',
                                                    backgroundColor: theme.palette.text.hint,
                                                    color: theme.palette.text.secondary,
                                                    ml: 2
                                                }}
                                            >
                                                <HorizontalRule fontSize="small" color="inherit" />
                                            </Avatar>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                        0%
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item>
                                            <Typography variant="caption" color="inherit">
                                                {(coin.acc_trade_price_24h / 1000000).toFixed(0)}백만
                                            </Typography>
                                        </Grid>
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

export default CoinCardCompnent