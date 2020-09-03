import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import {Typography} from "@material-ui/core";


function OrderRow(props) {
    const {classes} = props;
    const order = props.order;
    const color = order.status === "DELIVERED" ? "#CCFFCC" : order.status === "INCOMPLETE" ? "#f5b8bf" : order.status === "ASSEMBLED" ? "#ffe7be" :
        order.status ==="COMPLETE" ? "#FFFFCC": order.status ==="AWAITING" ? "#f1a2fa" : "#84779a";
    const statusMessage = order.status === "DELIVERED" ? "Entregado" : order.status === "INCOMPLETE" ? "Faltan productos" : order.status === "ASSEMBLED" ? "Listo para entregar" :
        order.status === "COMPLETE" ? "Stock ok!": order.status === "AWAITING" ? "Mercaderia pedida" : "Cancelado";
    const orderTotal = order && order.products ? order.products.map((elem) => (
        elem.price * elem.amount
    )).reduce((a, b) => a + b, 0).toFixed(2) : 0;

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={1} className={classes.orderInfo}>
                <Grid container item xs={2}>
                    <Typography variant={"h2"} color='primary'>{order ? order.number : ''}</Typography>
                </Grid>
                <Grid container item xs={10}>
                    <Grid item xs={4}><Typography color='primary'>{order.owner_summary}</Typography></Grid>
                    <Grid item xs={4}><Typography color='primary'>{order ? '$ ' + orderTotal : ''}</Typography></Grid>
                    <Grid item xs={4} style={{backgroundColor: `${color}`}} >{statusMessage}</Grid>
                    <Grid item xs={4}>Emision: {order ? order.emission_date : ''}</Grid>
                    <Grid item xs={4}>Entrega: {order ? order.delivery_date : ''}</Grid>
                    <Grid item xs={4}>#Items: {order ? order.items_count : ''}</Grid>
                    {order.status === 'DELIVERED' || order.status === 'CANCELED'? <Grid item xs={8}></Grid> : <Grid item xs={4}></Grid> }
                    <Grid item xs={4}><Button variant='contained' color='primary' onClick={() => props.viewClick(order)}>Ver</Button></Grid>
                    {order.status !== 'DELIVERED' && order.status !== 'CANCELED' ? <Grid item xs={4}><Button variant='contained' color='primary'
                                              onClick={() => props.buildClick(order)}>{order.status === 'ASSEMBLED' ? "Ver entrega": "Ver instructivo"}</Button></Grid> : null}
                </Grid>
            </Grid>
        </Paper>
    )
}

const styles = theme => ({
    paper: {
        marginBottom: '10px',
        padding: '0.5em',
    },
    orderInfo: {
        textAlign: 'left',
    },
});

export default withStyles(styles)(OrderRow);