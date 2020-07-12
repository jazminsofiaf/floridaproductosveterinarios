import React from 'react'
import SupplierProductRow from './SupplierProductRow';

function filterItems(props) {
    const rows = [];
    const maxRows = 30;

    var count = 0;
    if (props.items && props.items.length > 0) {
      props.items.forEach((product) => {
          if (product.name.toLowerCase().indexOf(props.filterText.toLowerCase()) === -1) {
            return;
          }
          if (count < maxRows) {
            rows.push(
              <SupplierProductRow
                item={product}
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

function SupplierProducts(props) {
    const itemList = filterItems(props);

    return (
        <>
            {itemList}
        </>
    )
}

export default SupplierProducts;