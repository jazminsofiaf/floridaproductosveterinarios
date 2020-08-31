import React, {useState} from 'react';
import CustomerRow from "./CustomerRow"
import SearchRow from "../shared/SearchRow"
import Grid from '@material-ui/core/Grid';


function CustomersList(props) {
    const [filterText, setFilterText] = useState('');

    const customersList = props.customers ? props.customers.filter((customer) => passesFilter(customer))
    .map((customer) => (
        <CustomerRow key={customer.id} customer={customer} onClick={props.onClick}/>
    )) : [];

    function passesFilter(customer){
        return !(customer?.name_summary?.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}><SearchRow filterText={filterText} label={'Buscar cliente'} update={setFilterText}/></Grid>
                <Grid item xs={12}>{customersList}</Grid>
            </Grid>
        </div>
    )

}

export default CustomersList;