import { connect } from 'react-redux';
import SupplierOrderList from './supplier-order-list';
import { Dispatch } from 'redux';
import {createReception, fetchOrders} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { error: state.error, success: state.success, orders: state.orders };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchOrders: () => {
            fetchOrders(dispatch);
        },
        createReception: (data: IReceptionOrderPostData) => {
            createReception(dispatch, data);
        },
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SupplierOrderList);