import React, {useEffect} from 'react';
import {createStyles, lighten, makeStyles, Theme} from '@material-ui/core/styles';
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
import {EnhancedTableToolbar, TableFooterToolbar} from "./supplier-order-table-toolbar";
import {useDispatch} from "react-redux";
import {removeSupplierOrderItem} from "../../actions/actions";

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
    isDelivered: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, order, orderBy, onRequestSort, isDelivered} = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {isDelivered ? null : <TableCell className={classes.tableHead} padding="checkbox"></TableCell>}
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
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
            fontSize: 15,
            fontWeight: "bold"
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
    }),
);

export default function EnhancedTable(props: any) {
    const classes = useStyles();
    const {element} = props;
    const [tableRows, setTableRows] = React.useState<Data[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [total, setTotal] = React.useState<string>('0.00');
    const dispatch = useDispatch();

    useEffect(() => {
        setTableRows(element && element.products ? element.products.map((elem:any) => createData(elem.id, elem.name, elem.amount, elem.price, (elem.price * elem.amount))) : []);
    },[element])

    useEffect(() => {
        const total = tableRows ? tableRows.map((item: Data) => (item.price * item.amount)).reduce((a:number, b:number) => a + b, 0) : 0;
        setTotal(total.toFixed(2));
    },[tableRows,total, setTotal])

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

    };
    const removeItem = (event: React.MouseEvent<unknown>, name: string) => {
        let index = tableRows.findIndex((elem)=> elem.name === name);
        let item: IOrderProduct = element.products[index];
        removeFromOrder(item);

        setTableRows(tableRows.filter(row => row.name !== name))
    };

    const removeFromOrder = (item: IOrderProduct) => {
        dispatch(removeSupplierOrderItem(element.id, item))
    }

    const isDelivered = element.status === 'RECEIVED';
    const stateMessage = isDelivered ? 'Recibido' : element.status === 'PENDING' ? 'Provisorio' : 'Solicitado'
    const emptyRows = 5 - Math.min(5, tableRows.length);


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar orderNumber={element.number} emissionDate={element.emission_date} orderStatus={stateMessage} supplierName={element.owner_summary}/>
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
                            isDelivered={isDelivered}
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
                                            { isDelivered ? null:
                                            <TableCell padding="checkbox" onClick={(event) => removeItem(event, row.name)}>
                                                <Tooltip title="Eliminar">
                                                    <IconButton aria-label="delete" color={"primary"}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>}
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
                <TableFooterToolbar total={total}/>
            </Paper>
        </div>
    );
}