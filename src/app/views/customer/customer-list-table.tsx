import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from '@material-ui/icons/Visibility';
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

interface Data {
    id: string;
    name: string;
    contact: string;
    address: string;
    category: string;
    balance: number;
}

function createData(
    id: string,
    name: string,
    contact: string,
    address: string,
    category: string,
    balance: number,
): Data {
    return {id, name, contact, address, category, balance};
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
    {id: 'name', numeric: false, disablePadding: false, label: 'Nombre'},
    {id: 'contact', numeric: false, disablePadding: false, label: 'Contacto'},
    {id: 'address', numeric: false, disablePadding: false, label: 'Direccion'},
    {id: 'category', numeric: false, disablePadding: false, label: 'Categoria'},
    {id: 'balance', numeric: true, disablePadding: false, label: 'Saldo'},
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
            backgroundColor: theme.palette.primary.light,
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
        paymentTableRow: {
            backgroundColor: '#baf1ba',
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
        visibilityIcon: {
            color: theme.palette.primary.main,
        },
        buttonBlue: {
            color: 'white',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        },
        redBalance: {
            color: 'red',
        },
        greenBalance: {
            color: 'green',
        },
        blueBalance: {
            color: 'blue',
        }
    }),
);

interface ICustomerList {
    customers: []
}

export default function CustomerListTable(props: ICustomerList) {
    const classes = useStyles();
    const history = useHistory();
    const [tableRows, setTableRows] = React.useState<Data[]>([]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('balance');
    const {customers} = props;

    useEffect(() => {
        setTableRows(customers ?
            customers.map((elem: any) => createData(elem.id, elem.name_summary, elem.contact_summary, elem.address_summary, elem.category, elem.balance)) : []);
    }, [customers])

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

    };

    function goToAccount(id: string) {
        history.push(`/customers/${id}/account`);
    }

    const emptyRows = 8 - Math.min(8, tableRows.length);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/*<SupplierTableToolbar title={"Proveedores"}/>*/}
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
                                            key={row.id}
                                        >
                                            <TableCell padding="checkbox"
                                                       onClick={() => goToAccount(row.id)}>
                                                <Tooltip title="Ver">
                                                    <IconButton className={classes.visibilityIcon}>
                                                        <VisibilityIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding={'none'}>
                                                {row.contact}
                                            </TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell className={Math.abs(row.balance) < 2
                                                ? classes.blueBalance : row.balance < 0
                                                    ? classes.redBalance : classes.greenBalance}>
                                                    $ {Math.abs(row.balance) > 2 ? row.balance : 0}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 25 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}