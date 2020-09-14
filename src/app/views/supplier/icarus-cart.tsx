import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {useDispatch, useSelector} from "react-redux";
import {createIcarusOrder, removeFromIcarusCart} from "../../actions/actions";
import {IcarusFooterToolbar, IcarusTableToolbar} from "./icarus-cart-toolbar";
import {Button} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

interface Data {
    id: string
    name: string;
    amount: number;
    price: number;
    total: number;
}

function createData(
    id: string,
    name: string,
    amount: number,
    price: number,
    total: number,
): Data {
    return {id, name, amount, price, total};
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {id: 'amount', numeric: true, disablePadding: false, label: 'Cant.'},
    {id: 'name', numeric: false, disablePadding: true, label: 'Nombre'},
    {id: 'price', numeric: true, disablePadding: false, label: 'Precio'},
    {id: 'total', numeric: true, disablePadding: false, label: 'Total'},
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell className={classes.tableHead} padding="checkbox"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        className={classes.tableHead}
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'checkbox'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            padding: theme.spacing(1),
        },
        paper: {
            width: '100%',
        },
        tableHead: {
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            backgroundColor: '#21CBF3'
        },
        table: {
            minWidth: 450,
            width: '100%',
            padding: theme.spacing(1),
        },
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        deleteIcon:{
            color: '#21CBF3'
        },
        buttonBlue: {
            color: 'white',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        },
    }),
);

export default function IcarusCart(props: any) {
    const classes = useStyles();
    const [tableRows, setTableRows] = React.useState<Data[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [total, setTotal] = React.useState<string>('0.00');
    const {icarusCart} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        setTableRows(icarusCart ? icarusCart.map((elem:any) => createData(elem.id, elem.name, elem.amount, elem.price, Number((elem.price * elem.amount).toFixed(2)))) : []);
    },[icarusCart])

    useEffect(() => {
        const total = tableRows ? tableRows.map((item: Data) => (item.price * item.amount)).reduce((a:number, b:number) => a + b, 0) : 0;
        setTotal(total.toFixed(2));
    },[tableRows,total, setTotal])

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

    };
    const removeItem = (event: React.MouseEvent<unknown>, id: string) => {
        dispatch(removeFromIcarusCart(id,icarusCart));

        setTableRows(tableRows.filter(row => row.id !== id))
    };

    const emptyRows = 5 - Math.min(5, tableRows.length);

    const cartEmpty = !icarusCart || icarusCart.length === 0;

    function buyItems(){
        dispatch(createIcarusOrder(icarusCart))
    }


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <IcarusTableToolbar/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                        aria-label="enhanced table"
                        padding={'checkbox'}
                        stickyHeader={true}
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(tableRows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell padding="checkbox" onClick={(event) => removeItem(event, row.id)}>
                                                <Tooltip title="Eliminar">
                                                    <IconButton aria-label="delete" className={classes.deleteIcon}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding={'none'}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>${row.price}</TableCell>
                                            <TableCell>${row.total}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 25 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <IcarusFooterToolbar total={total}/>
                <Button className={classes.buttonBlue} disabled fullWidth onClick={buyItems} variant={"contained"} size={'large'}>
                    Comprar
                    <SendIcon/>
                </Button>
            </Paper>
        </div>
    );
}