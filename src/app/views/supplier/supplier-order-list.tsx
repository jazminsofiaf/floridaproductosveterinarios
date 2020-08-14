import React, {useState} from 'react';
import {Button, createStyles, Grid, Paper, Typography} from "@material-ui/core";
import SearchRow from "../shared/SearchRow";
import Container from "@material-ui/core/Container";
import {NavLink} from 'react-router-dom';
import UpperBar from "../upperBar/UpperBar";
import CartElementContainer from "../cart/CartElementContainer";
import Loader from "../shared/Loader";
import withStyles from "@material-ui/core/styles/withStyles";
import SupplierSolicitView from "./supplier-solicit-view";
import BillProductSelection from "../supplierOrder/bill-product-selection";
import Dialog from "@material-ui/core/Dialog";


const ViewModal = (props: any) => {
    const {order} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    if (!order) {
        return null;
    }

    return (
        <>
            <Button color={'secondary'} variant={'contained'} size='small' onClick={handleClickOpen}>
                Ver pedido
            </Button>
            <Dialog onClose={handleClose} open={open} maxWidth='lg'>
                <Grid container spacing={1} style={{padding:"1em"}}>
                    <Grid container item style={{textAlign: 'left'}}>
                        <Grid item xs={8}>
                            <div>{order.owner_summary ? <div>{order.owner_summary}</div> :
                                <div>Nothing selected</div>}</div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>{order.status}</div>
                        </Grid>
                        <Grid item xs={8}>
                            <div>{order.number}</div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <CartElementContainer elements={order.products}/>
                    </Grid>
                    {order.status !== 'RECEIVED' ?
                        <>
                            <Grid item xs={2}/>
                            <Grid item xs={4}>
                                <Button variant="contained" color="primary">Editar</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="primary">Eliminar</Button>
                            </Grid>
                            <Grid item xs={2}/>
                        </>
                        : null
                    }
                </Grid>
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
                    <Grid item xs={4}></Grid>
                    {order.status === 'PENDING' || order.status === 'AWAITING' ? <Grid item xs={4}></Grid> :
                        <Grid item xs={8}></Grid>}
                    <Grid item xs={4}><ViewModal order={order}/></Grid>
                    {order.status === 'PENDING' ?
                        <Grid item xs={4}><SupplierSolicitView order={order}/></Grid>
                        : order.status === 'AWAITING' ?
                            <Grid item xs={4}><BillProductSelection order={order}/></Grid> : null}
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
            <UpperBar/>
            <Container maxWidth='lg' style={{marginTop: "6em"}}>
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
