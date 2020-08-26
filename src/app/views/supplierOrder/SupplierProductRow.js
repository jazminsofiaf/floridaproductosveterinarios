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
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
    table: {
        minWidth: 150,
    },
});

function createData(priceList, pack, min, bonus, final, unitCost) {
    return { priceList, pack, min, bonus, final, unitCost };
}

function PriceDetail(props) {
    const {item} = props;
    const classes = useStyles();

    const pack = item.pack_amount ? item.pack_amount : 1;
    const min = item.amount_for_bonus ? item.amount_for_bonus : 0;
    const bonus = item.bonus_amount ? item.bonus_amount : 0;

    const rows = [
        createData(item.list_price, pack, min, bonus, item.price, item.unit_cost),
    ];

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>PL</TableCell>
                        <TableCell>#Pack</TableCell>
                        <TableCell>#MinBonus</TableCell>
                        <TableCell>#Bonus</TableCell>
                        <TableCell>$Final</TableCell>
                        <TableCell>$c/u.</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.priceList}>
                            <TableCell>{row.priceList}</TableCell>
                            <TableCell>{row.pack}</TableCell>
                            <TableCell>{row.min}</TableCell>
                            <TableCell>{row.bonus}</TableCell>
                            <TableCell>${row.final}</TableCell>
                            <TableCell>${row.unitCost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


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
                <Grid item xs={6} sm={9} className="product-title">{item.name}</Grid>
                <Grid item xs={6} sm={3} className="product-price">$ {item.price}</Grid>
                <Grid item xs={12} sm={9}><PriceDetail item={item}/></Grid>
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