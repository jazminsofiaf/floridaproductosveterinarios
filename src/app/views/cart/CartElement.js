import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './CartDrawer.css'


function CartElement(props) {
    const element = props.element;

    return (
        <Paper style={{marginBottom: '10px'}}>
            <Grid container spacing={1}>
                <Grid item xs={1}>{element.amount}</Grid>
                <Grid item xs={6} className={"cart-element"}>{element.name}</Grid>
                <Grid item xs={2}>{element.price}</Grid>
                {props.onClick ?
                    <>
                        <Grid item xs={2}>{element.price * element.amount}</Grid>
                        <Grid item xs={1}>
                            <button onClick={(e) => props.onClick(element)}>X</button>
                        </Grid>
                    </> :
                    <Grid item xs={3}>{element.price * element.amount}</Grid>}
            </Grid>
        </Paper>
    )

}

export default CartElement;