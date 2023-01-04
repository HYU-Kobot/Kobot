import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField, Typography
} from '@mui/material';

// project imports
import * as React from "react";
import SubCard from "../../ui-component/cards/SubCard";

// ==============================|| TYPOGRAPHY ||============================== //

const BotTemplate = ({bot}) => {

    return(
        <Grid item xs={12} sm={12}>
            <SubCard title={bot.name} secondary={<Typography>sdfsdf</Typography>}>
                <Grid container>

                </Grid>
            </SubCard>
        </Grid>
    )
}

export default BotTemplate;
