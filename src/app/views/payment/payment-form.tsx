import React from 'react';
import {Paper, Grid, Typography, Select, TextField, FormControl, InputLabel, MenuItem, Button} from '@material-ui/core'
import {Field, FieldArray, Form, Formik} from "formik";
import {useDispatch} from "react-redux";
import {addCustomerPayment} from "../../actions/actions";

const payment = {
    payment_method: 'CASH',
    amount: '',
    ref_number: '',
}
const initialValues = {
    owner_id: '',
    payments: [payment]
}

const PaymentForm = (props: any) => {
    const dispatch = useDispatch();
    const {ownerId, handleClose} = props;

    initialValues.owner_id = ownerId;

    function onSubmit(values: any) {
        dispatch(addCustomerPayment(values))
        handleClose();
    }

    return (
        <Paper style={{padding: '2px'}}>
            <Typography variant="subtitle1">Ingresar Pago</Typography>
            <Grid container spacing={1}>
                <Formik initialValues={initialValues}
                        onSubmit={onSubmit}>
                    {({values, isSubmitting}) => (
                        <Form>
                            <FieldArray name={"payments"}>
                                {({push, remove}) => (

                                    <React.Fragment>
                                        {values.payments && values.payments.length > 0 && values.payments.map((payment, index: number) =>
                                            <Grid container spacing={1} key={`payments[${index}]`}>
                                                <Grid item xs={12} sm={12}
                                                      style={{textAlign: 'left'}}>Metodo {index + 1}</Grid>
                                                <Grid item xs={6} sm={4}>
                                                    <Field name={`payments[${index}].payment_method`}>
                                                        {({field, meta}: any) =>
                                                            <FormControl fullWidth
                                                                         variant="outlined"
                                                                         error={(meta.touched && meta.error !== undefined)}>
                                                                <InputLabel>Metodo de pago</InputLabel>
                                                                <Select
                                                                    defaultValue={payment.payment_method}
                                                                    onChange={(e) => (
                                                                        payment.payment_method = String(e.target.value))}
                                                                    label="Metodo de pago"
                                                                    fullWidth
                                                                    id={field.name}
                                                                >
                                                                    <MenuItem value={'CASH'}>Efectivo</MenuItem>
                                                                    <MenuItem value={'CHECK'}>Cheque</MenuItem>
                                                                    <MenuItem
                                                                        value={'BANK_TRANSFER'}>Transferencia</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        }
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={6} sm={payment.payment_method !== 'CASH' ? 2 : 5}>
                                                    <Field name={`payments[${index}].amount`}>
                                                        {({field, meta}: any) =>
                                                            <TextField
                                                                {...field}
                                                                variant="outlined"
                                                                required
                                                                fullWidth
                                                                id={field.name}
                                                                label="Monto"
                                                                type="number"
                                                                error={(meta.touched && meta.error !== undefined)}
                                                                helperText={((meta.touched) && meta.error)}
                                                            />
                                                        }
                                                    </Field>
                                                </Grid>
                                                {payment.payment_method !== 'CASH' ?
                                                    <Grid item xs={6} sm={5}>
                                                        <Field name={`payments[${index}].ref_number`}>
                                                            {({field, meta}: any) =>
                                                                <TextField
                                                                    {...field}
                                                                    variant="outlined"
                                                                    required
                                                                    fullWidth
                                                                    id={field.name}
                                                                    label={payment.payment_method === 'CHECK' ? "Nro Cheque" : "Nro Comprobante"}
                                                                    type="number"
                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                    helperText={((meta.touched) && meta.error)}
                                                                />
                                                            }
                                                        </Field>
                                                    </Grid>
                                                    : <Grid item xs={6} sm={2}></Grid>}
                                                <Grid item xs={1} hidden={index === 0}>
                                                    <button
                                                        key={`button[${index}]`}
                                                        onClick={() => remove(index)}
                                                        style={{marginTop: '20px'}}
                                                    >X
                                                    </button>
                                                </Grid>
                                            </Grid>
                                        )}
                                        <Button
                                            type="button"
                                            disabled={isSubmitting || values.payments.length > 2}
                                            variant="contained"
                                            color="default"
                                            onClick={() => push(payment)}
                                            style={{marginTop: '10px'}}
                                        >
                                            Agregar metodo
                                        </Button>
                                    </React.Fragment>
                                )}

                            </FieldArray>
                            <Button
                                style={{marginTop: '10px'}}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Cargar pago
                            </Button>

                        </Form>
                    )}
                </Formik>
            </Grid>
        </Paper>
    )
}

interface IPaymentForm {
    ownerId: string;
    submitPayment: (iPayment: IPaymentPostData) => void;
}

export default PaymentForm;