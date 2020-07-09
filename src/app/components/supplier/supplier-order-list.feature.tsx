import { connect } from 'react-redux';
import SupplierOrderList from './supplier-order-list';
import { Dispatch } from 'redux';
import { fetchOrders } from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { loading: state.loading, submitting: state.submitting, orders: state.orders };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchOrders: () => {
            fetchOrders(dispatch);
        }
    };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(SupplierOrderList);