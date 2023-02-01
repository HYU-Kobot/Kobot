import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import CoinChartCard from "./CoinChartCard";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={9}>
                <Grid container spacing={gridSpacing}>
                    {/*<Grid item lg={6} md={6} sm={6} xs={12}>*/}
                    {/*    <EarningCard isLoading={isLoading} />*/}
                    {/*</Grid>*/}
                    {/*<Grid item lg={6} md={6} sm={6} xs={12}>*/}
                    {/*    <TotalOrderLineChartCard isLoading={isLoading} />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} md={12}>
                        <CoinChartCard/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
