import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {useHistory} from "react-router-dom";
import {ArrowBack} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

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
            color: theme.palette.primary.main,
            flex: '2 2 99%',
        },
        redBalance: {
            color: 'red',
        },
        greenBalance: {
            color: 'green',
        },
        blueBalance: {
            color: 'blue',
        }
    }),
);

export const AccountTableToolbar = (props: any) => {
    const classes = useToolbarStyles();
    const {title} = props;
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <Toolbar className={clsx(classes.root, classes.highlight)}>
            <IconButton
                onClick={goBack}>
                <ArrowBack/>
            </IconButton>
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
                {title}
            </Typography>
        </Toolbar>
    );
};

export const AccountFooterToolbar = (props: any) => {
    const classes = useToolbarStyles();
    const {total} = props;

    return (
        <Toolbar className={clsx(classes.root, classes.highlight)}>
            <Grid container spacing={1} justify="center" alignItems="center">
                <Grid item xs={5}>
                    <Typography variant={'h5'}>
                        Saldo: <span className={total === 0 ? classes.blueBalance : total < 0 ? classes.redBalance : classes.greenBalance}>${total}</span>
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>
    );
};