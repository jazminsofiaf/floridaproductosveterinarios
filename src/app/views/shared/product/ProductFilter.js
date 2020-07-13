import React, { useState } from 'react';
import ProductList from './ProductList';
import SearchRow from '../../shared/SearchRow';
import './ProductRowDetails.css';
import Paper from '@material-ui/core/Paper';


function ProductFilter(props) {
    const [filterText, setFilterText] = useState('');
    const products = props.products;

    return (
        <>
            <Paper className="search-box">
                <SearchRow filterText={filterText} update={setFilterText} label={"Buscar producto"}/>
            </Paper>
            <ProductList products={products} filterText={filterText} onClick={props.onClick}/>
        </>

    )
}

export default ProductFilter;