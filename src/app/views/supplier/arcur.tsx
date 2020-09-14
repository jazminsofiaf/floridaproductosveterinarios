import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {
    Button,
    Container,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@material-ui/core';
import MaterialTable from "material-table";
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {useDispatch, useSelector} from "react-redux";
import {fetchArcurProduct, fetchArcurProducts} from "../../actions/actions";
import Dialog from "@material-ui/core/Dialog";
import AleternativesSlider from "./alternatives";
import ArcurPromotions from "./ArcurPromotions";
import {Home} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles({
    button: {
        background: 'linear-gradient(45deg, #9fafbc 30%, #b9bec2 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
    },
    buttonBlue: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
});

let customStyle = {
    padding: '0.4em',
    color: "#2196F3",
    width: "21em",
    selected: "blue",
    border: "2px solid #21CBF3",
    borderRadius: '3px'
};

export default function ArcurList(props: any) {
    const classes = useStyles();
    const [cartOpen, setCartOpen] = useState(false);
    const tableRef = React.createRef<any>();
    const dispatch = useDispatch();
    const {arcurProducts, arcurProduct} = useSelector((state: any) => state);
    const [arcurItems, setArcurtItems] = useState<IArcurItem[]>([])

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchArcurProducts())
    }, [dispatch])

    useEffect(() => {
        setArcurtItems(arcurProducts)
    }, [arcurProducts])


    let columns: any = [
        {title: 'Nombre', field: 'description'},
        {title: 'Laboratorio', field: 'lab'},
        {title: 'Stock', field: 'current_stock', type: 'numeric'},
        {title: 'Precio', field: 'price_list', type: 'numeric', render: (data: any) => <div>$ {data.price_list}</div>},
        // {
        //     render: (data: any) => <Button onClick={() => details(data)}><ArrowForwardIosIcon/></Button>,
        // },
    ];

    function openCart(open: boolean) {
        setCartOpen(open);
    }


    function viewItem(rowData: any | undefined) {
        dispatch(fetchArcurProduct(rowData.id))
        setOpen(true);
    }

    const goHomePage = () => {
        props.history.push('/');
    }

    return (
        <Container maxWidth={"md"}>
            <IconButton
                onClick={goHomePage}>
                <Home/>
            </IconButton>
            <Typography variant={"h5"}>Icarus</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Button className={clsx(classes.button, {[classes.buttonBlue]: !cartOpen})} fullWidth
                            onClick={() => openCart(false)} variant={"contained"} size={'large'}>
                        Listado
                        <FormatListBulletedIcon/>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={clsx(classes.button, {[classes.buttonBlue]: cartOpen})} fullWidth
                            onClick={() => openCart(true)} variant={"contained"} size={'large'}>
                        Carrito
                        <ShoppingCartIcon/>
                        +1
                    </Button>
                </Grid>
            </Grid>
            {cartOpen ? <></> :
                <MaterialTable
                    tableRef={tableRef}
                    columns={columns}
                    data={arcurItems}
                    options={{
                        padding: 'dense',
                        showTitle: false,
                        searchFieldStyle: customStyle,
                        searchFieldAlignment: 'left',
                        pageSize: 20,
                        detailPanelType: 'single',
                        detailPanelColumnAlignment: 'right',
                        headerStyle: {
                            position: 'sticky',
                            top: 0,
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "white",
                            backgroundColor: '#21CBF3'
                        },
                    }}
                    onRowClick={(event, rowData) => viewItem(rowData)}
                />}
            <Dialog onClose={handleClose} open={open} maxWidth='xl'>
                <DialogTitle id="customized-dialog-title">
                    {arcurProduct ?
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                                <div>
                                    <Typography variant={"h5"}>{arcurProduct.description}</Typography>
                                    <Typography variant={"body2"}>{arcurProduct.lab}</Typography>
                                </div>
                        </Grid>
                        <Grid item xs={6}>${arcurProduct.price_list}</Grid>
                        <Grid item xs={6}>Stock: {arcurProduct.current_stock}</Grid>
                    </Grid> : null}
                </DialogTitle>
                <DialogContent dividers>
                    {arcurProduct && arcurProduct.promotions ?
                        <div>
                            <Typography variant={"h6"}>Promociones por cantidad:</Typography>
                            <ArcurPromotions promotions={arcurProduct.promotions}/>
                        </div>
                        : null}
                    {arcurProduct && arcurProduct.detail_description ?
                        <Grid container spacing={2}>
                            {/*<Grid item xs={3}>*/}
                            {/*    {arcurProduct && arcurProduct.image ?*/}
                            {/*        <img src={arcurProduct.image} className="product-img" alt={"ProductImage"}/> : null}*/}
                            {/*</Grid>*/}
                            <Typography variant={"h6"}>Descripcion:</Typography>
                            <Grid item xs={12}>
                                {arcurProduct.detail_description}
                            </Grid>
                        </Grid> : null}
                    {arcurProduct && arcurProduct.alternatives ?
                        <div>
                            <Typography variant={"h6"}>Alternativos:</Typography>
                            <AleternativesSlider alternatives={arcurProduct.alternatives}/>
                        </div>
                        : null}
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose} color="secondary">
                        cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )

}
