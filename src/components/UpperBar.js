import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import LocalShipping from '@material-ui/icons/LocalShipping';
import People from '@material-ui/icons/People';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Store from '@material-ui/icons/Store';
import ShopTwo from '@material-ui/icons/ShopTwo';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SaveAltOutlined from '@material-ui/icons/SaveAltOutlined';


var authToken = require('../providers/authToken');

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


    handleChange = (event) => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });

    };

    handleCloseMenu = () => {
        //deja de mostrar el menu
        this.setState({ anchorEl: null });
    };

    handleMyAccount = () => {
        this.handleCloseMenu();
    }

    handleLogOut = () => {
        authToken.removeToken();

        this.handleCloseMenu();
        this.props.history.push('/login');
    }

    handleClients = () => {
        this.handleCloseMenu();
        this.props.history.push('/backoffice/clients');
    }

    handleProviders = () => {
        this.handleCloseMenu();
        this.props.history.push('/backoffice/providers');
    }

    handleProducts = () => {
        this.handleCloseMenu();
        this.props.history.push('/backoffice/products');
    }
    handleClientOrder = () => {
        this.handleCloseMenu();
        this.props.history.push('/backoffice/client-order');
    }

    goHomePage = () => {
        this.props.history.push('/home');
    }

    goProductsPage = () => {
        this.props.history.push('/products');
    }

    goToUserOrderPage = () => {
        this.props.history.push('/new-order');
    }

    goToUserOrdersPage = () => {
        this.props.history.push('/users-orders');
    }

    //TODO
    goToNewClientPage = () => {
        this.props.history.push('/new-customer');
    }

    //TODO
    goToClientsPage = () => {
        this.props.history.push('/customers');
    }

    goToSupplierOrderPage = () => {
        this.props.history.push('/supplier-order');
    }

    //TODO
    goToSuppliersPage = () => {
        this.props.history.push('/supplier-orders');
    }

    goToSupplierOrdersPage = () => {
        this.props.history.push('/supplier-orders');
    }

    //TODO
    goToReceptionPage = () => {
        this.props.history.push('/supplier-orders');
    }

    goContactUsPage = () => {
        this.props.history.push('/contact-us');
    }

    goFAQ = () => {
        this.props.history.push('/faq');
    }

    render() {
        const { classes } = this.props;
        const open = Boolean(this.state.anchorEl);
        const isLogged = !(authToken.getToken() === null);
        const admin = isLogged && (authToken.getToken() === 'admin');
        const supplierLinks = { "information": this.goToSuppliersPage, "newOrder": this.goToSupplierOrderPage, "orders": this.goToSupplierOrdersPage, "reception": this.goToReceptionPage };
        const clientLinks = { "newCustomer": this.goToNewClientPage, "information": this.goToClientsPage, "newOrder": this.goToUserOrderPage, "orders": this.goToUserOrdersPage }

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
                            {/* <nav className={classes.menuBar}> */}
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                className={classes.menuBarItem}
                                onClick={this.goHomePage}>
                                <HomeIcon />
                            </IconButton>

                            {/* <Button variant="text" className={classes.menuBarItem}
                                onClick={this.goProductsPage}>Productos</Button> */}
                            <SupplierMenu links={supplierLinks} />
                            <ClientMenu links={clientLinks} />
                            {/* <Button variant="text" className={classes.menuBarItem}
                                onClick={this.goContactUsPage}>Contactenos</Button>
                            <Hidden only={['sm', 'xs']}>
                                <Button variant="text" className={classes.menuBarItem}
                                    onClick={this.goFAQ}>Preguntas frecuentes</Button>
                            </Hidden> */}
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit">
                                <AccountCircle />
                            </IconButton>
                            {/* </nav> */}
                            <div>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleCloseMenu}>
                                    {isLogged ?
                                        (<div>
                                            <MenuItem onClick={this.handleMyAccount}>Mi cuenta</MenuItem>
                                            <MenuItem onClick={this.handleLogOut}>Salir</MenuItem>
                                            {admin &&
                                            (<div>
                                                <Line />
                                                <MenuItem onClick={this.handleProducts}>Editar Productos</MenuItem>
                                                <MenuItem onClick={this.handleClients}>Clientes</MenuItem>
                                                <MenuItem onClick={this.handleProviders}>Proveedores</MenuItem>
                                                <MenuItem onClick={this.handleClientOrder}>Generar orden de compra</MenuItem>
                                            </div>)
                                            }
                                        </div>)
                                        : (<MenuItem onClick={this.handleLogOut}>Iniciar Sesion</MenuItem>)
                                    }
                                </Menu>
                            </div>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
            </div>
        );
    }
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
                        <Store fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Informacion" onClick={props.links.suppliers} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShoppingBasket fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Nueva orden" onClick={props.links.newOrder} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <LocalShipping fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Pedidos" onClick={props.links.orders} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <SaveAltOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Recepcion" onClick={props.links.reception} />
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
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Nuevo cliente" onClick={props.links.newCustomer} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <People fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Informacion" onClick={props.links.information} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShoppingCart fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Nuevo pedido" onClick={props.links.newOrder} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShopTwo fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Pedidos" onClick={props.links.orders} />
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
