import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import HomeIcon from '@material-ui/icons/Home';
import withRouter from "react-router-dom/es/withRouter";



function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Line() {
    return (
        <hr style={{
            color: 'black',
            backgroundColor: 'black',
            height: 2
        }}
        />
    );
}

class UpperBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            anchorEl: null,
        }
    }


    goFAQ = () => {
        this.props.history.push('/faq');
    }





    render() {
        const { classes } = this.props;
        return (
            <div>
                <CssBaseline />
                <HideOnScroll {...this.props}>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Hidden only={['sm', 'xs']}>
                                <Typography variant="h6" noWrap className={classes.mainTitle} onClick={this.goHomePage}>
                                    Florida Productos veterinarios
                                </Typography>
                            </Hidden>

                            <Hidden only={['sm', 'xs']}>
                                <Button variant="text" className={classes.menuBarItem}
                                        onClick={this.goFAQ}>Preguntas frecuentes</Button>
                            </Hidden>

                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                className={classes.menuBarItem}
                                onClick={this.goHomePage}>
                                <HomeIcon />
                            </IconButton>

                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            </div>
        );
    }
}




const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    mainTitle: {
        textAlign: 'left',
        flexGrow: 1,
    },

    menuBar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuBarItem: {
        margin: theme.spacing(1, 1.5),
        textTransform: 'none',
        alignItems: 'center',
        color: 'white',

        [theme.breakpoints.down("sm")]: {
            flexGrow: 1,
            alignItems: 'stretch',
            marginBottom: 0,
            marginTop: 0,
        },
    },

});

export default withRouter(withStyles(styles)(UpperBar));
