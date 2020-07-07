import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {LocalShipping, SaveAltOutlined, ShoppingBasket, Store} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";

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

const StyledButton = withStyles((theme) => ({
    root: {
        textTransform: 'none',
    },
}))(Button);

function BarMenu(props) {
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
                {props.name}
            </StyledButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {props.render}
            </StyledMenu>
        </div>
    );
}

export default BarMenu