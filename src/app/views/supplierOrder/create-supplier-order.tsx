import React, {useState, useEffect} from 'react';
import CartDrawer from '../cart/cart-drawer';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UpperBar from "../upperBar/UpperBar";
import Grid from '@material-ui/core/Grid'
import SupplierProductFilter from './SupplierProductFilter'
import Loader from "../shared/Loader";


function supplierSelection(props: any) {
    return (
        <Autocomplete
            id="users-box"
            options={props.suppliers ? props.suppliers : []}
            getOptionLabel={(option: ISupplier) => option.name_summary}
            disabled={props.cartHasItems}
            onChange={(event, newValue) => {
                props.setSupplier(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar proveedor" variant="outlined"/>}
        />
    )
}

const CreateSupplierOrder = ({createSupplierOrder, supplierProducts, fetchSupplierProducts, suppliers, fetchSuppliers, cartItems, addToCart, removeFromCart, emptyCart, submitting, success, error, refreshWithDelay}: ICreateOrder) => {
    useEffect(() => {
        console.log(suppliers);
        if (!suppliers) {
            fetchSuppliers();
        }
    }, [fetchSuppliers, suppliers])

    const [supplier, setSupplier] = useState<ISupplier>();

    useEffect(() => {
        emptyCart();
    }, [emptyCart])

    useEffect(() => {
        if (supplier && supplier.id) {
            const supplierId = supplier.id;
            fetchSupplierProducts(supplierId);
        }
    }, [fetchSupplierProducts, supplier]);

    function removeItem(id: string) {
        removeFromCart(id, cartItems);
    };

    function addItemToCart(props: any) {
        let item: ICartItem = {
            id: props.item.id,
            name: props.item.name,
            amount: props.amount,
            price: props.item.price
        };
        addToCart(item, cartItems);
    }

    let cartHasItems = cartItems && cartItems.length > 0;

    function createOrder() {
        if (cartHasItems)
            uploadOrder({supplier, cartItems})
    }

    async function uploadOrder(props: any) {
        props.cartItems.forEach((item: IOrderProduct) => item.name = '');
        await createSupplierOrder({
            owner_id: props.supplier.id,
            products: props.cartItems
        });
    }

    React.useEffect(() => {
        if (error || success) {
            refreshWithDelay();
            emptyCart();
        }
    }, [error, success, refreshWithDelay,emptyCart]);

    return (
        <>
            <UpperBar/>
            <Container maxWidth="lg" style={{marginTop: "6em"}}>
                <Typography variant="h3">Orden a proveedor</Typography>
                <Grid container spacing={1}>
                    <Grid item container
                          style={{backgroundColor: "#FDF0D5", borderRadius: '20px 20px 20px 20px', padding: '10px'}}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Paper aria-disabled={cartHasItems}>
                                {supplierSelection({setSupplier, suppliers, cartHasItems})}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {supplier ? <SupplierProductFilter items={supplierProducts} onClick={addItemToCart}/> : null}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {supplier ? <CartDrawer cartItems={cartItems} createSupplierOrder={createOrder}
                                                removeFromCart={removeItem}/> : null}
                    </Grid>
                </Grid>
            </Container>
            <Loader isLoading={submitting} isSuccess={success} error={error} />

        </>
    )
}

interface ICreateOrder extends IComponent {
    supplierProducts?: ISupplierProduct[];
    suppliers: ISupplier[];
    fetchSuppliers: () => {};
    emptyCart: () => {};
    fetchSupplierProducts: (id: string) => {};
    createSupplierOrder: (iOrderPostData: IOrderPostData) => void;
    cartItems: ICartItem[];
    addToCart: (newItem: ICartItem, cartItems: ICartItem[]) => void;
    removeFromCart: (id: string, cartItems: ICartItem[]) => void;
}

export default CreateSupplierOrder;