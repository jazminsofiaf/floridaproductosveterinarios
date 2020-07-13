import React, { useState, useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../upperBar/UpperBar";
import Orders from './Orders';
import BuildOrder from './BuildOrder'
import CommonModal from '../shared/CommonModal'
import {createStyles, Theme} from "@material-ui/core";

const CustomerOrderList = ({fetchCustomersOrders, customersOrders, classes} : ICustomerOrderList) => {
    const [selectedOrder, setSelectedOrder] = useState()

    useEffect(() => {
        fetchCustomersOrders();
    }, [fetchCustomersOrders])

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
    function handleBuild(order: any) {
        setSelectedOrder(order);
        setOpen(true);
    }

    const buildOrder = BuildOrder({selectedOrder, handleClose});

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Ordenes clientes</Typography>
                <Orders orders={customersOrders} onClick={handleBuild}/>
            </Container>
            {selectedOrder ? <CommonModal render={buildOrder} state={open} handleClose={handleClose} /> : null}
        </>
    )

}

interface ICustomerOrderList extends IComponent{
    classes: any;
    fetchCustomersOrders: () => {};
    customersOrders: IOrder[];
}

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(CustomerOrderList);