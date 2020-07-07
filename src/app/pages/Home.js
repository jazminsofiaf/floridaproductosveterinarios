import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PetsIcon from "@material-ui/icons/Pets";
import Toolbar from "@material-ui/core/Toolbar";
import UpperBar from "../components/UpperBar";

function Home(props) {

    const {classes} = props;

    return (
        <div className={classes.root}>
            <UpperBar/>
            <Toolbar/>
            <div>
                <Grid container spacing={3} className={classes.image}>
                    <Grid item xs={false} sm={4} md={7}></Grid>
                    <Grid item xs={12} sm={8} md={5} elevation={6} className={classes.titleContainer}>
                        <Box p={3}>
                            <Box display="flex" justifyContent="flex-start">
                                <Typography variant="h3" noWrap className={classes.mainTitle}>
                                    Florida
                                </Typography>
                                <PetsIcon/>
                            </Box>
                            <Typography variant="h4" align="left" className={classes.mainTitle}>
                                Productos Veterinarios Online
                            </Typography>
                            <Typography variant="h6" align="left" className={classes.mainTitle}>
                                Ahora toda la ayuda que necesitas a un click de distancia!
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const styles = theme => ({
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1524511751214-b0a384dd9afe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',

        height: '70vh',
        backgroundPosition: 'center',

        //para el cuadrado contenido dentro
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    titleContainer: {
        backgroundColor: 'rgba(250,235,215, 0.6)',
    },
    mainTitle: {
        color: 'black',
        fontWeight: 900,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.primary.main,
        height: 300,
    },
});


export default withStyles(styles)(Home);
