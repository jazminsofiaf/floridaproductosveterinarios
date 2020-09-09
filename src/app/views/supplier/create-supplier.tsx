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
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import IconAnimation from "../shared/iconAnimation/IconAnimation";
import UpperBar from "../upperBar/UpperBar"
import {createStyles, Theme} from "@material-ui/core";
import Loader from "../shared/Loader";
import {useDispatch, useSelector} from "react-redux";
import {createSupplier, refreshWithDelay2} from "../../actions/actions";
import {makeStyles} from "@material-ui/core/styles";


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

function maxCharsMessage(max: number) {
    return 'Maximo de ' + max + ' caracteres';
}

const initialValues = {
    name: '',
    email: '',
    company_phone: '',
    cuit_number: '',
    gross_income_number: '',
    gross_tax: '',
    product_discount: '',
    street_name: '',
    street_number: '',
    postal_code: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^[a-zA-Z()\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40))
        .required("Debe setear un nombre."),
    email: Yup.string()
        .email('Mail invalido')
        .max(40, maxCharsMessage(40)),
    company_phone: Yup.string()
        .max(15, maxCharsMessage(15))
        .required("Debe ingresar telefono."),
    cuit_number: Yup.string().matches(/^[0-9]*$/, numberMessageValidation)
        .max(15, maxCharsMessage(15)),
    gross_income_number: Yup.string().matches(/^[0-9]*$/, numberMessageValidation)
        .max(15, maxCharsMessage(15)),
    gross_tax: Yup.string().matches(/^[0-9]*[.,]?[0-9]*$/, numberMessageValidation)
        .max(6, maxCharsMessage(6)),
    product_discount: Yup.string().matches(/^[0-9]*[.,]?[0-9]*$/, numberMessageValidation)
        .max(6, maxCharsMessage(6)),
    street_name: Yup.string()
        .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40)),
    street_number: Yup.string()
        .matches(/^[0-9]*$/, numberMessageValidation)
        .max(8, maxCharsMessage(8)),
    postal_code: Yup.string()
        .max(10, maxCharsMessage(10)),
});

const useFormStyles = makeStyles((theme: Theme) =>
    createStyles({
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
}));


function getTextField(name:string, label: string, required:boolean) {
    return <Field name={name}>
        {({field, meta}: any) =>
            <TextField
                {...field}
                variant="outlined"
                fullWidth
                required={required}
                id="first_name"
                label={label}
                type="text"
                error={(meta.touched && meta.error !== undefined)}
                helperText={((meta.touched) && meta.error)}
            />
        }
    </Field>;
}

const CreateSupplier = () => {
    const classes = useFormStyles();
    const {error, success, submitting} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    function onSubmit(values: any) {
        dispatch(createSupplier(values));
    }

    if (error || success) {
        dispatch(refreshWithDelay2());
    }

    return (
        <>
            <UpperBar/>
            <Container component="main" maxWidth='sm'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <IconAnimation height={50} width={50}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear nuevo proveedor
                    </Typography>
                    <Formik initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                    >
                        {({values, isSubmitting}) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left">
                                            Datos proveedor
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        {getTextField("name", "Nombre", true)}
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        {getTextField("email", "Email", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        {getTextField("company_phone", "Telefono", true)}
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        {getTextField("cuit_number", "CUIT", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        {getTextField("gross_income_number", "Nro. IIBB", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        {getTextField("gross_tax", "IIBB(%)", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        {getTextField("product_discount", "Descuento(%)", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {getTextField("street_name", "Calle", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        {getTextField("street_number", "Numero", false)}
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        {getTextField("postal_code", "Codigo postal", false)}
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Crear Proveedor
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </Container>
            <Loader isLoading={submitting} isSuccess={success} error={error}/>
        </>
    )
};

export default CreateSupplier;