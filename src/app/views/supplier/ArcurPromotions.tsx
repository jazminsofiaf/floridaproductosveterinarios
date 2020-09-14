import {Grid, Typography} from "@material-ui/core";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            background: 'linear-gradient(to right, #2196F3 0%, #2196F3 15%, rgba(0,0,0,0) 100%)',
            borderRadius: '3px'
        },
        grid: {
            margin: '2px'
        },
    }),
);

export default function ArcurPromotions(props: any) {
    const {promotions} = props;
    const classes = useStyles();

    if (!promotions) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Grid item container spacing={2} className={classes.grid}>
                <Grid item xs={2}>
                    <Typography variant={"body1"}>#</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={"body1"}>Desc.</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant={"body1"}>Precio</Typography>
                </Grid>
            {promotions.map((item: any) => (
                <Grid item container xs={12} key={item.amount}>
                    <Grid item xs={2}>
                        <Typography variant={"body2"}>{item.amount}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant={"body2"}>{item.discount}%</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant={"body2"}>${item.price}</Typography>
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </div>
    );
}