import React, {useContext} from 'react';
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
import { withRouter } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
    LocalShipping,
    People,
    PersonAdd,
    SaveAltOutlined,
    ShoppingBasket,
    ShoppingCart, ShopTwo,
    Store,
    Home
} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountBar from "./AccountMenu";
import {AuthContext} from "../../providers/Auth";
import SupplierMenu2 from "./SupplierMenu";


function HideOnScroll(props) {
    const {children, window} = props;
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}



function UpperBar(props) {
    const { currentUser } = useContext(AuthContext);
    const isLogged = Boolean(currentUser);

    const goHomePage = () => {
        props.history.push('/');
    }

    // function goFAQ() {
    //     props.history.push('/faq');
    // }

    const goToSuppliersPage = () => {
        props.history.push('/supplier-orders');
    }

    const goToSupplierOrderPage = () => {
        props.history.push('/supplier-order');
    }

    const goToSupplierOrdersPage = () => {
        props.history.push('/supplier-orders');
    }

    const goToReceptionPage = () => {
        props.history.push('/supplier-orders');
    }

    const goToUserOrderPage = () => {
        props.history.push('/new-order');
    }

    const goToUserOrdersPage = () => {
        props.history.push('/users-orders');
    }

    const goToNewClientPage = () => {
        props.history.push('/new-customer');
    }

    const goToClientsPage = () => {
        props.history.push('/customers');
    }


    const {classes} = props;
    const supplierLinks = {
        "information": goToSuppliersPage,
        "newOrder": goToSupplierOrderPage,
        "orders": goToSupplierOrdersPage,
        "reception": goToReceptionPage
    };
    const clientLinks = {
        "newCustomer": goToNewClientPage,
        "information": goToClientsPage,
        "newOrder": goToUserOrderPage,
        "orders": goToUserOrdersPage
    }

    return (
        <div>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Hidden only={['sm', 'xs']}>
                            <Typography variant="h6" noWrap className={classes.mainTitle} onClick={goHomePage}>
                                Florida Productos veterinarios
                            </Typography>
                        </Hidden>

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.menuBarItem}
                            onClick={goHomePage}>
                            <Home/>
                        </IconButton>

                        <SupplierMenu links={supplierLinks}/>
                        <ClientMenu links={clientLinks}/>
                        <SupplierMenu2 />

                        <AccountBar isLogged={isLogged} />

                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
}

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const StyledButton = withStyles((theme) => ({
    root: {
        textTransform: 'none',
    },
}))(Button);

function SupplierMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };


    return (
        <div>
            <StyledButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleClick}
            >
                Proveedores
            </StyledButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <Store fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Informacion" onClick={props.links.information}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShoppingBasket fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Nueva orden" onClick={props.links.newOrder}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <LocalShipping fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Pedidos" onClick={props.links.orders}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <SaveAltOutlined fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Recepcion" onClick={props.links.reception}/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}

function ClientMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    return (
        <div>
            <StyledButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleClick}
            >
                Clientes
            </StyledButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Nuevo cliente" onClick={props.links.newCustomer}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <People fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Informacion" onClick={props.links.information}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShoppingCart fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Nuevo pedido" onClick={props.links.newOrder}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShopTwo fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Pedidos" onClick={props.links.orders}/>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
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
