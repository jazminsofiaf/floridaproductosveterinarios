import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 30;
    const left = 40;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        //   width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: "10px",
    },
    modal:{
      borderRadius: "10px",
      border: '10px solid #000',
    }
}));

function SupplierOrderModel(props) {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const open = props.state;
    const handleClose = props.handleClose;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            className={useStyles.modal}
        >
            <div style={modalStyle} className={classes.paper}>
                {props.render}
            </div>
        </Modal>
    )
}

export default SupplierOrderModel;