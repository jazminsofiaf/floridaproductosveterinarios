import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';

const errorPrompt = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <Fab
                aria-label="save"
                color="primary"
            >
                <ErrorIcon/>
            </Fab>
        </div>
    )
}

const successPrompt = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <Fab
                aria-label="save"
                color="secondary"
            >
                <CheckIcon/>
            </Fab>
        </div>
    )
}


function Loader(props) {
    const open = props.isLoading;
    const success = props.isSuccess;
    const error = props.error;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!open && !error && !success) {
        return null;
    }

    const showLoading = open && !error && !success;
    const showError = error && !success;

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title">{showLoading ? "Cargando, espere unos segundos por favor..." :  showError ? "Se produjo un error!" : "Carga exitosa!"}</DialogTitle>
                <DialogContent>
                    {showLoading ? <LinearProgress color="secondary" style={{height: "0.6em"}}/> : showError? errorPrompt() : successPrompt()}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Loader;