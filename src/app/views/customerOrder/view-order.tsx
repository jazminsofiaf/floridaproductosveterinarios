import React, {useState} from 'react';
import {Grid, Button, Typography, CircularProgress, TextField} from '@material-ui/core';
import {useHistory} from 'react-router-dom'

function OrderDeliveredItem(props: any) {
    const item = props.item;
    const [price, setPrice] = useState(item.price)
    const color = item.status === "AVAILABLE" ? "#CCFFCC" : item.status === "ORDERED" ? "#FFFFCC" : item.status === "MISSING"? "#f5b8bf": "#fdfceb";

    function updatePrice(newPrice: any){
        item.price = parseFloat(newPrice);
        setPrice(newPrice)
    }

    return (
        <Grid item container xs={12} style={{backgroundColor:`${color}`}}>
            <Grid item xs={6}>{item.name}</Grid>
            <Grid item xs={1}>{item.amount}</Grid>
            <Grid item xs={3}>{item.expiration_view ? item.expiration_view : "-"}</Grid>
            <Grid item xs={1}><TextField type="decimal" fullWidth size="small" defaultValue={price} onChange={(e) => updatePrice(e.target.value)}/></Grid>
            <Grid item xs={1}>${price * item.amount}</Grid>
        </Grid>
    )
}

function DeliveredColumns() {
    return (
        <Grid item container xs={12} style={{fontWeight: 'bold'}}>
            <Grid item xs={6}>Producto</Grid>
            <Grid item xs={1}>Cant.</Grid>
            <Grid item xs={3}>Vencimiento</Grid>
            <Grid item xs={1}>$u</Grid>
            <Grid item xs={1}>$Tot</Grid>
        </Grid>
    )
}

function calculateOrderTotal(order: any){
    return order && order.products ? order.products.map((elem: any) => (
        elem.price * elem.amount
    )).reduce((a: number, b: number) => a + b, 0).toFixed(2) : 0;
}

const ViewOrder = ({order, updateCustomerOrder}: any) => {
    const history = useHistory();
    const [orderTotal, setOrderTotal] = useState(calculateOrderTotal(order));
    if (!order) {
        return null;
    }

    const itemList = order.products ? order.products.map((item: IOrderProduct) => (
        <OrderDeliveredItem key={item.name + item.expiration_view} item={item}/>)) : [];


    function goToEditPage(id: string) {
        history.push(`/customer-order?id=${id}&&edit=true`);
    }

    function saveChanges(){
        setOrderTotal(calculateOrderTotal(order));
        order.total = orderTotal;
        updateCustomerOrder({
            order_id: order.id,
            products: order.products
        }, "prices");
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
                                              color='secondary'>{"TOTAL:  $" + orderTotal}</Typography></Grid>
                <Grid item xs={3}><Button variant='contained' color='secondary' onClick={() => saveChanges()}>Guardar cambios</Button></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}><Button variant='contained' color='primary'>Cancelar</Button></Grid>
                <Grid item xs={3}><Button variant='contained' color='primary'
                                          onClick={() => goToEditPage(order.id)}>Editar</Button></Grid>
            </Grid>
        </>
    )
}

export default ViewOrder;