import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import BackTestContext from "./BackTestContext";
import {CirclesWithBar} from "react-loader-spinner";

const Loading = () => {

    const BackTestContextValue = useContext(BackTestContext);
    const backTestLoading = BackTestContextValue.backTestLoading;

    return(
        <Dialog
            open={backTestLoading}
            fullwidth
            maxWidth={'xs'}
        >
            <DialogContent>
                <CirclesWithBar
                    color="#2196f3"
                    height={100}
                    width={100}/>
            </DialogContent>
        </Dialog>
    )
}

export default Loading