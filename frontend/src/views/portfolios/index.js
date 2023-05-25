import {Box, Button, Grid, Link, Modal} from '@mui/material';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import * as React from "react";
import AddBotModal from "./AddBotModal";

// ==============================|| TYPOGRAPHY ||============================== //

let totalNetCopyAmount = 320
let totalPortfolioMarginBalance = 3242
let totalRealizedPNL = 3242
let netProfit = 23423
let botname = 'Bot 1'

const Index = () => {

    const [botList, setBotList] = React.useState([
        {
            'name' : 'Bot 1',
            'strategy' : 'A',
            'inputMoney' : 1231245,
            'coin' : 'Bitcoin',

        },
    ]);

    return(
        <div>
            <MainCard>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={3} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                Total Net Copy Amount
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {totalNetCopyAmount}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                Total Portfolio Margin Balance
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {totalPortfolioMarginBalance}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                Total Realized PNL
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {totalRealizedPNL}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={3} align={'center'}>
                        <Grid>
                            <MuiTypography variant="h5" gutterBottom>
                                Net Profit
                            </MuiTypography>
                        </Grid>
                        <Grid>
                            <MuiTypography variant="h2">
                                ￦ {netProfit}
                            </MuiTypography>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <br/>
            <MainCard title="Bot List" secondary={<AddBotModal/>}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12}>
                        <SubCard title={botname} secondary={<MuiTypography>sdfsdf</MuiTypography>}>
                            <Grid container>

                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </MainCard>

        </div>
    )
}

export default Index;
