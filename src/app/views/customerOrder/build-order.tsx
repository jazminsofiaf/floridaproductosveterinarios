import React, {useEffect} from 'react';
import {Grid, Button, Typography, CircularProgress} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import WarningIcon from '@material-ui/icons/Warning';
import {useDispatch} from "react-redux";
import {markAssembledForced} from "../../actions/actions";


function OrderItem(props: any) {
    const item = props.item;

    return (
        <Grid item container xs={12}>
            <Grid item xs={2}>{item.status === 'AVAILABLE' ? <CheckCircleIcon style={{color: 'green'}}/> :
                item.status === 'MISSING' ? <CancelIcon style={{color: 'red'}}/> :
                    <WarningIcon style={{color: 'orange'}}/>}</Grid>
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

const BuildOrder = ({order, assembleInstructions, fetchAssembleInstructions, deliverOrder, markAssembled, handleClose, buildOpen}: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (buildOpen && order && order.status !== "DELIVERED") {
            fetchAssembleInstructions(order.id);
        }
    }, [buildOpen, order, fetchAssembleInstructions])

    if (!order) {
        return null;
    }

    const itemList = assembleInstructions && assembleInstructions.products && assembleInstructions.products.length > 0 ?
        assembleInstructions.products.map((item: IOrderProduct) => (
            <OrderItem key={item.name + item.expiration_view} item={item}/>))
        :
        null;

    const assembleStatus = assembleInstructions && assembleInstructions.status;

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

    function forceAssemble() {
        dispatch(markAssembledForced(order.id));
        order.status = "ASSEMBLED";
        handleClose()
    }

    return (
        <>
            <Typography
                variant='h4'>{order.status === 'DELIVERED' ? "Entregado" : order.status === 'ASSEMBLED' ? "Entrega" : "Armar orden"}</Typography>
            <Grid container spacing={2}>
                <OrderColumns/>
                {itemList ? itemList :
                    <Grid item xs={12} style={{textAlign: 'center'}}>
                        <CircularProgress/>
                    </Grid>
                }
                {order.status === 'ASSEMBLED' ?
                    <Grid item xs={12}><Button variant='outlined' color='primary'
                                               onClick={() => deliver()}>Entregar</Button></Grid> :
                    assembleStatus === 'COMPLETE' ?
                        <Grid item xs={12}><Button variant='outlined' color='primary'
                                                   onClick={() => readyToDeliver()}>Listo, armado!</Button></Grid> :
                        assembleStatus === 'CONFLICTED' ?
                            <>
                                <Grid item xs={12}><Typography variant='h6'>El stock para armar esta orden fue
                                    reservado por ordenes anteriores</Typography></Grid>
                                <Grid item xs={12}><Button variant='outlined' color='primary'
                                                           onClick={() => forceAssemble()}>Forzar
                                    Armado</Button></Grid>
                            </>
                            :
                            null
                }
            </Grid>
        </>
    )
}

export default BuildOrder;