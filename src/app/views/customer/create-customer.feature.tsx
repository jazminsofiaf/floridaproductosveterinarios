import { connect } from 'react-redux';
import CreateCustomer from './create-customer';
import { Dispatch } from 'redux';
import { createCustomer } from '../../actions/actions';

const mapStateToProps = (state: any, ownProps: any) => {
    const classes = ownProps.classes;
    return { error: state.error, success: state.success, orders: state.orders, classes: classes };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createCustomer: (data: ICustomer) => {
            createCustomer(dispatch, data);
        },
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CreateCustomer);