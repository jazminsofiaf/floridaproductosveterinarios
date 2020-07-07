import React, { useState } from 'react';
import InputBase from "@material-ui/core/InputBase";
import {
    makeStyles,
  } from "@material-ui/core/styles";
import "./amountField.css"

function validAmount(value) {
    return value >= 0 ? value : 1;
}

function AmountField(props) {
    const [amount, setAmount] = useState(1);
    const item = props.product;
    const classes = usesStyles();

    return(
        <div className="add-item-box">
            <InputBase
                className={classes.amountBox}
                variante='filled'
                value={amount}
                color="secondary"
                type="number"
                size="small"
                onChange={(e) => setAmount(validAmount(e.target.value))}
                />
            <button className="button" onClick={() => props.addToCart({item, amount})}><span>+Agregar </span></button>
        </div>
    )
}

const usesStyles = makeStyles(theme => ({
    amountBox:{
        color:'rgb(60, 145, 230);',
        paddingLeft: '0.4em',
        backgroundColor: 'white',
        margin: '3px',
        width: '50%'
    },
  }));

export default AmountField;