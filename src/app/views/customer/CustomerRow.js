import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import {useHistory} from "react-router-dom";

function CustomerRow(props) {
    const {classes} = props;
    const customer = props.customer;
    const history = useHistory();

    function goToAccount(id) {
        history.push(`/account/${id}`);
    }

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={1}>
                <Grid item container xs={12} sm={9} spacing={1} className={classes.customerInfo}>
                    <Grid item xs={12}><Typography color="primary">{customer.name_summary}</Typography></Grid>
                    <Grid item xs={12}>{customer.contact_summary}</Grid>
                    <Grid item xs={12}>{customer.address_summary}</Grid>
                    <Grid item xs={9}>{customer.category}</Grid>
                </Grid>
                <Grid item container spacing={1} xs={12} sm={3}>
                    <Grid item xs={4} sm={12}>
                        Saldo: <span
                        className={customer.balance === 0 ? classes.blueBalance : customer.balance < 0 ? classes.redBalance : classes.greenBalance}>
                        $ {customer.balance ? customer.balance : 0}
                    </span>
                    </Grid>
                    <Grid item xs={1} sm={12}></Grid>
                    <Grid item xs={3} sm={12}><Button size="small" variant='contained' color="secondary"
                                                     onClick={() => props.onClick(customer)}>+Pago</Button></Grid>
                    <Grid item xs={4} sm={12}><Button size="small" variant='contained' color="secondary"
                                                     onClick={() => goToAccount(customer.id)}>Movimientos</Button></Grid>
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
    customerInfo: {
        textAlign: 'left',
    },
    redBalance: {
        color: 'red',
    },
    greenBalance: {
        color: 'green',
    },
    blueBalance: {
        color: 'blue',
    }
});

export default withStyles(styles)(CustomerRow);