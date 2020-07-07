import React from 'react';
import CartElement from "./CartElement"
import Grid from '@material-ui/core/Grid';


function CartElementContainer(props) {

    const elements = props.elements.map((element) => (
        <CartElement key={element.id} element={element} onClick={props.onClick}/>
    ));

    return (
        <div>
            <Grid container style={{backgroundColor:'#EBCFB2',  fontWeight:'bold'}}>
                <Grid item xs={1}>Cant.</Grid>
                <Grid item xs={6}>Nombre</Grid>
                <Grid item xs={2}>p/u</Grid>
                <Grid item xs={2}>Total</Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            {elements}
        </div>
    )

}

export default CartElementContainer;