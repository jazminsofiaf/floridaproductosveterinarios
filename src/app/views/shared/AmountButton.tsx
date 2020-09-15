import React, { useState } from 'react';
import InputBase from "@material-ui/core/InputBase";
import {
    makeStyles,
  } from "@material-ui/core/styles";
import "./amountField.css"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {Button} from "@material-ui/core";

const usesStyles = makeStyles(theme => ({
    amountBox:{
        color:'#2196F3',
        paddingLeft: '0.5em',
        backgroundColor: 'white',
        textAlign: 'center',
    },
    amountButton: {
        display: 'inline-flex',
        border: "1px solid #2196F3",
        borderRadius: '2px 6px 2px 6px'
    },
    buttonBlue: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        color: 'white'
    },
}));

function AmountButton(props: any) {
    const {action} = props;
    const [amount, setAmount] = useState<number>(1);
    const classes = usesStyles();

    function addToCart(){
        if (amount > 0 ) {
            action(amount)
        } else {
            setAmount(1)
        }
    }

    return(
        <div className={classes.amountButton}>
            <InputBase
                className={classes.amountBox}
                value={amount}
                color="secondary"
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                />
            <Button className={classes.buttonBlue} fullWidth onClick={addToCart} variant={'contained'} size={'large'}>
                <AddShoppingCartIcon/>
            </Button>
        </div>
    )
}

export default AmountButton;