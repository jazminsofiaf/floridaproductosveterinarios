import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import { Field } from "formik";
import { Typography } from '@material-ui/core';


function ReceptionRow(props: any) {
    const {item, index} = props;
    const [selectedDate, setSelectedDate] = useState(
        new Date()
    );

    item.expiration_date = selectedDate;

    const handleDateChange = (date: any)  => {
        setSelectedDate(date);
        item.expiration_date = selectedDate;
    };

    return (
        <Paper style={{ margin: '1px 1px 10px 1px' }}>
            <Grid container spacing={1}>
                <Grid item xs={5} style={{ paddingTop: '10px' }}>{item.name}</Grid>
                <Grid item xs={1} style={{ paddingTop: '10px' }}>${item.original_price}</Grid>
                <Grid item xs={1}>
                    <Field name={`received_products[${index}].amount`}>
                        {({ field, meta } : any) =>
                            <TextField
                                {...field}
                                variant="standard"
                                type="number"
                                required
                                InputProps={{ inputProps: { min: 0 } }}
                                value={item.amount}
                                fullWidth
                                key={field.name}
                                error={(meta.touched && meta.error !== undefined)}
                                helperText={((meta.touched) && meta.error)}
                            />
                        }
                    </Field>
                </Grid>
                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field name={`received_products[${index}].expiration_date`}>
                            {({ field, meta } : any) =>
                                <KeyboardDatePicker
                                    {...field}
                                    disableToolbar
                                    disablePast
                                    key={field.name}
                                    emptyLabel="Fecha venc."
                                    format="dd/MM/yyyy"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    inputVariant="standard"
                                    error={(meta.touched && meta.error !== undefined)}
                                    helperText={((meta.touched) && meta.error)}
                                />
                            }
                        </Field>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={1}>
                    <Field name={`received_products[${index}].price`}>
                        {({ field, meta } : any) =>
                            <TextField
                                {...field}
                                variant="standard"
                                type="decimal"
                                required
                                InputProps={{ inputProps: { min: 0 } }}
                                value={item.price}
                                fullWidth
                                key={field.name}
                                error={(meta.touched && meta.error !== undefined)}
                                helperText={((meta.touched) && meta.error)}
                            />
                        }
                    </Field>
                </Grid>
                <Grid item xs={1}>
                    <Typography style={{ paddingTop: '0.2em' }}>{item.price * item.amount}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )

}

export default ReceptionRow;