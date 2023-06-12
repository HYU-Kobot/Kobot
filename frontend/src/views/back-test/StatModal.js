import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, InputAdornment,
    TextField, Typography
} from '@mui/material';

// project imports
import * as React from "react";
import {Autocomplete} from "@mui/lab";
import SubCard from "../../ui-component/cards/SubCard";
import {useContext, useState} from "react";
import BackTestContext from "./BackTestContext";

// ==============================|| TYPOGRAPHY ||============================== //

const StatModal = ({botList}) => {


    const BackTestContextValue = useContext(BackTestContext);
    const html = BackTestContextValue.html;
    const statOpen = BackTestContextValue.statOpen;
    const setStatOpen = BackTestContextValue.setStatOpen;
    const setHtml = BackTestContextValue.setHtml;
    const handleOpen = () => setStatOpen(true);
    const handleClose = () => setStatOpen(false);

    return(
        <div>
            <Button onClick={handleOpen}>백테스트 결과</Button>
            <Dialog
                open={statOpen}
                onClose={handleClose}
                fullwidth
                maxWidth={'xl'}
            >
                <DialogTitle>
                    <Typography variant={'h3'}>Setting</Typography>
                </DialogTitle>
                <DialogContent>
                    <div dangerouslySetInnerHTML={{__html: html}} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={'error'}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default StatModal;
