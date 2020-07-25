import React, {useState} from 'react';
import {Button, createStyles, Grid, Paper, Typography} from "@material-ui/core";
import SearchRow from "../shared/SearchRow";
import Container from "@material-ui/core/Container";
import {NavLink} from 'react-router-dom';
import UpperBar from "../upperBar/UpperBar";
import CartElementContainer from "../cart/CartElementContainer";
import CommonModal from "../shared/CommonModal";
import CreateReception from "./create-reception";
import Loader from "../shared/Loader";
import withStyles from "@material-ui/core/styles/withStyles";
import SupplierSolicitView from "./supplier-solicit-view";


function OrderModal(props: any) {
    const modalOrder = props.modalOrder;
    if (!modalOrder) {
        return null;
    }

    return (
        <Paper>
            <Grid container spacing={1}>
                <Grid container item style={{textAlign: 'left'}}>
                    <Grid item xs={8}>
                        <div>{modalOrder.owner_summary ? <div>{modalOrder.owner_summary}</div> :
                            <div>Nothing selected</div>}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>{modalOrder.status}</div>
                    </Grid>
                    <Grid item xs={8}>
                        <div>{modalOrder.order_numer}</div>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CartElementContainer elements={modalOrder.products}/>
                </Grid>
                {modalOrder.status !== 'RECEIVED' ?
                    <>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary">Editar</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary">Eliminar</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary"
                                    onClick={() => props.openReception(modalOrder)}>Ingresar</Button>
                        </Grid>
                    </>
                    : null
                }
            </Grid>
        </Paper>
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
            <Paper className={order.status === 'RECEIVED' ? classes.received : order.status === 'PENDING' ? classes.pending : classes.awaiting}>
                <Grid container spacing={1} style={{textAlign: 'left'}}>
                    <Grid item xs={4}><Typography color='primary'>Nombre: {order.owner_summary}</Typography></Grid>
                    <Grid item xs={4}>No. Orden: {order.number} - Fecha: {order.emission_date}</Grid>
                    <Grid item xs={4}>Estado: {stateMessage}</Grid>
                    <Grid item xs={4}>Cant. items:{order.products.length}</Grid>
                    <Grid item xs={4}>Importe: {order.total}</Grid>
                    <Grid item xs={4}></Grid>
                    {order.status === 'PENDING' ? <Grid item xs={4}></Grid> : <Grid item xs={8}></Grid>}
                    <Grid item xs={4}><Button size="small" variant='contained' color='secondary'
                                              onClick={() => props.openModal(order)}>Ver</Button></Grid>
                    {order.status === 'PENDING' ?
                        <Grid item xs={4}><SupplierSolicitView order={order}/></Grid>
                        : null}
                </Grid>
            </Paper>
        </>
    )
});


const SupplierOrderList = ({orders, fetchOrders, success, createReception, error, submitting, refreshWithDelay}: IOrdersList) => {
    //New Order management
    React.useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    //Filter text
    const [filterText, setFilterText] = useState('');

    //Order modal
    const [modalOrder, setModalOrder] = useState<IOrder>();
    const [open, setOpen] = useState(false);

    let orderModal = OrderModal({modalOrder, openReception});

    const handleClose = () => {
        setOpen(false);
    };

    function clickView(order: IOrder) {
        setModalOrder(order);
        setOpen(true);
    }

    function passesFilter(order: IOrder) {
        return order && order.owner_summary ? !(order.owner_summary.toLowerCase().indexOf(filterText.toLowerCase()) === -1) : false;
    }

    const ordersView = orders ? orders.filter((order) => passesFilter(order))
        .map((order) => (<SupplierOrderRow key={order.id} order={order} openModal={clickView}/>)) : [];


    //ReceptionItems modal
    const [openReceptionModal, setOpenReceptionModal] = useState(false);

    const handleCloseReception = () => {
        setOpenReceptionModal(false);
    };

    const receptionModal = CreateReception({modalOrder, sendRequest});
    ;

    function openReception(order: IOrder) {
        setOpenReceptionModal(true);
    }

    function sendRequest(values: any) {
        createReception(values);
    }

    function cleanPage() {
        setFilterText('');
        setOpen(false);
        setOpenReceptionModal(false);
        setModalOrder(undefined)
    }

    React.useEffect(() => {
        if (error || success) {
            if (success && modalOrder) {
                modalOrder.status = 'RECEIVED'
            }
            refreshWithDelay();
            cleanPage()
        }
    }, [error, success, modalOrder, refreshWithDelay]);

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
                {orderModal ? <CommonModal render={orderModal} state={open} handleClose={handleClose}/> : null}
                {receptionModal ? <CommonModal render={receptionModal} state={openReceptionModal}
                                               handleClose={handleCloseReception}/> : null}
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
