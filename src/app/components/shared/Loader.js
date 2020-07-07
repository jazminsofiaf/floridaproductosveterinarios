import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';


function Loader(props) {
    const open = props.isLoading;
    const success = props.isSuccess;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{open && !success ? "Cargando, espere unos segundos por favor..." : "Carga exitosa!"}</DialogTitle>
                <DialogContent>
                    {open && !success ? <LinearProgress color="secondary" style={{ height: "0.6em" }} />
                        :
                        <div style={{ textAlign: 'center' }}>
                            <Fab
                                aria-label="save"
                                color="secondary"
                            >
                                <CheckIcon />
                            </Fab>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Loader;