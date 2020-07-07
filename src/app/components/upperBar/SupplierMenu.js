import React from "react";
import {LocalShipping, SaveAltOutlined, ShoppingBasket, Store} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import BarMenu from "./BarMenu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";

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

function SupplierMenu(props) {
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

    function options2() {
        return (
            <div>
                <StyledMenuItem>
                    <ListItemIcon>
                        <Store fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Informacion" onClick={goToSuppliersPage}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <ShoppingBasket fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Nueva orden" onClick={goToSupplierOrderPage}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <LocalShipping fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Pedidos" onClick={goToSupplierOrdersPage}/>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <SaveAltOutlined fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText primary="Recepcion" onClick={goToReceptionPage}/>
                </StyledMenuItem>
            </div>
        )
    }

    return (
        <BarMenu name={"Proveedores"} render={options2}/>
    );
}

export default withRouter(SupplierMenu);
