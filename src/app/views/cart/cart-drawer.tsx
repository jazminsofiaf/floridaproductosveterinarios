import React from 'react';
import CartElementContainer from "./CartElementContainer";
import CartPriceSummary from './CartPriceSummary';
import './CartDrawer.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


const CartDrawer = ({cartItems, removeFromCart, submitOrder}: ICartDrawer) => {

    const totalPrice = cartItems ? cartItems.map((elem) => (
        elem.price * elem.amount
    )).reduce((a, b) => a + b, 0).toFixed(2) : 0;

    return (
        <Paper className="cart-box" elevation={6}>
            <Paper className="cart-title" color="primary" elevation={2}>CARRITO</Paper>
                <CartElementContainer elements={cartItems} onClick={removeFromCart}/>
                <CartPriceSummary total={totalPrice}/>
                <Button variant="contained" color="primary" disabled={!(totalPrice>0)} onClick={submitOrder}>CARGAR PEDIDO</Button>
        </Paper>
    )

}

interface ICartDrawer {
    cartItems: ICartItem[];
    removeFromCart: (id: string) => void;
    submitOrder: () => void;
}

export default CartDrawer;