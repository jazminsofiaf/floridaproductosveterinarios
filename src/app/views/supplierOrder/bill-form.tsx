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
import {useDispatch} from "react-redux";
import {createReception} from "../../actions/actions";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export interface BillRow {
    id: string;
    name: string;
    amount: number;
    expirationDate: string;
    unitPrice: number;
    subtotalProduct: number;
    discount: number;
    taxOne: number;
    taxTwo: number;
    totalProduct: number;
    unitCost: number;
    unitCostBillDiscount: number;
}

function createData(
    id: string,
    name: string,
    amount: number,
    expirationDate: string,
    unitPrice: number,
    subtotalProduct: number,
    discount: number,
    taxOne: number,
    taxTwo: number,
    totalProduct: number,
    unitCost: number,
    unitCostBillDiscount: number,
): BillRow {
    return {
        id,
        name,
        amount,
        expirationDate,
        unitPrice,
        subtotalProduct,
        discount,
        taxOne,
        taxTwo,
        totalProduct,
        unitCost,
        unitCostBillDiscount
    };
}

function fixDecimals(value:number) {
    return Number(value.toFixed(2));
}

const billItem = {
    id: '',
    price: 0,
    expiration_date: '',
    amount: 1,
}

const initialValues = {
    order_id: '',
    bill_number: 123,
    emission_date: '',
    bill_type: 'A',
    received_products: [billItem],
    bill_discount: 0,
    apply_discount: true,
    apply_tax: true,
    apply_gross_tax: true
};

const validationSchema = Yup.object().shape({
    order_id: Yup.string()
        .required(),
    bill_discount: Yup.number()
        .required('Falta descuento'),
    emission_date: Yup.string()
        .required('Falta fecha'),
    bill_number: Yup.number()
        .required('Falta numero')
});

const TotalView = (props: any) => {
    const {products} = props;

    if (!products || products.length === 0) {
        return null;
    }
    const subtotal = products.map((item: BillRow) => (item.subtotalProduct)).reduce((acc: number, next: number) => acc + next);
    const totalWithDiscount = products.map((item: BillRow) => (item.discount)).reduce((acc: number, next: number) => acc + next);
    let totalTaxOne = products.map((item: BillRow) => (item.taxOne)).reduce((acc: number, next: number) => acc + next);
    let totalTaxTwo = products.map((item: BillRow) => (item.taxTwo)).reduce((acc: number, next: number) => acc + next);
    let total = totalWithDiscount + totalTaxOne + totalTaxTwo;
    let totalWithBillDiscount = products.map((item: BillRow) => (item.amount*item.unitCostBillDiscount)).reduce((acc: number, next: number) => acc + next);

    return (
        <Grid item container spacing={0} style={{padding:'1em 3em 1em 3em'}}>
            <Grid item xs={2}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Con descuento</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total IVA</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total IIBB</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Total</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>Final c/desc.</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{subtotal.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography>{totalWithDiscount.toFixed(2)}</Typography>
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
                <Typography>{totalWithBillDiscount.toFixed(2)}</Typography>
            </Grid>
        </Grid>
    )
}

function validateReception(receptionRequest: any) {
    let validExpDate = receptionRequest.received_products.map((item: IOrderProduct) => (item.expiration_date && item.expiration_date !== '')).reduce((acc: boolean, next: boolean) => acc && next);
    let validAmounts = receptionRequest.received_products.map((item: IOrderProduct) => (item.amount && !isNaN(item.amount) && item.amount >= 0 )).reduce((acc: boolean, next: boolean) => acc && next);
    let validPrices = receptionRequest.received_products.map((item: IOrderProduct) => (item.price && !isNaN(item.price) && item.price >= 0)).reduce((acc: boolean, next: boolean) => acc && next);
    return validExpDate && validAmounts && validPrices;
}

interface IMargins {
    applyDiscount: boolean;
    discount: number;
    applyTax: boolean;
    tax: number;
    applyGrossTax: boolean;
    grossTax:number;
    billDiscount: number;
}

export function generateBillRow(item: any, billMargins: IMargins) {
    let subtotalProduct = (item.amount * item.price);
    let discount = billMargins.applyDiscount ? subtotalProduct * (1-(billMargins.discount/100)): subtotalProduct;
    let taxOne = billMargins.applyGrossTax ? discount * billMargins.grossTax/100 : 0;
    let taxTwo = billMargins.applyTax ? discount * billMargins.tax/100 : 0;
    let totalProduct = discount + taxOne + taxTwo;
    let unitCost = totalProduct/item.amount;
    let costWithBillDiscount = unitCost * (1 - billMargins.billDiscount/100);
    let formattedDate = item.expiration_date && item.expiration_date !== ''? format(Date.parse(item.expiration_date), "dd/MM/yyyy") : '';
    return createData(item.id, item.name, item.amount, formattedDate, fixDecimals(item.price),
        fixDecimals(subtotalProduct), fixDecimals(discount), fixDecimals(taxOne), fixDecimals(taxTwo),
        fixDecimals(totalProduct), fixDecimals(unitCost), fixDecimals(costWithBillDiscount));
}

export function updateNumbers(row: BillRow, billMargins: IMargins) {
    let subtotalProduct = (row.amount * row.unitPrice);
    let discount = billMargins.applyDiscount ? subtotalProduct * (1-(billMargins.discount/100)): subtotalProduct;
    let taxOne = billMargins.applyGrossTax ? discount * billMargins.grossTax/100 : 0;
    let taxTwo = billMargins.applyTax ? discount * billMargins.tax/100 : 0;
    let totalProduct = discount + taxOne + taxTwo;
    let unitCost = totalProduct/row.amount;
    let costWithBillDiscount = unitCost * (1 - billMargins.billDiscount/100);
    row.unitPrice = fixDecimals(row.unitPrice);
    row.subtotalProduct = fixDecimals(subtotalProduct);
    row.discount = fixDecimals(discount);
    row.taxOne = fixDecimals(taxOne);
    row.taxTwo = fixDecimals(taxTwo);
    row.totalProduct = fixDecimals(totalProduct);
    row.unitCost = fixDecimals(unitCost);
    row.unitCostBillDiscount = fixDecimals(costWithBillDiscount);
    return row;
}

function BillForm(props: any) {
    const {order, handleClose} = props;
    initialValues.order_id = order.id;
    const products = order.products;

    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [billDiscount, setBillDiscount] = useState(0);
    const [checkedGrossTax, setCheckedGrossTax] = React.useState(true);
    const [checkedTax, setTax] = React.useState(true);
    const [checkedDiscount, setDiscount] = React.useState(true);
    const [data, setData] = useState<BillRow[]>([]);

    const billMargins : IMargins = {
        applyDiscount: checkedDiscount,
        discount: 16.667,
        applyTax: checkedTax,
        tax: 21,
        applyGrossTax: checkedGrossTax,
        grossTax: 2.5,
        billDiscount: billDiscount
    };

    const handleTax = (event: any) => {
        if (!event.target.checked) {
            setCheckedGrossTax(false);
        }
        setTax(event.target.checked);
    };

    const handleDiscount = (event: any) => {
        setDiscount(event.target.checked);
    };

    const handleGrossTax = (event: any) => {
        if (event.target.checked) {
            setTax(true);
        }
        setCheckedGrossTax(event.target.checked);
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        initialValues.emission_date = format(selectedDate, "dd/MM/yyyy");
    };

    React.useEffect(() => {
        if (products && products.length >0) {
            const items = products.map((item: IOrderProduct) => generateBillRow(item, billMargins));
            setData(items);
        }
    }, [setData, products]);

    React.useEffect(() => {
        if (data && data.length > 0) {
            const items = data.map((rowData: any) => {
                billMargins.applyDiscount = checkedDiscount;
                billMargins.applyGrossTax = checkedGrossTax;
                billMargins.applyTax = checkedTax;
                billMargins.billDiscount = billDiscount;
                return updateNumbers(rowData, billMargins);
            });
            setData(items);
        }
    },[setData, checkedGrossTax, checkedDiscount, checkedTax, billDiscount]);

    function onKeyDown(keyEvent: any) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    function onSubmit(values: any) {
        values.received_products = data.map((item: BillRow) => ({
            'id': item.id,
            'amount': item.amount,
            'price': item.unitPrice,
            'expiration_date': item.expirationDate,
        }));
        values.bill_discount = billDiscount;
        values.emission_date = format(selectedDate, "dd/MM/yyyy");
        values.apply_discount = checkedDiscount;
        values.apply_gross_tax = checkedGrossTax;
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
                                <Grid item xs={12} md={6}>
                                    <Typography>Fecha de carga: {formattedDate}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography>Numero de orden: {order.number}</Typography>
                                </Grid>
                                <Grid item xs={12} md={2}/>
                                <Grid item xs={12} md={2}>
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
                                <Grid item xs={12} md={3}>
                                    <Field name={'bill_number'}>
                                        {({field, meta}: any) =>
                                            <TextField
                                                {...field}
                                                type="number"
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
                                <Grid item xs={12} md={2}/>
                                <Grid item xs={12} md={2}/>
                                <Grid item xs={12} md={3}>
                                    <Field name={"apply_discount"}>
                                        {({field, meta}: any) =>
                                            <FormControlLabel
                                                value="start"
                                                checked={checkedDiscount}
                                                onChange={(e) => handleDiscount(e)}
                                                control={<Checkbox color="primary" />}
                                                label="Aplicar desc. antes de impuestos"
                                                labelPlacement="start"
                                            />
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Field name={"apply_tax"}>
                                        {({field, meta}: any) =>
                                            <FormControlLabel
                                                value="start"
                                                checked={checkedTax}
                                                onChange={(e) => handleTax(e)}
                                                control={<Checkbox color="primary" />}
                                                label="Aplicar IVA"
                                                labelPlacement="start"
                                            />
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Field name={"apply_gross_tax"}>
                                        {({field, meta}: any) =>
                                            <FormControlLabel
                                                value="start"
                                                checked={checkedGrossTax}
                                                onChange={(e) => handleGrossTax(e)}
                                                control={<Checkbox color="primary" />}
                                                label="Aplicar IIBB"
                                                labelPlacement="start"
                                            />
                                        }
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={2}/>
                            </Grid>
                            <Grid item xs={12}>
                                <BillTable data={data} setData={setData} billMargins={billMargins}/>
                            </Grid>
                            <Grid item xs={3} style={{paddingLeft:'3em'}}>
                                <Field name={'bill_discount'}>
                                    {({field, meta}: any) => {
                                        return <TextField
                                            {...field}
                                            type="number"
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                                            label="% descuento sobre factura"
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
                            <TotalView products={data}/>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="secondary">Cargar Recepcion</Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </Form>
            )}
        </Formik>
    )
}

export default BillForm;