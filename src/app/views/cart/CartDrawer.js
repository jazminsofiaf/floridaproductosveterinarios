import React from 'react';
import CartElementContainer from "./CartElementContainer";
import CartPriceSummary from './CartPriceSummary';
import './CartDrawer.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


function CartDrawer(props) {
    const elements = props.elements;

    const totalPrice = elements.map((elem) => (
        elem.price * elem.amount
    )).reduce((a, b) => a + b, 0)

    return (
        <Paper className="cart-box" elevation={6}>
            <Paper className="cart-title" color="primary" elevation={2}>CARRITO</Paper>
                <CartElementContainer elements={elements} onClick={props.onClick.removeItem}/>
                <CartPriceSummary total={totalPrice}/>
                <Button variant="contained" color="primary" onClick={props.onClick.createOrder}>CARGAR PEDIDO</Button>
        </Paper>
    )

}

export default CartDrawer;