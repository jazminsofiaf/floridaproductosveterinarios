import React, {useEffect} from 'react';
import {Grid, Button, Typography, CircularProgress} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


function OrderItem(props: any) {
    const item = props.item;
    console.log("ITEM: " + JSON.stringify(item, null, 2))
    return (
        <Grid item container xs={12}>
            <Grid item xs={2}>{item.status === 'AVAILABLE' ? <CheckCircleIcon style={{color: 'green'}}/> :
                <CancelIcon style={{color: 'red'}}/>}</Grid>
            <Grid item xs={6}>{item.name}</Grid>
            <Grid item xs={1}>{item.amount}</Grid>
            <Grid item xs={3}>{item.expiration_view}</Grid>
        </Grid>
    )
}

function OrderColumns() {
    return (
        <Grid item container xs={12} style={{fontWeight: 'bold'}}>
            <Grid item xs={2}>Status</Grid>
            <Grid item xs={6}>Producto</Grid>
            <Grid item xs={1}>Cant.</Grid>
            <Grid item xs={3}>Vencimiento</Grid>
        </Grid>
    )
}

const BuildOrder = ({order, assembleInstructions, fetchAssembleInstructions, deliverOrder, markAssembled, handleClose}: any) => {
    useEffect(() => {
        if (order && order.status !== "DELIVERED") {
            fetchAssembleInstructions(order.id);
        }
    }, [order, fetchAssembleInstructions])

    if (!order) {
        return null;
    }

    const itemList = assembleInstructions && assembleInstructions.products && assembleInstructions.products.length > 0 ?
        assembleInstructions.products.map((item: IOrderProduct) => (
            <OrderItem key={item.name + item.expiration_view} item={item}/>))
        :
            null;

    const isReadyToAssemble = assembleInstructions && assembleInstructions.products && assembleInstructions.products.length > 0 ? assembleInstructions.products.map((item: IOrderProduct) => (
        item.status === 'AVAILABLE')).reduce((acc: boolean, next: boolean) => acc && next) : false;

    function deliver() {
        deliverOrder(order.id);
        order.status = "DELIVERED";
        handleClose();
    }

    function readyToDeliver() {
        markAssembled(order.id);
        order.status = "ASSEMBLED";
        handleClose()
    }

    return (
        <>
            <Typography
                variant='h4'>{order.status === 'DELIVERED' ? "Entregado" : order.status === 'ASSEMBLED' ? "Entrega" : "Armar orden"}</Typography>
            <Grid container spacing={2}>
                <OrderColumns />
                {itemList ? itemList :
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <CircularProgress/>
                    </Grid>
                }
                {order.status === 'ASSEMBLED' ?
                    <Grid item xs={12}><Button variant='outlined' color='primary'
                                               onClick={() => deliver()}>Entregar</Button></Grid> :
                    order.status === 'COMPLETE' ?
                        <Grid item xs={12}><Button variant='outlined' color='primary' disabled={!isReadyToAssemble}
                                                   onClick={() => readyToDeliver()}>Listo, armado!</Button></Grid> :
                        null
                }
            </Grid>
        </>
    )
}

export default BuildOrder;