import React, { useState } from 'react';
import SupplierProducts from './SupplierProducts';
import SearchRow from '../shared/SearchRow';
import Paper from '@material-ui/core/Paper';


function SupplierProductFilter(props) {
    const [filterText, setFilterText] = useState('');
    const products = props.items;

    return (
        <>
            <Paper style={{marginBottom:'15px'}}>
                <SearchRow filterText={filterText} update={setFilterText} label={"Buscar producto"}/>
            </Paper>
            <SupplierProducts items={products} filterText={filterText} onClick={props.onClick}/>
        </>

    )
}

export default SupplierProductFilter;