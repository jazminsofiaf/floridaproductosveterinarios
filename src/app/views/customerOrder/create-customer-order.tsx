import React, {useState, useEffect} from 'react';
import CartDrawer from '../cart/cart-drawer';
import ProductFilter from '../shared/product/ProductFilter';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UpperBar from "../upperBar/UpperBar";
import Paper from '@material-ui/core/Paper';
import Loader from '../shared/Loader'
import {useDispatch} from "react-redux";
import {refreshAndRedirect} from "../../actions/actions";

function getUserSelectionBox(props: any) {
    return (
        <Autocomplete
            noOptionsText={"No hay clientses disponibles"}
            id="users-box"
            options={props.customers ? props.customers : []}
            getOptionLabel={(option: ICustomerSummary) => option.name_summary + " - " + option.contact_summary}
            disabled={props.cartHasItems}
            onChange={(event, newValue) => {
                props.setSelected(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar cliente" variant="outlined"/>}
        />
    )
}


const CreateCustomerOrder = ({
                                 refreshWithDelay,
                                 createCustomerOrder,
                                 fetchCustomers,
                                 customers,
                                 fetchCustomerProducts,
                                 customerProducts,
                                 cartItems,
                                 addToCart,
                                 removeFromCart,
                                 emptyCart,
                                 success,
                                 error,
                                 submitting,
                                 fetchCustomerOrderById,
                                 customerOrder,
                                 location,
                                 history,
                                 updateCustomerOrder
                             }: ICustomerCreateOrder) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!customers) {
            fetchCustomers();
        }
    }, [fetchCustomers, customers])

    useEffect(() => {
        emptyCart();
    }, [emptyCart])

    const [selected, setSelected] = useState<ICustomerSummary>()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        if (selected && selected.id) {
            const userId = selected.id;
            fetchCustomerProducts(userId);
        }
    }, [selected, fetchCustomerProducts]);

    useEffect(() => {
        if (location) {
            const urlParams = new URLSearchParams(location.search);
            const id = urlParams.get('id');
            const edit = urlParams.get('edit');
            if (edit === 'true' && id) {
                fetchCustomerOrderById(id);
                setEditMode(true);
            }
        }
    }, [fetchCustomerOrderById, location]);

    useEffect(() => {
        if (editMode) {
            const customer: ICustomerSummary | undefined = customers && customerOrder ? customers.filter(customer => customer.id === customerOrder.owner_id).pop() : undefined;
            if (customer) {
                setSelected(customer);
            }
        }
    }, [customerOrder, customers, editMode, setSelected]);

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
        if (cartHasItems) {
            uploadOrder({selected, cartItems});
        }
    }

    async function uploadOrder(props: any) {
        props.cartItems.forEach((item: IOrderProduct) => item.name = '');
        if (editMode) {
            await updateCustomerOrder({
                order_id: customerOrder.id,
                products: props.cartItems,
                owner_id: props.selected.id
            }, '');
        } else {
            await createCustomerOrder({
                owner_id: props.selected.id,
                products: props.cartItems
            });
        }
        setEditMode(false);
        emptyCart();
    }

    React.useEffect(() => {
        function redirect() {
            history?.push("/users-orders");
        }
        if (error || success) {
            dispatch(refreshAndRedirect(redirect));
            setSelected(undefined);
            emptyCart();
        }
    }, [error, success, emptyCart, dispatch, history]);

    return (
        <>
            <UpperBar/>
            <Container maxWidth="lg" style={{marginTop: "6em"}}>
                {editMode ? <Typography variant="h3">Editar pedido de cliente:</Typography> :
                    <Typography variant="h3">Nuevo pedido de cliente</Typography>
                }

                <Grid container spacing={1}>

                    <Grid item container
                          style={{backgroundColor: "#FDF0D5", borderRadius: '20px 20px 20px 20px', padding: '10px'}}>
                        <Grid item xs={12} sm={2}></Grid>
                        <Grid item xs={12} sm={8}>
                            {editMode ? <Typography variant="h5">{selected?.name_summary}</Typography> :
                                <Paper>
                                    {getUserSelectionBox({setSelected, cartHasItems, customers, selected})}
                                </Paper>
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {selected ? <ProductFilter products={customerProducts} onClick={addItemToCart}/> : null}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {selected ? <CartDrawer cartItems={cartItems} submitOrder={createOrder}
                                                removeFromCart={removeItem}/> : null}
                    </Grid>
                </Grid>
                <Loader isLoading={submitting} isSuccess={success} error={error}/>
            </Container>
        </>
    )
}

interface ICustomerCreateOrder extends IComponent {
    customers: ICustomerSummary[];
    customerProducts: any;
    cartItems: ICartItem[];
    addToCart: (newItem: ICartItem, cartItems: ICartItem[]) => void;
    removeFromCart: (id: string, cartItems: ICartItem[]) => void;
    emptyCart: () => void;
    fetchCustomers: () => {};
    fetchCustomerProducts: (userId: string) => {};
    createCustomerOrder: (iOrderPostData: IOrderPostData) => void;
    //EditMode
    fetchCustomerOrderById: (orderId: string) => {};
    customerOrder: IOrder;
    updateCustomerOrder: (iOrderUpdatePostData: IOrderUpdatePostData, filter: string) => void;
}


export default CreateCustomerOrder;