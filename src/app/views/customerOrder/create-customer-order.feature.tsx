import { connect } from 'react-redux';
import CreateCustomerOrder from './create-customer-order';
import { Dispatch } from 'redux';
import {
    addToCart,
    createCustomerOrder,
    emptyCart,
    fetchCustomerOrderById,
    fetchCustomerProducts,
    fetchCustomers,
    refreshWithDelay,
    removeFromCart, updateCustomerOrder
} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { submitting: state.submitting, error: state.error, success: state.success, customers: state.customers, customerProducts: state.customerProducts, cartItems: state.cartItems, customerOrder: state.customerOrder };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createCustomerOrder: (data: IOrderPostData) => {
            createCustomerOrder(dispatch, data);
        },
        fetchCustomerProducts: (id: string) => {
            fetchCustomerProducts(dispatch, id);
        },
        fetchCustomers: () => {
            fetchCustomers(dispatch);
        },
        addToCart: (newItem: ICartItem, cartItems: ICartItem[]) => {
            addToCart(dispatch, newItem, cartItems);
        },
        removeFromCart: (id: string, cartItems: ICartItem[]) => {
            removeFromCart(dispatch, id, cartItems);
        },
        emptyCart: () => {
            emptyCart(dispatch);
        },
        refreshWithDelay: () => {
            refreshWithDelay(dispatch);
        },
        fetchCustomerOrderById: (id: string) => {
            fetchCustomerOrderById(dispatch, id);
        },
        updateCustomerOrder: (updatedOrder: IOrderUpdatePostData) => {
            updateCustomerOrder(dispatch, updatedOrder);
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CreateCustomerOrder);