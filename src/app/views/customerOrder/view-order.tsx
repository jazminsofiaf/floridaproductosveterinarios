import React, {useEffect} from 'react';
import {Grid, Button, Typography, CircularProgress} from '@material-ui/core';
import {useHistory} from 'react-router-dom'

function OrderDeliveredItem(props: any) {
    const item = props.item;
    const color = item.status === "AVAILABLE" ? "#CCFFCC" : item.status === "ORDERED" ? "#FFFFCC" : item.status === "MISSING"? "#f5b8bf": "#fdfceb";

    return (
        <Grid item container xs={12} style={{backgroundColor:`${color}`}}>
            <Grid item xs={7}>{item.name}</Grid>
            <Grid item xs={1}>{item.amount}</Grid>
            <Grid item xs={3}>{item.expiration_view ? item.expiration_view : "-"}</Grid>
            <Grid item xs={1}>${item.price}</Grid>
        </Grid>
    )
}

function DeliveredColumns() {
    return (
        <Grid item container xs={12} style={{fontWeight: 'bold'}}>
            <Grid item xs={7}>Producto</Grid>
            <Grid item xs={1}>Cant.</Grid>
            <Grid item xs={3}>Vencimiento</Grid>
            <Grid item xs={1}>Precio</Grid>
        </Grid>
    )
}


const ViewOrder = ({order}: any) => {
    const history = useHistory();
    if (!order) {
        return null;
    }

    const itemList = order.products.map((item: IOrderProduct) => (
        <OrderDeliveredItem key={item.name + item.expiration_view} item={item}/>));

    function goToEditPage(id: string) {
        history.push(`/customer-order?id=${id}&&edit=true`);
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid container item style={{textAlign: 'left'}}>
                    <Grid item xs={8}><Typography variant='h4' color='primary'>{order.owner_summary}</Typography></Grid>
                    <Grid item xs={4}><Typography variant='h4' color='primary'>{"#Orden: " + order.number}</Typography></Grid>
                    <Grid item xs={6}><Typography variant='h6'
                                                  color='secondary'>{"Emision:" + order.emission_date}</Typography></Grid>
                    <Grid item xs={6}><Typography variant='h6'
                                                  color='secondary'>{"Entrega: " + order.delivery_date}</Typography></Grid>
                </Grid>
                <Grid container item style={{border: '1px solid black'}}>
                <DeliveredColumns/>
                    {itemList ? itemList :
                        <Grid item xs={12} style={{textAlign: 'center'}}>
                            <CircularProgress/>
                        </Grid>
                    }
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}><Typography variant='h5'
                                              color='secondary'>{"TOTAL:  $" + order.total}</Typography></Grid>
                <Grid item xs={6}><Button variant='contained' color='primary'>Cancelar</Button></Grid>
                <Grid item xs={6}><Button variant='contained' color='primary'
                                          onClick={() => goToEditPage(order.id)}>Editar</Button></Grid>
            </Grid>
        </>
    )
}

export default ViewOrder;