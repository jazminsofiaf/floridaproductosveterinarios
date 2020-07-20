import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Button, Grid, Typography} from "@material-ui/core";
import {fetchDistributorProducts, refreshWithDelay2, updateLink} from "../../actions/actions"
import {useHistory} from "react-router";
import Loader from "../shared/Loader";

function productSelection(props: any) {
    return (
        <Autocomplete
            id="products-box"
            options={props.products ? props.products : []}
            getOptionLabel={(option: ISupplier) => option.name_summary}
            onChange={(event, newValue) => {
                props.setSelectedProduct(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar producto distribuidora"
                                                variant="outlined"/>}
        />
    )
}


const CreateProductLink = ({supplierProduct, handleClose}: any) => {
    const [selectedProduct, setSelectedProduct] = useState();
    const [ratio, setRatio] = useState(1);
    const products = useSelector((state: any) => state.distributorProducts);
    const {error, success, submitting} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchDistributorProducts())
    }, [dispatch]);

    function close() {
        handleClose();
    }

    function createLink(product: any) {
        if (product) {
            dispatch(updateLink({
                supplier_product_id: supplierProduct.id,
                product_id: product.id,
                ratio: ratio
            }))
        }
    }

    function createProduct() {
        history.push("/new-product")
    }

    if (error || success) {
        dispatch(refreshWithDelay2());
        close();
    }

    const validLink = selectedProduct && ratio > 0;

    return (
        <>
            <Grid container direction="column" justify="flex-start" spacing={2}>
                <Grid item><Typography variant={'h6'}>Linkear producto del proveedor al de la
                    distribuidora</Typography></Grid>
                <Grid item><Typography
                    color={"secondary"}>{supplierProduct ? supplierProduct.name : "No hay producto seleccionado"}</Typography></Grid>
                <Grid item>{productSelection({products, setSelectedProduct})}</Grid>
                <Grid container item>
                    <Grid item><TextField type="number" label={"Realcion de cantidad"} variant="outlined" value={ratio}
                                          onChange={(e) => setRatio(Number(e.target.value))}/></Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={4}><Button disabled={validLink} variant="contained" color={"secondary"} fullWidth
                                              onClick={() => createProduct()}>Crear
                        Producto</Button></Grid>
                    <Grid item xs={8} container justify="flex-end" alignItems="flex-end" spacing={2}>
                        <Grid item><Button variant="contained" color={"primary"}
                                           onClick={() => close()}>Cancelar</Button></Grid>
                        <Grid item><Button variant="contained" color={"primary"} disabled={!validLink}
                                           onClick={() => createLink(selectedProduct)}>Crear Link</Button></Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Loader isLoading={submitting} isSuccess={success} error={error} />
        </>
    )

}

export default CreateProductLink;