import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography'
import PaymentIcon from "@material-ui/icons/Payment";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import PaymentForm from "./payment-form";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";

interface IPayment {
    action: any
}

export default function Payment(props: IPayment) {
    const [open, setOpen] = useState(false);
    const {action} = props;

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function onSubmit(values: any) {
        action(values)
        handleClose();
    }

    return (
        <>
            <Tooltip title="Ingresar pago">
                <IconButton onClick={handleOpen}>
                    <PaymentIcon color={"secondary"}/>
                    <Typography variant="subtitle1" color={"secondary"}>Pago</Typography>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><Typography variant="subtitle1" color={"secondary"}>Ingresar
                    Pago</Typography></DialogTitle>
                <DialogContent>
                    <PaymentForm handleClose={handleClose} submit={onSubmit}/>
                </DialogContent>
            </Dialog>
        </>
    )


}