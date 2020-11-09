import React, {useEffect, useState} from 'react';
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
import {createStyles, Theme} from "@material-ui/core";
import Loader from "../shared/Loader";
import {useDispatch, useSelector} from "react-redux";
import {
    createSupplierProduct,
    fetchSuppliers2,
    refreshWithDelay2
} from "../../actions/actions";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";


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

function supplierSelection(props: any) {
    return (
        <Autocomplete
            id="supplier-box"
            options={props.suppliers ? props.suppliers : []}
            getOptionLabel={(option: ISupplier) => option.name_summary}
            onChange={(event, newValue) => {
                props.setSelectedSupplier(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar proveedor"
                                                variant="outlined"/>}
        />
    )
}

const initialValues = {
    supplier_id: '',
    name: '',
    brand: '',
    cost: '',
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        // .matches(/^[a-zA-Z0-9\s.]*$/, wordInputValidationMessage)
        .max(50, maxCharsMessage(50))
        .required("Debe setear un nombre."),
    brand: Yup.string()
        // .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
        .max(40, maxCharsMessage(40))
        .required("Debe setear una marca."),
    cost: Yup.string().matches(/^[0-9]*[.,]?[0-9]*$/, numberMessageValidation)
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

const CreateSupplierProduct = () => {
    const classes = useFormStyles();
    const [selectedSupplier, setSelectedSupplier] = useState<ISupplier>();
    const suppliers = useSelector((state: any) => state.suppliers);
    const {error, success, submitting} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSuppliers2())
    }, [dispatch]);

    function onSubmit(values: any) {
        if (selectedSupplier && selectedSupplier.id !== ''){
            values.supplier_id = selectedSupplier.id;
            dispatch(createSupplierProduct(values));
        }
    }

    if (error || success) {
        dispatch(refreshWithDelay2());
        initialValues.supplier_id = '';
        initialValues.name = '';
        initialValues.brand = '';
        initialValues.cost = '';
    }

    return (
        <>
            <Container component="main" maxWidth='sm'>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <IconAnimation height={50} width={50}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear nuevo producto de proveedor
                    </Typography>
                    <Formik initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                    >
                        {({values, isSubmitting}) => (
                            <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>{supplierSelection({suppliers, setSelectedSupplier})}</Grid>
                                    <Grid item xs={12} sm={12}>
                                        {getTextField("name", "Nombre", true)}
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        {getTextField("brand", "Marca", true)}
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        {getTextField("cost", "Costo", true)}
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Cargar producto
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

export default CreateSupplierProduct;