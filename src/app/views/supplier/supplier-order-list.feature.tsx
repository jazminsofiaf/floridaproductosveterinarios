import { connect } from 'react-redux';
import SupplierOrderList from './supplier-order-list';
import { Dispatch } from 'redux';
import {createReception, fetchSupplierOrders, refreshWithDelay} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { submitting: state.submitting, error: state.error, success: state.success, orders: state.orders };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchOrders: () => {
            fetchSupplierOrders(dispatch);
        },
        refreshWithDelay: () => {
            refreshWithDelay(dispatch);
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SupplierOrderList);