import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AmountField from '../shared/AmountField';
import "./supplierProductRow.css"


function SupplierProductRow(props) {
    const item = props.item;
    const addToCart = props.onClick;

    return (
        <Paper className="item-box">
            <Grid container spacing={1} style={{textAlign:"left"}}>
                <Grid item xs={6} sm={12} className="product-title">{item.name}</Grid>
                <Grid item xs={6} sm={9} className="product-price">$ {item.price}</Grid>
                <Grid item xs={6} sm={3}>{AmountField({product: item, addToCart})}</Grid>
            </Grid>
        </Paper>
    )
}

export default SupplierProductRow;