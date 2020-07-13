import { connect } from 'react-redux';
import CreateCustomerOrder from './create-customer-order';
import { Dispatch } from 'redux';
import {
    addToCart, createCustomerOrder, emptyCart, fetchCustomerProducts, fetchCustomers,
    removeFromCart
} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { error: state.error, success: state.success, customers: state.customers, customerProducts: state.customerProducts, cartItems: state.cartItems };
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
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CreateCustomerOrder);