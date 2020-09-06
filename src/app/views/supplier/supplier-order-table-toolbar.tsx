import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.primary.main,
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.primary.dark,
                },
        title: {
            flex: '2 2 99%',
        },
    }),
);

interface EnhancedTableToolbarProps {
    supplierName: string;
    orderNumber: number;
    orderStatus: string;
    emissionDate: string;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const classes = useToolbarStyles();
    const { supplierName, orderNumber, orderStatus, emissionDate } = props;

    return (
        <Toolbar className={clsx(classes.root, classes.highlight)}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.title} variant="h5" id="tableTitle" component="div" color="inherit">
                        Pedido {supplierName}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.title} variant='h6' component="div" color="inherit">
                        {emissionDate}
                    </Typography>
                </Grid>
                <Grid item container justify="center" alignItems="center" xs={12}>
                    <Grid item xs={6}>
                        <Typography className={classes.title} component="div" color="inherit">
                            #Orden: {orderNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.title} component="div" color="inherit">
                            Estado: {orderStatus}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export const TableFooterToolbar = (props: any) => {
    const classes = useToolbarStyles();
    const { total } = props;

    return (
        <Toolbar className={clsx(classes.root, classes.highlight)}>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={5}>
                    <Typography className={classes.title} variant="h5" id="tableTitle" component="div" color="inherit">
                        Total: $ {total}
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>
    );
};