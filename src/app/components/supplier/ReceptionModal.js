import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Reception from "./Reception";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { format } from "date-fns"


const item = {
    id: '',
    name: '',
    price: '',
    expiration_date: '',
    amount: '',
}

const initialValues = {
    order_id: '',
    bill_number: 123,
    bill_type: 'A',
    received_products: [item],
    total: '',
};

const validationSchema = Yup.object().shape({
    order_id: Yup.string()
        .required(),
    total: Yup.number()
        .required('Introducir total'),
    received_products: Yup.array().of(Yup.object({
        id: Yup.string()
            .required(),
        expiration_date: Yup.date('Falta fecha')
            .required('Fecha requerida'),
        price: Yup.string().matches(/^\d*\.{1}\d*$/).required("Falta precio"),
        amount: Yup.string()
            .matches(/^[0-9]*$/, 'Invalid amount')
            .max(8)
            .required('Falta cant.'),
    })),
});

function receptionTotal(receptionRequest) {

    return receptionRequest && receptionRequest.received_products ? receptionRequest.received_products.map((item) => (item.amount * item.price)).reduce((acc, next) => acc + next) : 0;
}

function validateReception(receptionRequest) {
    var valid = receptionRequest.received_products.map((item) => (item.expiration_date && item.expiration_date && !isNaN(item.expiration_date))).reduce((acc, next) => acc && next);
    return valid;
}

function ReceptionModal(props) {
    const modalOrder = props.modalOrder;
    const items = modalOrder.products;

    if (items) {
        var originalItems = items.map((item) => ({ 'id': item.id, 'name': item.name, 'amount': item.amount, 'original_price': item.price, 'price': item.price }));
        initialValues.order_id = modalOrder.id;
        initialValues.received_products = originalItems;
        initialValues.total = modalOrder.total;
    }

    function onSubmit(values) {
        var validReception = validateReception(values);
        if (validReception) {
            props.sendRequest(values);
        } else {
            alert("Invalid reception");
        }
    }

    var formattedDate = format(new Date(), "dd/MM/yy HH:mm");

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
                                        {({ field, meta }) =>
                                            <FormControl fullWidth
                                                variant="standard"
                                                error={(meta.touched && meta.error)}
                                                key={field.name}
                                                size='small'
                                            >
                                                <InputLabel>Tipo coprobante</InputLabel>
                                                <Select
                                                    defaultValue={values.bill_type}
                                                    onChange={(e) => (values.bill_type = e.target.value)}
                                                    label="Comprobante"
                                                    size='small'
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
                                        {({ field, meta }) =>
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
                                <Reception values={values} />
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
                                    {({ field, meta }) =>
                                        <TextField
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
                                        />
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

export default ReceptionModal;