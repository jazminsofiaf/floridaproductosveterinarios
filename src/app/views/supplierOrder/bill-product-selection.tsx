import React from 'react'
import CreateSupplierBill from "./create-supplier-bill";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        placeContent: 'space-evenly'
    },
}))(MuiDialogActions);

export default function BillProductSelection(order: any) {
    const [open, setOpen] = React.useState(false);
    const [selectedOrder, setSelected] = React.useState()

    const handleClickOpen = () => {
        if (order){
            setSelected(order)
        };
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div style={{width:'100%'}}>
            <Button size="small" variant='contained' color='secondary' onClick={handleClickOpen}>
                Ingresar
            </Button>
            <Dialog onClose={handleClose} open={open} maxWidth='xl'>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {selectedOrder ? 'Ingreso mercaderia de: ' + order.order.owner_summary : null}
                </DialogTitle>
                <DialogContent dividers>
                    {selectedOrder ? <CreateSupplierBill selectedOrder={selectedOrder} />: null}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="secondary">
                        cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}