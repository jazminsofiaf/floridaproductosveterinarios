import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


async function deliverOrder(props) {
    const orderId = props.order.id;
    props.order.status = "DELIVERED";
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const endpointDelivery = "/orders/" + orderId + "/deliver"
        await axios.put(endpointDelivery, options);
        alert("Orden entregada con exito.");
    } catch (error) {
        alert("Error, algo fallo al entregar la orden.");
    }
}

async function getAssembleSpecifications(props) {
    const orderId = props.order.id;
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const assembleSepecificationsEndpoint = "/orders/" + orderId + "/assemble-specifications"
        await axios.get(assembleSepecificationsEndpoint, options)
            .then(function (response) {
                props.setAssembleSpecifications(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    } catch (error) {
        alert("Error, algo fallo al buscar el modo de armado de la orden.");
    }
}

async function readyToDeliver(props) {
    const orderId = props.order.id;
    props.order.status = "ASSEMBLED";
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        const assembledEndpoint = "/orders/" + orderId + "/assembled"
        await axios.put(assembledEndpoint, options);
        alert("Orden armada con exito.");
    } catch (error) {
        alert("Error, algo fallo al armar la orden.");
    }
}

function OrderItem(props) {
    const item = props.item;
    return (
        <Grid item container xs={12}>
            <Grid item xs={2}>{item.status === 'AVAILABLE' ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'red' }} />}</Grid>
            <Grid item xs={5}>{item.name}</Grid>
            <Grid item xs={2}>{item.amount}</Grid>
            <Grid item xs={3}>{item.expiration_view}</Grid>
        </Grid>
    )
}

function BuildOrder(props) {
    const [assembleSpecifications, setAssembleSpecifications] = useState();
    const order = props.selectedOrder;
    let history = useHistory();
    console.log(order);

    useEffect(() => {
        if (order) {
            getAssembleSpecifications({ setAssembleSpecifications, order });
        }
    }, [order])

    if (!order) {
        return null;
    }

    const itemList = assembleSpecifications && assembleSpecifications.products ? assembleSpecifications.products.map((item) => (
        <OrderItem key={item.name + item.expiration_view} item={item} />
    )) : [];

    const readyToAssemble = assembleSpecifications && assembleSpecifications.products ? assembleSpecifications.products.map((item) => (
        item.status === 'AVAILABLE')).reduce((acc, next) => acc && next) : [];

    return (
        // <Paper style={{ padding: '10px' }}>
        <>
            <Typography variant='h4'>{order.status === 'DELIVERED' ? "Entregado" : order.status === 'ASSEMBLED' ? "Entrega" : "Armar orden"}</Typography>
            <Grid container spacing={2}>
                <Grid item container xs={12} style={{ fontWeight: 'bold' }}>
                    <Grid item xs={2}>Estado</Grid>
                    <Grid item xs={5}>Producto</Grid>
                    <Grid item xs={2}>Cant.</Grid>
                    <Grid item xs={3}>Vencimiento</Grid>
                </Grid>
                {itemList}
                {order.status === 'ASSEMBLED' ?
                    <Grid item xs={12}><Button variant='outlined' color='primary' onClick={() => deliverOrder({ order, history})}>Entregar</Button></Grid> :
                    order.status === 'COMPLETE' ?
                        <Grid item xs={12}><Button variant='outlined' color='primary' disabled={!readyToAssemble} onClick={() => readyToDeliver({ order, history})}>Listo, armado!</Button></Grid> :
                        null
                }
            </Grid>
        </>
        // </Paper>
    )
}

export default BuildOrder;