import React from 'react';
import { Paper, Button, Grid, Typography } from '@material-ui/core';

function SupplierOrderRow(props) {
    const order = props.order;

    return (
        <Paper style={{padding: '0.4em', marginBottom:'10px'}}>
            <Grid container spacing={1} style={{textAlign:'left'}}>
                <Grid item xs={4}><Typography color='primary'>Nombre: {order.owner_summary}</Typography></Grid>
                <Grid item xs={4}>No. Orden: {order.number} - Fecha: {order.emission_date}</Grid>
                <Grid item xs={4}>Estado: {order.status}</Grid>
                <Grid item xs={4}>Cant. items:{order.products.length}</Grid>
                <Grid item xs={4}>Importe: {order.total}</Grid>
                <Grid item xs={4}><Button size="small" variant='outlined' color='secondary' onClick={() => props.openModal(order)}>Detalle</Button></Grid>
            </Grid>
        </Paper>
    )
}

export default SupplierOrderRow;