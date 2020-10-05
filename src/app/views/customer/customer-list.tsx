import React, {useEffect, useState} from 'react';
import SearchRow from "../shared/SearchRow"
import Grid from '@material-ui/core/Grid';
import CustomerListTable from "./customer-list-table";
import {useDispatch, useSelector} from "react-redux";
import {fetchCustomersNew} from "../../actions/actions";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";


function CustomerList() {
    const [filterText, setFilterText] = useState('');
    const {customers} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const customersList = filterText.length > 2 && customers ? customers.filter((customer: ICustomerSummary) => passesFilter(customer)) : customers ? customers : [];

    function passesFilter(customer: ICustomerSummary) {
        return !(customer?.name_summary?.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
    }

    useEffect(() => {
        dispatch(fetchCustomersNew());
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Clientes</Typography>
            <Grid container spacing={1}>
                <Grid item xs={12}><SearchRow filterText={filterText} label={'Buscar cliente'} update={setFilterText}/></Grid>
                <CustomerListTable customers={customersList}/>
            </Grid>
        </Container>
    )

}

export default CustomerList;