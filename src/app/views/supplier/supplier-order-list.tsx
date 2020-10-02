import React, {useState} from 'react';
import {Button, createStyles, DialogActions, Grid, Paper, Typography} from "@material-ui/core";
import SearchRow from "../shared/SearchRow";
import Container from "@material-ui/core/Container";
import {NavLink} from 'react-router-dom';
import Loader from "../shared/Loader";
import withStyles from "@material-ui/core/styles/withStyles";
import BillProductSelection from "../supplierOrder/bill-product-selection";
import Dialog from "@material-ui/core/Dialog";
import EnhancedTable from "./supplier-order-table";
import {fetchSupplierInfo, solicitSupplierOrder} from "../../actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {makeStyles, Theme} from "@material-ui/core/styles";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ContactMailIcon from "@material-ui/icons/ContactMail";

const useDialogStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogActions: {
            justifyContent: "center",
        },
        contact: {
            padding: theme.spacing(1),
        },
        contactInfo: {
            display: 'flex',
            alignItems: 'center',
        },
        contactText: {
            fontWeight: "bold",
            padding: 2,
            color: theme.palette.text.secondary,
        }
    }),
);

const ViewModal = (props: any) => {
    const classes = useDialogStyles();
    const {order} = props;
    const [open, setOpen] = React.useState(false);
    const {supplierInfo} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const isPending = order.status === 'PENDING';
    const isDelivered = order.status === 'RECEIVED';

    const handleClickOpen = () => {
        if ((!supplierInfo || (supplierInfo && supplierInfo.id !== order.owner_id)) && !isDelivered) {
            dispatch(fetchSupplierInfo(order.owner_id))
        }
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!order) {
        return null;
    }

    function solicitOrder() {
        order.status = 'AWAITING'
        handleClose();
        dispatch(solicitSupplierOrder(order.id));
    }

    return (
        <>
            <Button color={'secondary'} variant={'contained'} size='small' onClick={handleClickOpen}>
                Ver pedido
            </Button>
            <Dialog onClose={handleClose} open={open} maxWidth='lg'>
                <EnhancedTable element={order}/>
                {supplierInfo && !isDelivered ?
                    <Grid className={classes.contact} container>
                        <Grid className={classes.contactInfo} item xs={8}>
                            <ContactMailIcon color='secondary' fontSize={'large'}/>
                            <Typography className={classes.contactText}> {supplierInfo.email}</Typography>
                        </Grid>
                        <Grid className={classes.contactInfo} item xs={4}>
                            <ContactPhoneIcon color='secondary' fontSize={'large'}/>
                            <Typography className={classes.contactText}> {supplierInfo.company_phone}</Typography>
                        </Grid>
                    </Grid>
                    : null}
                {isDelivered ? null :
                    <DialogActions className={classes.dialogActions}>
                        <Button disabled variant='contained' onClick={handleClose} color="secondary">
                            Enviar mail
                        </Button>
                        <Button disabled={!isPending} variant='contained' autoFocus onClick={solicitOrder}
                                color="primary">
                            Ya lo pedi!
                        </Button>
                    </DialogActions>
                }
            </Dialog>
        </>
    )
}

const rowStyles = createStyles({
    received: {
        background: "#CCFFCC",
        padding: '0.4em',
        margin: '10px 2px 5px 2px'
    },
    pending: {
        background: "#FFFFCC",
        padding: '0.4em',
        margin: '10px 2px 5px 2px'
    },
    awaiting: {
        background: "#acedf3",
        padding: '0.4em',
        margin: '10px 2px 5px 2px'
    }
});

const SupplierOrderRow = withStyles(rowStyles)((props: any) => {
    const {classes, order} = props;

    const stateMessage = order.status === 'RECEIVED' ? 'Recibido' : order.status === 'PENDING' ? 'Provisorio' : 'Solicitado'


    return (
        <>
            <Paper
                className={order.status === 'RECEIVED' ? classes.received : order.status === 'PENDING' ? classes.pending : classes.awaiting}>
                <Grid container spacing={1} style={{textAlign: 'left'}}>
                    <Grid item xs={4}><Typography color='primary'>Nombre: {order.owner_summary}</Typography></Grid>
                    <Grid item xs={4}>No. Orden: {order.number} - Fecha: {order.emission_date}</Grid>
                    <Grid item xs={4}>Estado: {stateMessage}</Grid>
                    <Grid item xs={4}>Cant. items:{order.products.length}</Grid>
                    <Grid item xs={4}>Importe: {order.total}</Grid>
                    <Grid container spacing={1} justify="flex-end" alignItems="center">
                        <Grid item xs={4}><ViewModal order={order}/></Grid>
                        {order.status === 'AWAITING' ? <Grid item xs={4}><BillProductSelection order={order}/></Grid> : null}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
});


const SupplierOrderList = ({orders, fetchOrders, success, error, submitting, refreshWithDelay}: IOrdersList) => {
    //New Order management
    React.useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    //Filter text
    const [filterText, setFilterText] = useState('');

    function passesFilter(order: IOrder) {
        return order && order.owner_summary ? !(order.owner_summary.toLowerCase().indexOf(filterText.toLowerCase()) === -1) : false;
    }

    const ordersView = orders ? orders.filter((order) => passesFilter(order))
        .map((order) => (<SupplierOrderRow key={order.id} order={order}/>)) : [];


    function cleanPage() {
        setFilterText('');
    }

    React.useEffect(() => {
        if (error || success) {
            refreshWithDelay();
            cleanPage()
        }
    }, [error, success, refreshWithDelay]);

    return (
        <>
            <Container maxWidth='lg'>
                <Typography variant="h3">Pedidos a proveedores</Typography>
                <div style={{margin: '0.5em'}}>
                    <Button size="small" variant='contained' color='primary'><NavLink to="/supplier-order">Crear
                        orden</NavLink></Button>
                </div>
                <SearchRow filterText={filterText} label={'Buscar pedido'} update={setFilterText}/>
                {ordersView}
            </Container>
            <Loader isLoading={submitting} isSuccess={success} error={error}/>

        </>
    )
}

interface IOrdersList extends IComponent {
    orders?: IOrder[];
    fetchOrders: () => {};
    createReception: (receptionOrderPostData: IReceptionOrderPostData) => void;
}

export default SupplierOrderList;
