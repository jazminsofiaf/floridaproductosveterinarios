import React, { useCallback } from 'react';
import { withRouter, Redirect } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import PetsIcon from '@material-ui/icons/Pets';
import Copyright from "../Copyright";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../../actions/actions";

function Login(props) {
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state);

    const handleLogIn = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            const credentials = {
                email: email.value,
                password: password.value
            }
            try {
                dispatch(userLogin(credentials))
                    .then(async () => {
                            props.history.push("/");
                        })
            } catch (error) {
                alert(error);
            }
        },
        [props.history, dispatch]
    );

    // const handleLogIn = useCallback(
    //     async event => {
    //         event.preventDefault();
    //         const { email, password } = event.target.elements;
    //         try {
    //             await
    //                 Fire
    //                     .auth()
    //                     .signInWithEmailAndPassword(email.value, password.value)
    //                     .then(async res => {
    //                         const token = await Object.entries(res.user)[5][1].b
    //                         localStorage.setItem('token', token)
    //                         props.history.push("/");
    //                     })
    //         } catch (error) {
    //             alert(error);
    //         }
    //     },
    //     [props.history]
    // );

    const handleSignUp = (event) => {
        // props.history.push('/sign-up');
    }

    const handleForgotPassword = (event) => {
        // console.log("forgot password")
    }

    const { classes } = props;

    return (
        currentUser ? <Redirect to="/" /> :
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} >
                    <div className={classes.titleContainer}>
                        <Box display="flex" justifyContent="center" m={1} p={1} >
                            <Typography variant="h4" noWrap className={classes.mainTitle}>
                                FLORIDA
                        </Typography>
                            <PetsIcon className={classes.icon} />
                        </Box>
                        <Typography variant="h4" className={classes.mainTitle}>
                            Online
                    </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Ingresar
                    </Typography>
                        <form className={classes.form} noValidate onSubmit={handleLogIn}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recuerdame"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Iniciar sesion
                        </Button>
                            <Grid container spacing={1}>
                                <Grid item xs>
                                    <Link variant="body2" onClick={handleForgotPassword}>
                                        Olvide mi contraseña
                                </Link>
                                </Grid>
                                <Grid item xs>
                                    <Link variant="body2" onClick={handleSignUp}>
                                        {"¿No tenes cuenta? Solicitala aca!"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
    );
}

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1544568104-5b7eb8189dd4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    titleContainer: {
        marginTop: '15%',
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: theme.palette.primary.main,

    },
    icon: {
        color: 'antiquewhite',
    },
    mainTitle: {
        color: 'antiquewhite',
        fontWeight: 900,
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue??.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

export default withRouter(withStyles(styles)(Login));