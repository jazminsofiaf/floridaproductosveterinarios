import React from 'react';
import ProductRowDetails from './ProductRowDetails'

function filterProducts(props) {
    const rows = [];
    const maxRows = 15;

    var count = 0;
    if (props.products && props.products.length > 0) {
      props.products.forEach((product) => {
          var searchBy = product.name +" "+ product.brand;
          if (searchBy.toLowerCase().indexOf(props.filterText.toLowerCase()) === -1) {
            return;
          }
          if (count < maxRows) {
            rows.push(
              <ProductRowDetails
                product={product}
                key={product.id}
                onClick={props.onClick}
              />
            );
            count++;
          }
      });   
    }
      return rows;
}

function ProductList(props) {
    const productList = filterProducts(props);

    return (
        <>
            {productList}
        </>
    )
}

export default ProductList;