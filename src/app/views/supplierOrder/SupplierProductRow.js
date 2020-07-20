import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AmountField from '../shared/AmountField';
import "./supplierProductRow.css"
import LinkIcon from '@material-ui/icons/Link';
import Button from "@material-ui/core/Button";
import CreateProductLink from "../productsLinker/create-product-link";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";


function SupplierProductRow(props) {
    const item = props.item;
    const addToCart = props.onClick;

    function createLink() {
        handleClickOpen();
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Paper className="item-box">
            <Grid container spacing={1} style={{textAlign: "left"}}>
                <Grid item xs={6} sm={12} className="product-title">{item.name}</Grid>
                <Grid item xs={6} sm={9} className="product-price">$ {item.price}</Grid>
                <Grid item xs={6} sm={3}>
                    {item.product_id ?
                        AmountField({product: item, addToCart})
                        : <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            startIcon={<LinkIcon/>}
                            onClick={() => createLink()}
                        >
                            Linkear
                        </Button>}
                </Grid>
            </Grid>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers>
                    <CreateProductLink supplierProduct={item} handleClose={handleClose}/>
                </DialogContent>
            </Dialog>
        </Paper>
    )
}

export default SupplierProductRow;