import React from "react";
import {format} from "date-fns";
import {Field, Form, Formik} from "formik";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ReceptionItems from "./reception-items";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";


const item = {
    id: '',
    name: '',
    price: 0,
    expiration_date: '',
    amount: 1,
}

const initialValues = {
    order_id: '',
    bill_number: 123,
    bill_type: 'A',
    received_products: [item],
    total: 0,
};

const validationSchema = Yup.object().shape({
    order_id: Yup.string()
        .required(),
    total: Yup.number()
        .required('Introducir total'),
    received_products: Yup.array().of(Yup.object({
        id: Yup.string()
            .required(),
        expiration_date: Yup.date()
            .required('Fecha requerida'),
        price: Yup.string().matches(/^\d*\.{1}\d*$/).required("Falta precio"),
        amount: Yup.string()
            .matches(/^[0-9]*$/, 'Invalid amount')
            .max(8)
            .required('Falta cant.'),
    })),
});

function receptionTotal(receptionRequest: any) {

    return receptionRequest && receptionRequest.received_products ? receptionRequest.received_products.map((item: IOrderProduct) => (item.amount * item.price)).reduce((acc: number, next: number) => acc + next) : 0;
}

function validateReception(receptionRequest: any) {
    let valid = receptionRequest.received_products.map((item: IOrderProduct) => (item.expiration_date && item.expiration_date && !isNaN(item.expiration_date))).reduce((acc: boolean, next: boolean) => acc && next);
    return valid;
}

function CreateReception(props: any) {
    const modalOrder = props.modalOrder;
    if (!modalOrder) {
        return null;
    }
    const items = modalOrder.products;

    if (items) {
        let originalItems = items.map((item: IOrderProduct) => ({ 'id': item.id, 'name': item.name, 'amount': item.amount, 'original_price': item.price, 'price': item.price, 'expiration_date': '' }));
        initialValues.order_id = modalOrder.id;
        initialValues.received_products = originalItems;
        initialValues.total = modalOrder.total;
    }

    function onSubmit(values: any) {
        let validReception = validateReception(values);
        if (validReception) {
            props.sendRequest(values);
        } else {
            alert("Invalid reception");
        }
    }

    let formattedDate = format(new Date(), "dd/MM/yy HH:mm");


    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form>
                    <Paper>
                        <Typography variant='h5' color="secondary">Nueva recepcion</Typography>
                        <Grid container spacing={3}>
                            <Grid container item style={{ textAlign: 'left' }}>
                                <Grid item xs={6}>
                                    <Typography color="primary">{modalOrder.owner_summary ? modalOrder.owner_summary : 'Nothing selected'}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>Fecha: {formattedDate}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>Nro: {modalOrder.number}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>{modalOrder.status}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Field name={"bill_type"}>
                                        {({ field, meta } : any) =>
                                            <FormControl fullWidth
                                                         variant="standard"
                                                         error={(meta.touched && meta.error)}
                                                         key={field.name}
                                                         size='small'
                                            >
                                                <InputLabel>Tipo coprobante</InputLabel>
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
                                <Grid item xs={5}>
                                    <Field name={'bill_number'}>
                                        {({ field, meta } : any) =>
                                            <TextField
                                                {...field}
                                                type="number"
                                                required
                                                size='small'
                                                label="Numero de comprobante"
                                                variant='standard'
                                                fullWidth
                                                key={field.name}
                                                error={(meta.touched && meta.error !== undefined)}
                                                helperText={((meta.touched) && meta.error)}
                                            />
                                        }
                                    </Field>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <ReceptionItems values={values} />
                            </Grid>
                            <Grid container style={{textAlign:'right', padding:'0.5em'}}>
                                <Grid item xs={8}></Grid>
                                <Grid item xs={2}><Typography>Total:</Typography></Grid>
                                <Grid item xs={2}><Typography>$ {receptionTotal(values)}</Typography></Grid>
                                <Grid item xs={8}></Grid>
                                <Grid item xs={2}><Typography>IVA:</Typography></Grid>
                                <Grid item xs={2}><Typography>$ {(receptionTotal(values) * 0.21).toFixed(2)}</Typography></Grid>
                                <Grid item xs={8}></Grid>
                                <Grid item xs={2}><Typography>Total+IVA:</Typography></Grid>
                                <Grid item xs={2}><Typography>$ {(receptionTotal(values) * 1.21).toFixed(2)}</Typography></Grid>
                            </Grid>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                <Field name={'total'}>
                                    {({ field, meta } : any) => {
                                        return <TextField
                                            {...field}
                                            type="number"
                                            required
                                            label="Total comprobante"
                                            variant='outlined'
                                            fullWidth
                                            key={field.name}
                                            error={(meta.touched && meta.error !== undefined)}
                                            helperText={((meta.touched) && meta.error)}
                                            size='small'
                                        />;
                                    }
                                    }
                                </Field>
                            </Grid>
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

export default CreateReception;