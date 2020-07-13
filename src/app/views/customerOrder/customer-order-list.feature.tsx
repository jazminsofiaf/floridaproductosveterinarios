import {connect} from 'react-redux';
import CustomerOrderList from './customer-order-list';
import {Dispatch} from 'redux';
import {fetchCustomersOrders} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return {error: state.error, success: state.success, customersOrders: state.customersOrders};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCustomersOrders: () => {
            fetchCustomersOrders(dispatch);
        },
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CustomerOrderList);