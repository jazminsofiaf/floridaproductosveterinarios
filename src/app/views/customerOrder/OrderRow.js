import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import {useHistory} from 'react-router-dom'
import {Typography} from "@material-ui/core";


function OrderRow(props) {
    const history = useHistory();
    const {classes} = props;
    const order = props.order;
    const color = order.status === "DELIVERED" ? "#CCFFCC" : order.status === "INCOMPLETE" ? "#f5b8bf" : order.status === "ASSEMBLED" ? "#ffe7be" : "#FFFFCC";

    function goToEditPage(id) {
        history.push(`/customer-order?id=${id}&&edit=true`);
    }

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={1} className={classes.orderInfo}>
                <Grid container item xs={2}>
                    <Typography variant={"h2"} color='primary'>{order ? order.number : ''}</Typography>
                </Grid>
                <Grid container item xs={10}>
                    <Grid item xs={4}><Typography color='primary'>{order.owner_summary}</Typography></Grid>
                    <Grid item xs={4}><Typography color='primary'>{order ? '$ ' + order.total : ''}</Typography></Grid>
                    <Grid item xs={4} style={{backgroundColor: `${color}`}} >Estado: {order ? order.status : ''}</Grid>
                    <Grid item xs={4}>Emision: {order ? order.emission_date : ''}</Grid>
                    <Grid item xs={4}>Entrega: {order ? order.delivery_date : ''}</Grid>
                    <Grid item xs={4}>#Items: {order ? order.items_count : ''}</Grid>
                    {order.status === 'DELIVERED' ? <Grid item xs={8}></Grid> : <Grid item xs={4}></Grid> }
                    <Grid item xs={4}><Button variant='contained' color='primary' onClick={() => props.viewClick(order)}>Ver</Button></Grid>
                    {order.status !== 'DELIVERED' ? <Grid item xs={4}><Button variant='contained' color='primary'
                                              onClick={() => props.buildClick(order)}>{order.status === 'ASSEMBLED' ? "Entregar": "Armar"}</Button></Grid> : null}
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