import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
import {Typography} from "@material-ui/core";
import {fetchArcurProduct} from "../../actions/actions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        tile: {
            border: '1px solid #2196F3',
            margin: '2px',
        },
        title: {
            color: theme.palette.background.paper,
        },
        titleBar: {
            background:
                // 'linear-gradient(to top, #2196F3 30%, #21CBF3 90%)',
                'linear-gradient(to top, #2196F3 0%, #2196F3 30%, rgba(0,0,0,0) 100%)',
        },
    }),
);

export default function AleternativesSlider(props: any) {
    const {alternatives} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    function changeItem(item:any) {
        dispatch(fetchArcurProduct(item.id))
    }

    if (!alternatives) {
        return null;
    }

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={3.5}>
                {alternatives.map((item: any) => (
                    <GridListTile key={item.id} className={classes.tile}>
                        {/*<img src={item.image} alt={item.description} />*/}
                        <div>
                            <Typography variant={"body1"}>{item.description}</Typography>
                            <Typography variant={"body2"}>{item.lab}</Typography>
                            <Typography variant={"body2"}>${item.price_list}</Typography>
                            <Typography variant={"body2"}>Stock: {item.current_stock}</Typography>
                        </div>
                        <GridListTileBar
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton onClick={() => changeItem(item)}>
                                    <ArrowForwardIcon className={classes.title} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}