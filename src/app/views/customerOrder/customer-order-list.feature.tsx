import {connect} from 'react-redux';
import CustomerOrderList from './customer-order-list';
import {Dispatch} from 'redux';
import {
    deliverCustomerOrder,
    fetchAssembleInstructions,
    fetchCustomersOrders,
    markOrderAssembled
} from '../../actions/actions';

const mapStateToProps = (state: any) => {
    return {error: state.error, success: state.success, customersOrders: state.customersOrders, assembleInstructions: state.assembleInstructions};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCustomersOrders: () => {
            fetchCustomersOrders(dispatch);
        },
        fetchAssembleInstructions: (id:string) => {
            fetchAssembleInstructions(dispatch, id);
        },
        deliverOrder: (id: string) => {
            deliverCustomerOrder(dispatch, id);
        },
        markAssembled: (id: string) => {
            markOrderAssembled(dispatch, id);
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CustomerOrderList);