import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import withStyles from "@material-ui/core/styles/withStyles";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import IconAnimation from "../shared/iconAnimation/IconAnimation";
import UpperBar from "../upperBar/UpperBar"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {createStyles, Theme} from "@material-ui/core";
import Loader from "../shared/Loader";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Florida-ProductosVeterinarios
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const numberMessageValidation = 'Solo numeros';
const wordInputValidationMessage = "Letras unicamente"
const maxNumberOfAddresses = 3;

function maxCharsMessage(max: number) {
    return 'Maximo de ' + max + ' caracteres';
}

const newAddress = {
    country: 'Argentina',
    province: '',
    city: '',
    locality: '',
    street_name: '',
    street_number: '',
    postal_code: '',
    floor_number: ''
}

const initialValues = {
    first_name: '',
    surname: '',
    business_name: '',
    id_number: '',
    email: '',
    phone: '',
    category: 'abc1',
    addresses: [newAddress],
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Mail invalido')
        .max(40, maxCharsMessage(40)),
    first_name: Yup.string()
        .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40))
        .required("Debe setear un nombre."),
    surname: Yup.string()
        .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40)),
    business_name: Yup.string()
        .max(40, maxCharsMessage(40)),
    id_number: Yup.string().matches(/^[0-9]*$/, numberMessageValidation)
        .max(15, maxCharsMessage(15)),
    phone: Yup.string()
        .max(15, maxCharsMessage(15))
        .required("Debe ingresar telefono."),
    category: Yup.string().required("Debe seleccionar la categoria."),
    addresses: Yup.array().of(Yup.object({
        country: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(20, maxCharsMessage(20)),
        province: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(40, maxCharsMessage(40)),
        city: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(40, maxCharsMessage(40)),
        street_name: Yup.string()
            .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
            .max(40, maxCharsMessage(40)),
        street_number: Yup.string()
            .matches(/^[0-9]*$/, numberMessageValidation)
            .max(8, maxCharsMessage(8)),
        postal_code: Yup.string()
            .max(10, maxCharsMessage(10)),
        floor_number: Yup.string()
            .max(6, maxCharsMessage(6))
    })),
});

const styles = (theme : Theme) => createStyles({
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


const CreateCustomer = (({createCustomer, classes, success, error, submitting, refreshWithDelay} : ICreateCustomer) => {

        function onSubmit(values: any) {
            console.log(values);
            createCustomer(values);
        }

        if (error || success) {
            refreshWithDelay();
        }

        return (
            <>
                <UpperBar />
                <Container component="main" maxWidth='sm'>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <IconAnimation height={50} width={50} />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Crear nuevo cliente
                        </Typography>
                        <Formik initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {({ values, isSubmitting }) => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" align="left" className={classes.mainTitle}>
                                                Datos personales
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field name={"first_name"}>
                                                {({ field, meta } : any) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        id="first_name"
                                                        label="Nombre"
                                                        type="text"
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field name={"surname"}>
                                                {({ field, meta } : any) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="surname"
                                                        label="Apellido"
                                                        type="text"
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Field name={"business_name"}>
                                                {({ field, meta } : any) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="business_name"
                                                        label="Razon social / Alias"
                                                        type="text"
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field name={"id_number"}>
                                                {({ field, meta } : any) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="id_number"
                                                        label="cuit/cuil/dni"
                                                        type="text"
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <Field name={"email"}>
                                                {({ field, meta } : any) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        id="email"
                                                        label="Email"
                                                        type="text"
                                                        autoComplete="email"
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field name={"phone"}>
                                                {({ field, meta } : any) =>
                                                    <TextField
                                                        {...field}
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        id="phone"
                                                        label="Telefono"
                                                        type="text"
                                                        error={(meta.touched && meta.error !== undefined)}
                                                        helperText={((meta.touched) && meta.error)}
                                                    />
                                                }
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field name={"category"}>
                                                {({ field, meta } : any) =>
                                                    <FormControl fullWidth 
                                                                variant="outlined" 
                                                                error={(meta.touched && meta.error !== undefined)}>
                                                        <InputLabel>Categoria</InputLabel>
                                                        <Select
                                                            defaultValue={values.category}
                                                            onChange={(e) => (values.category = String(e.target.value))}
                                                            label="Categoria"
                                                        >
                                                            <MenuItem value={'abc1'}>Vaterinario</MenuItem>
                                                            <MenuItem value={'bcd2'}>Proteccionista</MenuItem>
                                                            <MenuItem value={'cdf3'}>Individuo</MenuItem>
                                                            <MenuItem value={'dfg4'}>Otro</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                }
                                            </Field>
                                        </Grid>


                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" align="left" className={classes.mainTitle}>
                                                Direccion
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FieldArray name={"addresses"}>
                                                {({ push, remove }) => (
                                                    <React.Fragment>
                                                        {values.addresses && values.addresses.length > 0 && values.addresses.map((address, index: number) =>
                                                            <div key={`addresses[${index}]`}>
                                                                <Grid container spacing={1}>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <Field name={`addresses[${index}].country`}>
                                                                            {({ field, meta } : any) => //Child function that acts as render prop
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    disabled
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Pais"
                                                                                    type="text"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <Field name={`addresses[${index}].province`}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Provincia"
                                                                                    type="text"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <Field name={`addresses[${index}].city`}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Partido"
                                                                                    type="text"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <Field name={`addresses[${index}].locality`}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Localidad"
                                                                                    type="text"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={8}>
                                                                        <Field name={`addresses[${index}].street_name`}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Calle"
                                                                                    type="text"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <Field name={`addresses[${index}].street_number`}
                                                                            type={"number"}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Numero"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <Field name={`addresses[${index}].postal_code`}
                                                                            type={"text"}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Codigo postal"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                    <Grid item xs={4}>
                                                                        <Field name={`addresses[${index}].floor_number`}
                                                                            type={"text"}>
                                                                            {({ field, meta } : any) =>
                                                                                <TextField
                                                                                    {...field}
                                                                                    variant="outlined"
                                                                                    fullWidth
                                                                                    key={field.name}
                                                                                    label="Piso"
                                                                                    error={(meta.touched && meta.error !== undefined)}
                                                                                    helperText={((meta.touched) && meta.error)}
                                                                                />
                                                                            }
                                                                        </Field>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} hidden={index === 0}>
                                                                    <button
                                                                        type={"button"}
                                                                        key={`button[${index}]`}
                                                                        onClick={() => remove(index)}
                                                                        style={{ marginTop: '5px' }}
                                                                    >X
                                                                </button>
                                                                </Grid>
                                                                <div hidden={index === (values.addresses.length - 1)}>
                                                                    <hr style={{ margin: '5px 0px 5px 0px' }} />
                                                                    <Typography style={{ marginBottom: '5px' }} variant="subtitle1" align="left" className={classes.mainTitle}>
                                                                        Direccion alternativa {index + 1}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <Button
                                                            type="button"
                                                            disabled={isSubmitting || values.addresses.length === maxNumberOfAddresses}
                                                            variant="contained"
                                                            color="default"
                                                            onClick={() => push(newAddress)}
                                                            style={{ marginTop: '10px' }}
                                                        >
                                                            Agregar direccion
                                                    </Button>
                                                    </React.Fragment>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                        Crear cliente
                                </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
                <Loader isLoading={submitting} isSuccess={success} error={error} />
            </>
        );
});

interface ICreateCustomer extends IComponent {
    createCustomer: (iCustomer: ICustomer) => void;
    classes : any;
}


export default withStyles(styles)(CreateCustomer);