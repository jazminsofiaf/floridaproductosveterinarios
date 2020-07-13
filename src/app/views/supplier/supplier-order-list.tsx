import React, {useState} from 'react';
import {Button, createStyles, Grid, Paper, Typography} from "@material-ui/core";
import SearchRow from "../shared/SearchRow";
import Container from "@material-ui/core/Container";
import {NavLink} from 'react-router-dom';
import UpperBar from "../upperBar/UpperBar";
import {format} from "date-fns";
import CartElementContainer from "../cart/CartElementContainer";
import CommonModal from "../shared/CommonModal";
import CreateReception from "./create-reception";
import Loader from "../shared/Loader";
import withStyles from "@material-ui/core/styles/withStyles";


function OrderModal(props: any) {
    const modalOrder = props.modalOrder;
    if (!modalOrder) {
        return null;
    }

    return (
        <Paper>
            <Grid container spacing={1}>
                <Grid container item style={{ textAlign: 'left' }}>
                    <Grid item xs={8}>
                        <div>{modalOrder.owner_summary ? <div>{modalOrder.owner_summary}</div> : <div>Nothing selected</div>}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div>{modalOrder.status}</div>
                    </Grid>
                    <Grid item xs={8}>
                        <div>{modalOrder.order_numer}</div>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CartElementContainer elements={modalOrder.products} />
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
                            <Button variant="contained" color="primary" onClick={() => props.openReception(modalOrder)}>Ingresar</Button>
                        </Grid>
                    </>
                    : null
                }
            </Grid>
        </Paper>
    )
}

const rowStyles = createStyles({
    received: { background: "#CCFFCC",
        padding: '0.4em',
        margin: '10px 2px 5px 2px'},
    pending: { background: "#FFFFCC",
        padding: '0.4em',
        margin: '10px 2px 5px 2px'}
});

const SupplierOrderRow = withStyles(rowStyles)((props: any) => {
    const { classes, order } = props;

    return (
        <Paper className={order.status === 'RECEIVED' ? classes.received : classes.pending}>
            <Grid container spacing={1} style={{textAlign: 'left'}}>
                <Grid item xs={4}><Typography color='primary'>Nombre: {order.owner_summary}</Typography></Grid>
                <Grid item xs={4}>No. Orden: {order.number} - Fecha: {order.emission_date}</Grid>
                <Grid item xs={4}>Estado: {order.status}</Grid>
                <Grid item xs={4}>Cant. items:{order.products.length}</Grid>
                <Grid item xs={4}>Importe: {order.total}</Grid>
                <Grid item xs={4}><Button size="small" variant='contained' color='secondary'
                                          onClick={() => props.openModal(order)}>Detalle</Button></Grid>
            </Grid>
        </Paper>
    )
});


const SupplierOrderList = ({ orders, fetchOrders, success, createReception, error}: IOrdersList) => {
    //New Order management
    React.useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    //Post state
    const [load, setLoading] = useState(false);
    const [succ, setSucc] = useState(false);
    const [err, setErr] = useState(false);


    //Filter text
    const [filterText, setFilterText] = useState('');

    //Order modal
    const [modalOrder, setModalOrder] = useState<IOrder>();
    const [open, setOpen] = useState(false);

    let orderModal = OrderModal({ modalOrder, openReception });

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

    const receptionModal = CreateReception({ modalOrder, sendRequest });;
    function openReception(order: IOrder) {
        setOpenReceptionModal(true);
    }

    async function sendRequest(values: any) {
        setLoading(true);
        values.received_products.forEach((item: any) => { item.original_price = undefined; item.expiration_date = format(item.expiration_date, "dd/MM/yyyy");});
        createReception({
            order_id: values.order_id,
            bill_number: values.bill_number,
            bill_type: values.bill_type,
            gross_revenue: true,
            received_products: values.received_products,
            total: values.total
        })
    }

    function cleanPage() {
        setFilterText('');
        setOpen(false);
        setOpenReceptionModal(false);
        setModalOrder(undefined)
    }

    React.useEffect(() => {
        if(success) {
            setSucc(true)
            if (modalOrder) {
                modalOrder.status = 'RECEIVED'
            }
            setTimeout(() => {
                setLoading(false);
                setSucc(false);
                cleanPage()
            }, 1500);
        }
    }, [success, modalOrder]);

    React.useEffect(() => {
        if(error) {
            setErr(true);
            setTimeout(() => {
                setLoading(false);
                setErr(false);
                cleanPage()
            }, 1500);
        }
    }, [error]);

    return (
        <>
            <UpperBar />
            <Container maxWidth='lg' style={{marginTop: "6em"}}>
                <Typography variant="h3">Pedidos a proveedores</Typography>
                <div style={{margin:'0.5em'}}>
                    <Button size="small" variant='contained' color='primary'><NavLink to="/new-order">Crear
                        orden</NavLink></Button>
                </div>
                <SearchRow filterText={filterText} label={'Buscar pedido'} update={setFilterText}/>
                {ordersView}
                {orderModal ? <CommonModal render={orderModal} state={open} handleClose={handleClose} /> : null }
                {receptionModal ? <CommonModal render={receptionModal} state={openReceptionModal} handleClose={handleCloseReception} /> : null }
            </Container>
            <Loader isLoading={load} isSuccess={succ} error={err} />

        </>
    )
}

interface IOrdersList extends IComponent {
    orders?: IOrder[];
    fetchOrders: () => {};
    createReception: (receptionOrderPostData: IReceptionOrderPostData) => void;
}

export default SupplierOrderList;
