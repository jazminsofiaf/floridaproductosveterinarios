import React, {useEffect} from 'react';
import {Grid, Button, Typography, CircularProgress} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


function OrderItem(props: any) {
    const item = props.item;
    return (
        <Grid item container xs={12}>
            <Grid item xs={2}>{item.status === 'AVAILABLE' ? <CheckCircleIcon style={{color: 'green'}}/> : <CancelIcon style={{color: 'red'}}/>}</Grid>
            <Grid item xs={5}>{item.name}</Grid>
            <Grid item xs={2}>{item.amount}</Grid>
            <Grid item xs={3}>{item.expiration_view}</Grid>
        </Grid>
    )
}

function OrderDeliveredItem(props: any) {
    const item = props.item;
    return (
        <Grid item container xs={12}>
            <Grid item xs={7}>{item.name}</Grid>
            <Grid item xs={2}>{item.amount}</Grid>
            <Grid item xs={3}>{item.expiration_view}</Grid>
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
        assembleInstructions.products.map((item: IOrderProduct) => (<OrderItem key={item.name + item.expiration_view} item={item}/>))
        :
        order.status === "DELIVERED"? order.products.map((item: IOrderProduct) => (<OrderDeliveredItem key={item.name + item.expiration_view} item={item}/>))
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
        // <Paper style={{ padding: '10px' }}>
        <>
            <Typography
                variant='h4'>{order.status === 'DELIVERED' ? "Entregado" : order.status === 'ASSEMBLED' ? "Entrega" : "Armar orden"}</Typography>
            <Grid container spacing={2}>
                <Grid item container xs={12} style={{fontWeight: 'bold'}}>
                    {order.status !== 'DELIVERED' ? <Grid item xs={2}>Estado</Grid> : null}
                    {order.status !== 'DELIVERED' ? <Grid item xs={5}>Producto</Grid> :
                        <Grid item xs={7}>Producto</Grid>}
                    <Grid item xs={2}>Cant.</Grid>
                    <Grid item xs={3}>Vencimiento</Grid>
                </Grid>
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
        // </Paper>
    )
}

// interface IBuildOrder {
//     order: IOrder;
//     deliverOrder: (id: string) => void;
//     assembleInstructions: IOrder;
//     fetchAssembleInstructions: (id: string) => {};
//     markAssembled: (id: string) => {};
// }

export default BuildOrder;