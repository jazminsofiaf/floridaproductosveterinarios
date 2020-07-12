import { connect } from 'react-redux';
import CreateSupplierOrder from './create-supplier-order';
import { Dispatch } from 'redux';
import {
    addToCart,
    createSupplierOrder, emptyCart,
    fetchSupplierProducts,
    fetchSuppliers,
    removeFromCart
} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { error: state.error, success: state.success, suppliers: state.suppliers, supplierProducts: state.supplierProducts, cartItems: state.cartItems };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createSupplierOrder: (data: IOrderPostData) => {
            createSupplierOrder(dispatch, data);
        },
        fetchSupplierProducts: (id: string) => {
            fetchSupplierProducts(dispatch, id);
        },
        fetchSuppliers: () => {
            fetchSuppliers(dispatch);
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

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CreateSupplierOrder);