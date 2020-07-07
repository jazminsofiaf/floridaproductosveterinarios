import React from 'react';
import Paper from '@material-ui/core/Paper';
import './CartDrawer.css';

function CartPriceSummary(props) {
    
    return (
        <Paper className={"cart-price-summary"}>TOTAL:  ${props.total}</Paper>
    )
}

export default CartPriceSummary;