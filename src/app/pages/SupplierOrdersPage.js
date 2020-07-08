import React, { useState, useEffect } from 'react';
import SupplierOrderRow from "../components/supplier/SupplierOrderRow"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import UpperBar from "../components/UpperBar";
import CommonModal from "../components/shared/CommonModal"
import CartElementContainer from "../components/cart/CartElementContainer"
import ReceptionModal from "../components/supplier/ReceptionModal"
import SearchRow from "../components/shared/SearchRow"
import axios from 'axios';
import Loader from '../components/shared/Loader'
import { format } from "date-fns"



async function loadSupplierOrders(props) {
    // props.setOrders([{ "id": 1, "name": "Zoovet", "items": [{"id":123, "amount": 3, "name": "prod10", "price": 123}, {"id":1000, "amount": 2, "name": "Super megar nombre de producto", "price": 1000}], "total_cost": 12345, "order_numer": "number", "status": "pending", "emission_date": "17/05/2020" },
    // { "id": 2, "name": "Barandu", "items": [{"id":123, "amount": 1, "name": "prod10", "price": 10}, {"id":1000, "amount": 2, "name": "Super megar nombre de producto", "price": 6}], "total_cost": 12345, "order_numer": "number", "status": "pending", "emission_date": "17/05/2020" }]);
    const options = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Token '+props.token
        }
    };
    try {
        return await axios.get("/suppliers/orders/complete", options)
            .then(function (response) {
                props.setOrders(response.data.order_list);
            })
            .catch(function (error) {
                console.log(error);
            })
    } catch (error) {
        alert("Error, al buscar clientes");
    }
}

function OrderModal(props) {
    const modalOrder = props.modalOrder;

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
                            <Button variant="contained" color="primary" onClick={() => props.openReception()}>Ingresar</Button>
                        </Grid>
                    </>
                    : null
                }
            </Grid>
        </Paper>
    )
}

function SupplierOrdersPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [orders, setOrders] = useState([]);

    useEffect(() => { loadSupplierOrders({ setOrders }) }, [])

    const [modalOrder, setModalOrder] = useState({});
    //Order modal
    const [open, setOpen] = useState(false);
    const [filterText, setFilterText] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    function clickView(order) {
        setModalOrder(order);
        setOpen(true);
    }

    function passesFilter(order) {
        return order && order.owner_summary ? !(order.owner_summary.toLowerCase().indexOf(filterText.toLowerCase()) === -1) : false;
    }

    const ordersView = orders ? orders.filter((order) => passesFilter(order))
        .map((order) => (<SupplierOrderRow key={order.id} order={order} openModal={clickView} />)) : [];

    const orderModal = OrderModal({ modalOrder, openReception });

    //Reception modal
    const [openReceptionModal, setOpenReceptionModal] = useState(false);

    const handleCloseReception = () => {
        setOpenReceptionModal(false);
    };

    function openReception(order) {
        setOpenReceptionModal(true);
    }

    const timer = React.useRef();
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    function cleanPage() {
        setFilterText('');
        setOpen(false);
        setOpenReceptionModal(false);
        setModalOrder({})
    }


    async function sendRequest(values) {
        setLoading(true);
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        values.received_products.forEach((item) => { item.original_price = undefined; item.expiration_date = format(item.expiration_date, "dd/MM/yyyy");});
        const reception = { reception: values };
        try {
            await axios.post('/supplier/order/reception', reception, options);
            setSuccess(true);
            modalOrder.status = 'RECEIVED'
            timer.current = setTimeout(() => {
                cleanPage()
                setLoading(false);
                setSuccess(false);
            }, 1500);
        } catch (error) {
            alert("Error, recepcion invalida.");
        }
    }

    const receptionModal = ReceptionModal({ modalOrder, sendRequest });

    return (
        <>
            <UpperBar />
            <Container maxWidth='lg' style={{ marginTop: "6em" }}>
                <Typography variant="h3">Pedidos a proveedores</Typography>
                <SearchRow filterText={filterText} label={'Buscar pedido'} update={setFilterText} />
                {ordersView}
                <CommonModal render={orderModal} state={open} handleClose={handleClose} />
                <CommonModal render={receptionModal} state={openReceptionModal} handleClose={handleCloseReception} />
            </Container>
            <Loader isLoading={loading} isSuccess={success}/>
        </>
    )
}

export default SupplierOrdersPage;