import React, { useState, useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../upperBar/UpperBar";
import Orders from './Orders';
import BuildOrder from './build-order'
import CommonModal from '../shared/CommonModal'
import {createStyles, Theme} from "@material-ui/core";
import ViewOrder from "./view-order";

const CustomerOrderList = ({fetchCustomersOrders, customersOrders, classes, assembleInstructions, fetchAssembleInstructions, deliverOrder, markAssembled, updateCustomerOrder} : ICustomerOrderList) => {
    const [order, setSelectedOrder] = useState<IOrder>()

    useEffect(() => {
        fetchCustomersOrders();
    }, [fetchCustomersOrders])

    const [buildOpen, setBuildOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const handleClose = () => {
        setBuildOpen(false);
        setViewOpen(false);
    };
    
    function handleBuild(order: any) {
        setSelectedOrder(order);
        if(assembleInstructions && assembleInstructions.id !== order.id) {
            assembleInstructions.products = [];
        }
        setBuildOpen(true);
    }

    function openView(order: any) {
        setSelectedOrder(order);
        setViewOpen(true);
    }

    const viewOrder = <ViewOrder order={order} updateCustomerOrder={updateCustomerOrder} handleClose={handleClose}/>;

    const buildOrder = BuildOrder({order, assembleInstructions, fetchAssembleInstructions, deliverOrder, markAssembled, handleClose, buildOpen});

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Ordenes clientes</Typography>
                <Orders orders={customersOrders} onClick={{handleBuild, openView}}/>
            </Container>
            {order ? <CommonModal render={buildOrder} state={buildOpen} handleClose={handleClose} /> : null}
            {order ? <CommonModal render={viewOrder} state={viewOpen} handleClose={handleClose} /> : null}
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
    updateCustomerOrder: (iOrderUpdatePostData: IOrderUpdatePostData, filter: string) => void;
}

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(CustomerOrderList);