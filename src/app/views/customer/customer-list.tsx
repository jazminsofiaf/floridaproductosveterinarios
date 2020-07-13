import React, { useState, useEffect } from 'react';
import CustomersList from './CustomersList'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../upperBar/UpperBar";
import CommonModal from '../shared/CommonModal'
import PaymentForm from '../payment/payment-form'
import {createStyles, Theme} from "@material-ui/core";


const CustomerList = ({fetchCustomers, customers, addCustomerPayment , classes}: ICustomerList) => {
    const [selected, setSelected] = useState<ICustomerSummary>()

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers])

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function clickPayment(customer: ICustomerSummary) {
        setSelected(customer);
        setOpen(true);
    };


    const paymentForm = selected ? PaymentForm({ownerId:selected.id, submitPayment: addCustomerPayment}) : null;

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Clientes</Typography>
                <CustomersList customers={customers} onClick={clickPayment}/>
            </Container>
            <CommonModal render={paymentForm} state={open} handleClose={handleClose} />
        </>
    )

}

interface ICustomerList extends IComponent {
    fetchCustomers: () => {};
    customers: ICustomerSummary[];
    addCustomerPayment: (data: IPaymentPostData) => void;

    classes: any;
}

const styles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(CustomerList);