import React from 'react';
// import * as Yup from "yup";
import {Theme} from "@material-ui/core";
import UpperBar from "../upperBar/UpperBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import IconAnimation from "../shared/iconAnimation/IconAnimation";
import Typography from "@material-ui/core/Typography";
import {Field, Form, Formik} from "formik";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Autocomplete} from "@material-ui/lab";
import { fieldToTextField } from 'formik-material-ui';
import {useDispatch, useSelector} from "react-redux";
import {createDistributorProduct, refreshWithDelay, refreshWithDelay2} from "../../actions/actions";
import Loader from "../shared/Loader";


// const numberMessageValidation = 'Solo numeros';
// const wordInputValidationMessage = "Letras unicamente"
//
// function maxCharsMessage(max: number) {
//     return 'Maximo de ' + max + ' caracteres';
// }

const initialValues = {
    name: '',
    category: '',
    brand: '',
    application: '',
    species: '',
    image: '',
    presentation: {
        format: '',
        amount: '',
        measure: ''
    }
};

// const validationSchema = Yup.object().shape({
//     email: Yup.string()
//         .email('Mail invalido')
//         .max(40, maxCharsMessage(40)),
//     first_name: Yup.string()
//         .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
//         .max(40, maxCharsMessage(40))
//         .required("Debe setear un nombre."),
//     surname: Yup.string()
//         .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
//         .max(40, maxCharsMessage(40)),
//     business_name: Yup.string()
//         .max(40, maxCharsMessage(40)),
//     id_number: Yup.string().matches(/^[0-9]*$/, numberMessageValidation)
//         .max(15, maxCharsMessage(15)),
//     phone: Yup.string()
//         .max(15, maxCharsMessage(15))
//         .required("Debe ingresar telefono."),
//     category: Yup.string().required("Debe seleccionar la categoria."),
//     addresses: Yup.array().of(Yup.object({
//         country: Yup.string()
//             .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
//             .max(20, maxCharsMessage(20)),
//         province: Yup.string()
//             .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
//             .max(40, maxCharsMessage(40)),
//         city: Yup.string()
//             .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
//             .max(40, maxCharsMessage(40)),
//         street_name: Yup.string()
//             .matches(/^[a-zA-Z\s.]*$/, wordInputValidationMessage)
//             .max(40, maxCharsMessage(40)),
//         street_number: Yup.string()
//             .matches(/^[0-9]*$/, numberMessageValidation)
//             .max(8, maxCharsMessage(8)),
//         postal_code: Yup.string()
//             .max(10, maxCharsMessage(10)),
//         floor_number: Yup.string()
//             .max(6, maxCharsMessage(6))
//     })),
// });

const useStyles = makeStyles((theme: Theme) => ({
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
    mainTitle: {
        color: 'black',
        fontWeight: 900,
    }
}));

const species = [
    'felinos',
    'caninos',
    'caprinos',
    'bovinos',
    'equinos',
    'ovinos',
    'porcinos'
];

const categories = [
    'Ambiental',
    'Analgesico',
    'Anestesico',
    'Antiácido',
    'Antiartrósico',
    'Antibiotico',
    'Antidiarreico',
    'Antiespasmódico',
    'Antifungico',
    'Antihistaminico',
    'Antiinflamatorio',
    'Antimicotico',
    'Antiparasitario',
    'Antiparasitario externo',
    'Antiparasitario interno',
    'Antipiretico',
    'Antiseptico',
    'Antiviral',
    'Bio-energizante',
    'Biologico',
    'Biomodulador',
    'Cardiologico',
    'Carminativo',
    'Cicatrizante',
    'Condroprotector',
    'Crema protectiva',
    'Cuidado natural',
    'Dermatologico',
    'Dermo-Cosmetica',
    'Descatable',
    'Digestivo',
    'Endectocida',
    'Energetico',
    'Especialidad',
    'Especifico',
    'Farmacologico',
    'Gariatrico',
    'Gastroenterologico',
    'Higiene y belleza',
    'Hormonal',
    'Inmunologico',
    'Mineralizante',
    'Mucolítico',
    'Neurologico',
    'No esteroide',
    'Nutricional',
    'Odontologico',
    'Oftalmico',
    'Osteoarticular',
    'Otologico',
    'Pelo y piel',
    'Quimioterapico',
    'Reproductivo',
    'Respiratorio',
    'Revitalizante',
    'Sedante',
    'Sistema nervioso',
    'Suplemento dietario',
    'Tranquilizante',
    'Urinario',
    'Vacuna',
    'Vitaminicos'
];

const brands = [
    'Afford',
    'Aton',
    'Bayer',
    'Boehringer Ingelheim',
    'Brouwer',
    'Dr. Gray',
    'Elanco',
    'Elmer',
    'Enzimol',
    'Equi System',
    'Heilen Blitz',
    'Holliday',
    'Huellitas',
    'IDV',
    'Intervet',
    'Janvier',
    'John Martin',
    'Konig',
    'Kualkos',
    'Lab Vetue',
    'Labyes',
    'Lamar',
    'Laser',
    'Love',
    'LTF',
    'Mayors',
    'Merial',
    'Mervak',
    'Microsules Arg',
    'MSD',
    'Over',
    'Paul',
    'Pharmagro',
    'Pharmavet',
    'Richmond',
    'Rio de Janeiro',
    'Rosenbusch',
    'Ruminal',
    'Tritonvet',
    'Vetanco',
    'Virbac',
    'Von Franken',
    'Zoetis',
    'Zoovet',
    ''
]


function nameField() {
    return <Field name={"name"}>
        {({field, meta}: any) =>
            <TextField
                {...field}
                variant="outlined"
                fullWidth
                required
                id="name"
                label="Nombre"
                type="text"
                error={(meta.touched && meta.error !== undefined)}
                helperText={((meta.touched) && meta.error)}
            />
        }
    </Field>;
}

function categoryField() {
    return <Field name='category' component={FormikAutocomplete}
           autoCompleteProps={{multiple: true, options:categories, filterSelectedOptions: true}}
           textFieldProps={{ fullWidth: true, variant: 'outlined', label: "Categorias"}}
    />
}

const FormikAutocomplete = ({ autoCompleteProps, textFieldProps, ...props } : any) => {

    const { form: { setFieldValue } } = props;
    const { error, helperText, ...field } = fieldToTextField(props);
    const { name } = field;

    return (
        <Autocomplete
            {...autoCompleteProps}
            onChange={ (_, value) => setFieldValue(name, value) }
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...textFieldProps}
                    helperText={helperText} error={error}
                />
            )}
        />
    );
}


function brandField() {
    return <Field name='brand' component={FormikAutocomplete}
                  autoCompleteProps={{options:brands}}
                  textFieldProps={{ fullWidth: true, variant: 'outlined', label: "Marca/Laboratorio" }}
    />
}

function applicationField<Values>(values: any) {
    return <Field name={"application"}>
        {({meta}: any) =>
            <FormControl fullWidth
                         variant="outlined"
                         error={(meta.touched && meta.error !== undefined)}>
                <InputLabel>Aplicacion</InputLabel>
                <Select
                    defaultValue={values.application}
                    onChange={(e) => (values.application = String(e.target.value))}
                    label="Aplicacion"
                >
                    <MenuItem value={'Externa'}>Externa</MenuItem>
                    <MenuItem value={'Inyectable'}>Inyactable</MenuItem>
                    <MenuItem value={'Oral'}>Oral</MenuItem>
                </Select>
            </FormControl>
        }
    </Field>;
}

function speciesField() {
    return <Field name='species' component={FormikAutocomplete}
                  autoCompleteProps={{multiple: true, options:species, filterSelectedOptions: true}}
                  textFieldProps={{ fullWidth: true, variant: 'outlined', label: "Especies" }}
    />
}

function imageField() {
    return <Field name={"image"}>
        {({field, meta}: any) =>
            <TextField
                {...field}
                variant="outlined"
                fullWidth
                id="image"
                label="Imagen url"
                type="text"
                error={(meta.touched && meta.error !== undefined)}
                helperText={((meta.touched) && meta.error)}
            />
        }
    </Field>;
}

function presentationFormatField<Values>(values: any) {
    return <Field name={"presentation.format"}>
        {({meta}: any) =>
            <FormControl fullWidth
                         variant="outlined"
                         error={(meta.touched && meta.error !== undefined)}>
                <InputLabel>Formato</InputLabel>
                <Select
                    defaultValue={values.presentation.format}
                    onChange={(e) => (values.presentation.format = String(e.target.value))}
                    label="Formato"
                >
                    <MenuItem value={'Botella'}>Botella</MenuItem>
                    <MenuItem value={'Botellas'}>Botellas</MenuItem>
                    <MenuItem value={'Aerosol'}>Aerosol</MenuItem>
                    <MenuItem value={'Ampolla'}>Ampolla</MenuItem>
                    <MenuItem value={'Frasco ampolla'}>Frasco Ampolla</MenuItem>
                    <MenuItem value={'Blister'}>Blister</MenuItem>
                    <MenuItem value={'Caja'}>Caja</MenuItem>
                    <MenuItem value={'Cajita'}>Cajita</MenuItem>
                    <MenuItem value={'Collar'}>Collar</MenuItem>
                    <MenuItem value={'Dosis'}>Dosis</MenuItem>
                    <MenuItem value={'Flow pack'}>Flow pack</MenuItem>
                    <MenuItem value={'Frasco'}>Frasco</MenuItem>
                    <MenuItem value={'Gotas'}>Gotas</MenuItem>
                    <MenuItem value={'Gotero'}>Gotero</MenuItem>
                    <MenuItem value={'Jeringa'}>Jeringa</MenuItem>
                    <MenuItem value={'Pipeta'}>Pipeta</MenuItem>
                    <MenuItem value={'Pomo'}>Pomo</MenuItem>
                    <MenuItem value={'Pote'}>Pote</MenuItem>
                    <MenuItem value={'Sobre'}>Sobre</MenuItem>
                    <MenuItem value={'Spray'}>Spray</MenuItem>
                    <MenuItem value={'Talco'}>Talco</MenuItem>
                    <MenuItem value={''}>Ninguno</MenuItem>
                </Select>
            </FormControl>
        }
    </Field>;
}

function presentationAmountField() {
    return <Field name={"presentation.amount"}>
        {({field, meta}: any) =>
            <TextField
                {...field}
                variant="outlined"
                fullWidth
                id="amount"
                label="Cantidad/Capacidad"
                type="number"
                error={(meta.touched && meta.error !== undefined)}
                helperText={((meta.touched) && meta.error)}
            />
        }
    </Field>;
}

function presentationMeasureField<Values>(values: any) {
    return <Field name={"presentation.measure"}>
        {({meta}: any) =>
            <FormControl fullWidth
                         variant="outlined"
                         error={(meta.touched && meta.error !== undefined)}>
                <InputLabel>Medida</InputLabel>
                <Select
                    defaultValue={values.presentation.measure}
                    onChange={(e) => (values.presentation.measure = String(e.target.value))}
                    label="Medida"
                >
                    <MenuItem value={'u.'}>Unidad/Unidades</MenuItem>
                    <MenuItem value={'ds.'}>Dosis</MenuItem>
                    <MenuItem value={'ml.'}>Mililitros</MenuItem>
                    <MenuItem value={'cm.'}>Centimetros</MenuItem>
                    <MenuItem value={'comp.'}>Comprimidos</MenuItem>
                    <MenuItem value={'comp. masticables'}>Comprimidos
                        masticables</MenuItem>
                    <MenuItem value={'comp. palatables'}>Comprimidos
                        palatables</MenuItem>
                    <MenuItem value={'mgr.'}>Miligramos</MenuItem>
                    <MenuItem value={'gr.'}>Gramos</MenuItem>
                    <MenuItem value={'Tableta'}>Tableta/Tabletas</MenuItem>
                    <MenuItem value={'Tableta masticable'}>Tableta
                        masticable</MenuItem>
                    <MenuItem value={'Tableta palatable'}>Tableta
                        palatable</MenuItem>
                    <MenuItem value={'Tubo'}>Tubo</MenuItem>
                    <MenuItem value={''}>Ninguno</MenuItem>
                </Select>
            </FormControl>
        }
    </Field>;
}

function onKeyDown(keyEvent: any) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
        keyEvent.preventDefault();
    }
}

const CreateProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {error, success, submitting} = useSelector((state: any) => state);


    function onSubmit(values: any) {
        values.category = values.category.join('+');
        if (values) {
            dispatch(createDistributorProduct(values))
        }
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
                        Crear nuevo producto
                    </Typography>
                    <Formik initialValues={initialValues}
                        // validationSchema={validationSchema}
                            onSubmit={onSubmit}
                    >
                        {({values, isSubmitting}) => (
                            <Form onKeyDown={onKeyDown}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {nameField()}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {categoryField()}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {brandField()}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {applicationField(values)}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {speciesField()}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {imageField()}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" align="left" className={classes.mainTitle}>
                                            Presentacion:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        {presentationFormatField(values)}
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        {presentationAmountField()}
                                    </Grid>
                                    <Grid item xs={12} sm={7}>
                                        {presentationMeasureField(values)}
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Crear producto
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
            <Loader isLoading={submitting} isSuccess={success} error={error} />
        </>
    );
};


export default CreateProduct;