import { connect } from 'react-redux';
import CustomerList from './customer-list';
import { Dispatch } from 'redux';
import {addCustomerPayment, fetchCustomers} from '../../actions/actions';

const mapStateToProps = (state: any, ownProps: any) => {
    const classes = ownProps.classes;
    return { error: state.error, success: state.success, customers: state.customers, classes: classes };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchCustomers: () => {
            fetchCustomers(dispatch);
        },
        addCustomerPayment: (data: IPaymentPostData) => {
            addCustomerPayment(dispatch, data);
        }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CustomerList);