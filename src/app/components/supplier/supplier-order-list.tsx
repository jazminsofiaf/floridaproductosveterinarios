import React, {useState} from 'react';
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import SearchRow from "../shared/SearchRow";
import Container from "@material-ui/core/Container";
import {NavLink} from 'react-router-dom';
import UpperBar from "../UpperBar";

function SupplierOrderRow(props: any) {
    const order = props.order;

    return (
        <Paper style={{padding: '0.4em', marginBottom: '10px'}}>
            <Grid container spacing={1} style={{textAlign: 'left'}}>
                <Grid item xs={4}><Typography color='primary'>Nombre: {order.owner_summary}</Typography></Grid>
                <Grid item xs={4}>No. Orden: {order.number} - Fecha: {order.emission_date}</Grid>
                <Grid item xs={4}>Estado: {order.status}</Grid>
                <Grid item xs={4}>Cant. items:{order.products.length}</Grid>
                <Grid item xs={4}>Importe: {order.total}</Grid>
                <Grid item xs={4}><Button size="small" variant='outlined' color='secondary'
                                          onClick={() => props.openModal(order)}>Detalle</Button></Grid>
            </Grid>
        </Paper>
    )
}

const SupplierOrderList = ({ orders, fetchOrders}: IOrdersList) => {
    const [filterText, setFilterText] = useState('');
    React.useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    function clickView(order: ISupplierOrder) {
    }

    function passesFilter(order: ISupplierOrder) {
        return order && order.owner_summary ? !(order.owner_summary.toLowerCase().indexOf(filterText.toLowerCase()) === -1) : false;
    }

    const ordersView = orders ? orders.filter((order) => passesFilter(order))
        .map((order) => (<SupplierOrderRow key={order.id} order={order} openModal={clickView}/>)) : [];

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
            </Container>
        </>
    )
}

interface IOrdersList extends IComponent {
    orders?: ISupplierOrder[];
    fetchOrders: () => {};
}

export default SupplierOrderList;
