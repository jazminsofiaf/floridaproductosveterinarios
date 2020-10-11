import * as Yup from "yup";
import React, {useState} from "react";
import {format} from "date-fns";
import {Field, Form, Formik} from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import BillTable from "./bill-table";
import {useDispatch, useSelector} from "react-redux";
import {buildReception, createReception} from "../../actions/actions";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import dayjs from 'dayjs'


// import {bool, boolean} from "yup";

export interface BillRow {
    id: string;
    name: string;
    amount: number;
    expirationDate: string;
    priceList: number;
    unitPrice: number;
    subtotalProduct: number;
    discount: number;
    discountBM: number;
    discountDist: number;
    taxOne: number;
    taxTwo: number;
    itemTax: number;
    totalProduct: number;
    unitCost: number;
    unitCostBillDiscount: number;
}

function fixDecimals(value: number) {
    return Number(value.toFixed(2));
}

const billItem = {
    id: '',
    price: 0,
    final_cost: 0,
    expiration_date: '',
    amount: 1,
    discount: 0,
    item_tax: 0
}

function createData(
    id: string,
    name: string,
    amount: number,
    expirationDate: string,
    priceList: number,
    unitPrice: number,
    subtotalProduct: number,
    discount: number,
    discountBM: number,
    discountDist: number,
    taxOne: number,
    taxTwo: number,
    itemTax: number,
    totalProduct: number,
    unitCost: number,
    unitCostBillDiscount: number,
): BillRow {
    return {
        id,
        name,
        amount,
        expirationDate,
        priceList,
        unitPrice,
        subtotalProduct,
        discount,
        discountBM,
        discountDist,
        taxOne,
        taxTwo,
        itemTax,
        totalProduct,
        unitCost,
        unitCostBillDiscount
    };
}

const initialValues = {
    order_id: '',
    bill_number: '',
    emission_date: '',
    bill_type: 'A',
    discount_dist: 0,
    gross_tax: '',
    received_products: [billItem],
    bill_discount: 0,
    apply_tax: true,
};

const validationSchema = Yup.object().shape({
    order_id: Yup.string()
        .required(),
    bill_discount: Yup.number()
        .required('Falta descuento'),
    bill_number: Yup.string()
        .required('Falta numero')
});

const TotalView = (props: any) => {
    const {products} = props;

    if (!products || products.length === 0) {
        return null;
    }
    const subtotal = products.map((item: BillRow) => (item.subtotalProduct)).reduce((acc: number, next: number) => acc + next);
    const totalDiscount = products.map((item: BillRow) => (item.amount * (item.priceList - item.discountDist))).reduce((acc: number, next: number) => acc + next);
    let totalTaxOne = products.map((item: BillRow) => (item.amount * item.taxOne)).reduce((acc: number, next: number) => acc + next);
    let totalTaxTwo = products.map((item: BillRow) => (item.amount * item.taxTwo)).reduce((acc: number, next: number) => acc + next);
    let total = subtotal - totalDiscount + totalTaxOne + totalTaxTwo;
    let totalWithBillDiscount = products.map((item: BillRow) => (item.amount * item.unitCostBillDiscount)).reduce((acc: number, next: number) => acc + next);

    return (
        <Grid item container spacing={0} style={{padding: '1em 3em 1em 3em'}}>
            <Grid item xs={2}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Descuento</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total IVA</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total IIBB</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total Neto</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total c/desc.</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{subtotal.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{totalDiscount.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{totalTaxTwo.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{totalTaxOne.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{total.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography><strong>$ {totalWithBillDiscount.toFixed(2)}</strong></Typography>
            </Grid>
        </Grid>
    )
}

function validateReception(receptionRequest: any) {
    let validExpDate = receptionRequest.received_products.map((item: IOrderProduct) => (item.expiration_date && item.expiration_date !== '')).reduce((acc: boolean, next: boolean) => acc && next);
    let validAmounts = receptionRequest.received_products.map((item: IOrderProduct) => (item.amount && !isNaN(item.amount) && item.amount >= 0)).reduce((acc: boolean, next: boolean) => acc && next);
    let validPrices = receptionRequest.received_products.map((item: IOrderProduct) => (item.price && !isNaN(item.price) && item.price >= 0)).reduce((acc: boolean, next: boolean) => acc && next);
    return validExpDate && validAmounts && validPrices;
}

interface IMargins {
    discountDist: number;
    grossTax: number;
    applyTax: boolean;
    tax: number;
    billDiscount: number;
}

export function generateBillRow(item: any, billMargins: IMargins, init: boolean) {
    let priceList = item.price;
    let productDiscount = item.discount ? item.discount : 0;
    let itemTax = item.itemTax ? item.itemTax : 0;
    let discountBM = productDiscount ? priceList * (1 - (productDiscount / 100)) : priceList;
    let priceWithDiscount = billMargins.discountDist ? discountBM * (1 - (billMargins.discountDist / 100)) : discountBM;
    priceWithDiscount += itemTax;
    let subtotalProduct = (item.amount * priceWithDiscount);
    let taxOne = billMargins.grossTax ? priceWithDiscount * billMargins.grossTax / 100 : 0;
    let taxTwo = billMargins.applyTax ? priceWithDiscount * billMargins.tax / 100 : 0;
    let unitCost = priceWithDiscount + taxOne + taxTwo;
    let totalProduct = (item.amount * unitCost);
    let costWithBillDiscount = unitCost * (1 - billMargins.billDiscount / 100);
    let formattedDate;
    if (dayjs(item.expiration_date, "DD/MM/YYYY").isValid()) {
        formattedDate = item.expiration_date;
    } else {
        formattedDate = item.expiration_date && item.expiration_date !== '' ? format(item.expiration_date, "dd/MM/yyyy") : '';
    }
    return createData(item.id, item.name, item.amount, formattedDate, fixDecimals(priceList), fixDecimals(init ? item.price : item.refPrice),
        fixDecimals(subtotalProduct), fixDecimals(productDiscount), fixDecimals(discountBM), fixDecimals(priceWithDiscount), fixDecimals(taxOne), fixDecimals(taxTwo),
        fixDecimals(itemTax), fixDecimals(totalProduct), fixDecimals(unitCost), fixDecimals(costWithBillDiscount));
}

export function updateNumbers(row: BillRow, billMargins: IMargins) {
    let priceList = row.priceList;
    let productDiscount = row.discount ? row.discount : 0;
    let itemTax = row.itemTax ? row.itemTax : 0;
    let discountBM = productDiscount ? priceList * (1 - (productDiscount / 100)) : priceList;
    let priceWithDiscount = billMargins.discountDist ? discountBM * (1 - (billMargins.discountDist / 100)) : discountBM;
    priceWithDiscount += itemTax;
    let subtotalProduct = (row.amount * priceWithDiscount);
    let taxOne = billMargins.grossTax ? priceWithDiscount * billMargins.grossTax / 100 : 0;
    let taxTwo = billMargins.applyTax ? priceWithDiscount * billMargins.tax / 100 : 0;
    let unitCost = priceWithDiscount + taxOne + taxTwo;
    let totalProduct = (row.amount * unitCost);
    let costWithBillDiscount = unitCost * (1 - billMargins.billDiscount / 100);
    row.priceList = fixDecimals(priceList);
    row.subtotalProduct = fixDecimals(subtotalProduct);
    row.discount = fixDecimals(productDiscount);
    row.discountBM = fixDecimals(discountBM);
    row.discountDist = fixDecimals(priceWithDiscount);
    row.taxOne = fixDecimals(taxOne);
    row.taxTwo = fixDecimals(taxTwo);
    row.itemTax = fixDecimals(itemTax);
    row.totalProduct = fixDecimals(totalProduct);
    row.unitCost = fixDecimals(unitCost);
    row.unitCostBillDiscount = fixDecimals(costWithBillDiscount);
    return row;
}

function getTextField(label: string, field: any, value: number, setValue: (value: (((prevState: number) => number) | number)) => void, meta: any) {
    return <TextField
        {...field}
        type="number"
        required
        fullWidth
        size='small'
        label={label}
        variant='outlined'
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        key={field.name}
        error={(meta.touched && meta.error !== undefined)}
        helperText={((meta.touched) && meta.error)}
    />;
}

function BillForm(props: any) {
    const {order, handleClose} = props;
    initialValues.order_id = order.id;
    const products = order.products;

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [distDiscount, setDistDiscount] = useState(0);
    const [grossTax, setGrossTax] = useState(2.5);
    const [billDiscount, setBillDiscount] = useState(0);
    const [checkedTax, setTax] = React.useState(true);
    const [data, setData] = useState<BillRow[]>([]);
    const {receptionInfo} = useSelector((state: any) => state);

    const billMargins: IMargins = {
        discountDist: distDiscount,
        grossTax: grossTax,
        applyTax: checkedTax,
        tax: 21,
        billDiscount: billDiscount,
    };

    const handleTax = (event: any) => {
        setTax(event.target.checked);
    };


    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        initialValues.emission_date = format(selectedDate, "dd/MM/yyyy");
    };

    React.useEffect(() => {
        if (order) {
            console.log('BUILD ORDER')
            const buildReceptionData: IBuildReception = {
                order_id: order.id,
                received_products: order.products.map((item: IOrderProduct) => item.id)
            }
            dispatch(buildReception(buildReceptionData))
        }
    }, [order]);

    React.useEffect(() => {
        console.log('RECEPTION INFO')
        if (receptionInfo && receptionInfo.received_products?.length > 0) {
            const items = products.map((item: IOrderProduct) => {
                const rcvProdcut = receptionInfo.received_products.find((element: IReceivedProduct) => element.id === item.id)
                if (rcvProdcut && rcvProdcut.expiration_date) {
                    item.expiration_date = new Date(rcvProdcut.expiration_date);
                }
                item.amount = rcvProdcut.amount;
                item.price = rcvProdcut.price;
                return generateBillRow(item, billMargins, true)
            });
            setData(items);
        }
    }, [setData, receptionInfo]);

    React.useEffect(() => {
        if (data && data.length > 0) {
            const items = data.map((rowData: any) => {
                billMargins.discountDist = distDiscount;
                billMargins.grossTax = grossTax;
                billMargins.applyTax = checkedTax;
                billMargins.billDiscount = billDiscount;
                return updateNumbers(rowData, billMargins);
            });
            setData(items);
        }
    }, [setData, checkedTax, billDiscount, grossTax, distDiscount]);

    function onKeyDown(keyEvent: any) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    function onSubmit(values: any) {
        values.received_products = data.map((item: BillRow) => ({
            'id': item.id,
            'amount': item.amount,
            'price': item.priceList,
            'final_cost': item.unitCostBillDiscount,
            'expiration_date': item.expirationDate,
            'discount': item.discount,
            'extra': item.itemTax
        }));
        values.bill_discount = billDiscount;
        values.discount_dist = distDiscount;
        values.emission_date = format(selectedDate, "dd/MM/yyyy");
        values.gross_tax = grossTax;
        values.apply_tax = checkedTax;

        let validReception = validateReception(values);
        if (validReception) {
            dispatch(createReception(values))
            products.foreach((item: IOrderProduct) => item.status = '');
            handleClose()
        } else {
            alert("Invalid reception");
        }
    }

    let formattedDate = format(new Date(), "dd/MM/yyyy HH:mm");


    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
        >
            {({values}) => (
                <Form onKeyDown={onKeyDown}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid container item spacing={5}>
                                <Grid item container justify="center" alignItems="center" spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Typography>Fecha de carga: {formattedDate}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography>Numero de orden: {order.number}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" alignItems="center" spacing={1}>
                                    <Grid item xs={6} md={2}>
                                        <Field name={"bill_type"}>
                                            {({field, meta}: any) =>
                                                <FormControl variant="outlined"
                                                             fullWidth
                                                             error={(meta.touched && meta.error)}
                                                             key={field.name}
                                                             size='small'
                                                >
                                                    <InputLabel>Tipo comprobante</InputLabel>
                                                    <Select
                                                        defaultValue={values.bill_type}
                                                        onChange={(e) => (values.bill_type = String(e.target.value))}
                                                        label="Comprobante"
                                                    >
                                                        <MenuItem value={'A'}>Fact. A</MenuItem>
                                                        <MenuItem value={'B'}>Fact. B</MenuItem>
                                                        <MenuItem value={'~'}>Otro</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <Field name={'bill_number'}>
                                            {({field, meta}: any) =>
                                                <TextField
                                                    {...field}
                                                    type="text"
                                                    required
                                                    fullWidth
                                                    size='small'
                                                    label="Numero de comprobante"
                                                    variant='outlined'
                                                    key={field.name}
                                                    error={(meta.touched && meta.error !== undefined)}
                                                    helperText={((meta.touched) && meta.error)}
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Field name={"emission_date"}>
                                                {({field, meta}: any) =>
                                                    <KeyboardDatePicker
                                                        {...field}
                                                        disableToolbar
                                                        disableFuture
                                                        fullWidth
                                                        required
                                                        key={field.name}
                                                        emptyLabel="Fecha emision"
                                                        label="Fecha emision"
                                                        format="dd/MM/yyyy"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        inputVariant="outlined"
                                                        size={'small'}
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                <Grid item container justify="center" alignItems="center" spacing={1}>
                                    <Grid item xs={6} md={2}>
                                        <Field name={'discount_dist'}>
                                            {({field, meta}: any) =>
                                                getTextField("Desc. Dist", field, distDiscount, setDistDiscount, meta)
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                        <Field name={'gross_tax'}>
                                            {({field, meta}: any) =>
                                                getTextField("ARBA(%)", field, grossTax, setGrossTax, meta)
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={6} md={2}>
                                        <Field name={"apply_tax"}>
                                            {({field, meta}: any) =>
                                                <FormControlLabel
                                                    value="start"
                                                    checked={checkedTax}
                                                    onChange={(e) => handleTax(e)}
                                                    control={<Checkbox color="primary"/>}
                                                    label="Aplicar IVA"
                                                    labelPlacement="start"
                                                />
                                            }
                                        </Field>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <BillTable data={data} setData={setData} billMargins={billMargins}/>
                            </Grid>
                            <Grid item container justify="flex-end" alignItems="center" spacing={2}>
                                <Grid item xs={3} style={{paddingLeft: '3em'}}>
                                    <Field name={'bill_discount'}>
                                        {({field, meta}: any) => {
                                            return <TextField
                                                {...field}
                                                type="number"
                                                required
                                                fullWidth
                                                InputProps={{inputProps: {min: 0, max: 100}}}
                                                label="Desc.Factura(%)"
                                                value={billDiscount}
                                                onChange={(e) => setBillDiscount(Number(e.target.value))}
                                                variant='outlined'
                                                key={field.name}
                                                error={(meta.touched && meta.error !== undefined)}
                                                helperText={((meta.touched) && meta.error)}
                                                size='small'
                                            />;
                                        }
                                        }
                                    </Field>
                                </Grid>
                            </Grid>
                            <TotalView products={data}/>
                            <Grid item container justify="flex-end" alignItems="center" spacing={2}>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" color="secondary">Cargar
                                        Recepcion</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>
                </Form>
            )}
        </Formik>
    )
}

export default BillForm;