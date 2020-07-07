import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {withRouter} from "react-router-dom";
import Fire from "../providers/Fire"


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

function AccountBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        props.history.push('/login');
    };

    const handleMyAccount = (event) => {
        setAnchorEl(event.currentTarget);
        props.history.push('/my-account');
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    async function handleLogOut(event) {
        handleClose();
        event.preventDefault();
        try {
            await
                Fire.auth()
                    .signOut()
                    .then(props.history.push('/home'))
        } catch (error) {
            alert(error);
        }
    }

    function authenticatedMenu() {
        return (
            <div>
                <MenuItem onClick={handleMyAccount}>Mi cuenta</MenuItem>
                <MenuItem onClick={handleLogOut}>Salir</MenuItem>
                {/*{props.isLogged &&*/}
                {/*(<div>*/}
                <Line/>
                {/*<MenuItem onClick={props.handleProducts}>Editar Productos</MenuItem>*/}
                {/*<MenuItem onClick={props.handleClients}>Clientes</MenuItem>*/}
                {/*<MenuItem onClick={props.handleProviders}>Proveedores</MenuItem>*/}
                {/*<MenuItem onClick={props.handleClientOrder}>Generar orden de compra</MenuItem>*/}
                {/*</div>)*/}
            </div>
        )
    }

    function unauthenticatedMenu() {
        return (
            <div><MenuItem onClick={handleClick}>Iniciar Sesion</MenuItem></div>
        )
    }

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle/>
            </IconButton>

            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {props.isLogged ? authenticatedMenu() : unauthenticatedMenu()}
            </Menu>
        </div>
    )
}

export default withRouter(AccountBar);
