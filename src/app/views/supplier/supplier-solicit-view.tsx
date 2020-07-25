import React from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import {fetchSupplierInfo, solicitSupplierOrder} from "../../actions/actions";

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

function SupplierSolicitView({order}: any) {
    const {supplierInfo} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        dispatch(fetchSupplierInfo(order.owner_id))
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function solicitOrder() {
        order.status = 'AWAITING'
        handleClose();
        dispatch(solicitSupplierOrder(order.id));
    }

    return (
        <div>
            <Button size="small" variant='contained' color='secondary' onClick={handleClickOpen}>
                Solicitar
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {order.owner_summary}
                </DialogTitle>
                <DialogContent dividers>
                    {supplierInfo ?
                        <>
                            <Typography variant={'h5'}>Tel.: {supplierInfo.company_phone}</Typography>
                            <Typography variant={'h5'}>Email: {supplierInfo.email}</Typography>
                        </>
                        : null}
                    <Typography variant={'h5'}>--Productos--</Typography>
                    {order.products.map((item: IOrderProduct) => (
                        <div key={item.name}>
                            <Typography
                                gutterBottom>{item.amount + " - " + item.name + " - $" + item.price}</Typography>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button disabled variant='contained' onClick={handleClose} color="secondary">
                        Enviar mail
                    </Button>
                    <Button variant='contained' autoFocus onClick={solicitOrder} color="primary">
                        Ya lo pedi!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SupplierSolicitView;