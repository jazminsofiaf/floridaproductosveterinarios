import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";


function OrderRow(props) {
    const {classes} = props;
    const order = props.order;

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={1} className={classes.orderInfo}>
                <Grid item xs={4}>NroPedido: {order ? order.number : ''}</Grid>
                <Grid item xs={4}>Emision: {order ? order.emission_date : ''}</Grid>
                <Grid item xs={4}>Importe: {order ? '$ ' + order.total : ''}</Grid>
                <Grid item xs={4}>Cliente: {order ? order.owner_summary : ''}</Grid>
                <Grid item xs={4}>Delivery: {order ? order.delivery_date : ''}</Grid>
                <Grid item xs={4}>State: {order ? order.status : ''}</Grid>
                <Grid item xs={4}>Items available: {order ? order.items_count : ''}</Grid>
                <Grid item xs={4}>Items missing: {order ? order.items_count : ''}</Grid>
                <Grid item xs={4}></Grid>
                {order.status !== 'DELIVERED' ?
                    <>
                        <Grid item xs={4}><Button variant='outlined' color='primary'>Eliminar</Button></Grid>
                        <Grid item xs={4}><Button variant='outlined' color='primary'>Editar</Button></Grid>
                    </>
                    : <Grid item xs={8}></Grid>}
                <Grid item xs={4}><Button variant='outlined' color='primary'
                                          onClick={() => props.onClick(order)}>{order.status === 'COMPLETE' ? "Armar" : order.status === 'ASSEMBLED' ? "Entregar" : "Ver"}</Button></Grid>
            </Grid>
        </Paper>
    )
}

const styles = theme => ({
    paper: {
        marginBottom: '10px',
        padding: '0.5em'
    },
    orderInfo: {
        textAlign: 'left',
    },
});

export default withStyles(styles)(OrderRow);