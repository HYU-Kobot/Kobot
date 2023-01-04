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

// ==============================|| TYPOGRAPHY ||============================== //

const options = ['Bitcoin', 'Ethereum', 'Ripple'];
const strategyList = ['A', 'B', 'C'];

const AddBotModal = ({botList}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [coinValue, setCoinValue] = React.useState(options[0]);
    const [coinInputValue, setCoinInputValue] = React.useState('');
    const [strategyValue, setStrategyValue] = React.useState(strategyList[0]);
    const [strategyInputValue, setStrategyInputValue] = React.useState('');

    const strategySetting = (strategy) => {
        console.log(strategy)
        switch (strategy){
            case strategyList[0]:
                return(
                    <Grid xs={12} sm={12}>
                        <TextField
                            margin="normal"
                            id="A_param_1"
                            label="A-Parameter-1"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                            required
                        />
                    </Grid>
                )
            case strategyList[1]:
                return(
                    <Grid xs={12} sm={12}>
                        <TextField
                            margin="normal"
                            id="B_param_1"
                            label="B-Parameter-1"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                            required
                        />
                    </Grid>
                )
            case strategyList[2]:
                return(
                    <Grid xs={12} sm={12}>
                        <TextField
                            margin="normal"
                            id="C_param_1"
                            label="C-Parameter-1"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                            required
                        />
                    </Grid>
                )
            default:
                return(
                    <Grid xs={12} sm={12}>
                        <Typography align={'center'} variant={'h3'}>전략을 선택해주세요.</Typography>
                    </Grid>
                )
        }

    }

    return(
        <div>
            <Button onClick={handleOpen}>Add Bot</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    <Typography variant={'h3'}>Setting</Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid xs={12} sm={12}>
                            <TextField
                                margin="normal"
                                id="bot_name"
                                label="Bot Name"
                                fullWidth
                                variant="standard"
                                autoComplete='off'
                                required
                            />
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <Autocomplete
                                value={coinValue}
                                onChange={(event, newValue) => {
                                    setCoinValue(newValue);
                                }}
                                inputValue={coinInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setCoinInputValue(newInputValue);
                                }}
                                id="coin_select"
                                options={options}
                                renderInput={(params) => <TextField {...params} label="Coin" margin="normal" variant={"standard"} fullWidth required />}
                            />
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <TextField
                                margin="normal"
                                id="inputMoney"
                                label="입금액"
                                type={'number'}
                                fullWidth
                                variant="standard"
                                autoComplete='off'
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">￦</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid xs={12} sm={12}>
                            <Autocomplete
                                value={strategyValue}
                                onChange={(event, newValue) => {
                                    setStrategyValue(newValue);
                                }}
                                inputValue={strategyInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setStrategyInputValue(newInputValue);
                                }}
                                id="strategy_select"
                                options={strategyList}
                                renderInput={(params) => <TextField {...params} label="Strategy" margin="normal" variant={"standard"} fullWidth required />}
                            />
                        </Grid>
                        {strategySetting(strategyValue)}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button type={"submit"}>Add</Button>
                    <Button onClick={handleClose} color={'error'}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddBotModal;
