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
            color: '#2196F3',
            flex: '2 2 99%',
        },
    }),
);

export const IcarusTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={clsx(classes.root, classes.highlight)}>
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                Carrito
            </Typography>
        </Toolbar>
    );
};

export const IcarusFooterToolbar = (props: any) => {
    const classes = useToolbarStyles();
    const {total} = props;

    return (
        <Toolbar className={clsx(classes.root, classes.highlight)}>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={5}>
                    <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                        Total: $ {total}
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>
    );
};