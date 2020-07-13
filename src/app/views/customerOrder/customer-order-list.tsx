import React, { useState, useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../upperBar/UpperBar";
import Orders from './Orders';
import BuildOrder from './build-order'
import CommonModal from '../shared/CommonModal'
import {createStyles, Theme} from "@material-ui/core";

const CustomerOrderList = ({fetchCustomersOrders, customersOrders, classes, assembleInstructions, fetchAssembleInstructions, deliverOrder, markAssembled} : ICustomerOrderList) => {
    const [order, setSelectedOrder] = useState<IOrder>()

    useEffect(() => {
        fetchCustomersOrders();
    }, [fetchCustomersOrders])

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
    function handleBuild(order: any) {
        setSelectedOrder(order);
        if(assembleInstructions && assembleInstructions.id !== order.id) {
            assembleInstructions.products = [];
        }
        setOpen(true);
    }

    const buildOrder = BuildOrder({order, assembleInstructions, fetchAssembleInstructions, deliverOrder, markAssembled, handleClose});

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Ordenes clientes</Typography>
                <Orders orders={customersOrders} onClick={handleBuild}/>
            </Container>
            {order ? <CommonModal render={buildOrder} state={open} handleClose={handleClose} /> : null}
        </>
    )

}

interface ICustomerOrderList extends IComponent{
    classes: any;
    fetchCustomersOrders: () => {};
    customersOrders: IOrder[];

    deliverOrder: (id: string) => void;
    assembleInstructions: IOrder;
    fetchAssembleInstructions: (id: string) => {};
    markAssembled: (id: string) => {};
}

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(CustomerOrderList);