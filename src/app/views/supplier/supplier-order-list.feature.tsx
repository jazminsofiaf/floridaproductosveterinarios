import { connect } from 'react-redux';
import SupplierOrderList from './supplier-order-list';
import { Dispatch } from 'redux';
import {createReception, fetchSupplierOrders} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return { error: state.error, success: state.success, orders: state.orders };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchOrders: () => {
            fetchSupplierOrders(dispatch);
        },
        createReception: (data: IReceptionOrderPostData) => {
            createReception(dispatch, data);
        },
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(SupplierOrderList);