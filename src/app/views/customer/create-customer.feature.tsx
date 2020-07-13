import { connect } from 'react-redux';
import CreateCustomer from './create-customer';
import { Dispatch } from 'redux';
import {createCustomer, refreshWithDelay} from '../../actions/actions';

const mapStateToProps = (state: any, ownProps: any) => {
    const classes = ownProps.classes;
    return { submitting: state.submitting, error: state.error, success: state.success, classes: classes };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        createCustomer: (data: ICustomer) => {
            createCustomer(dispatch, data);
        },
        refreshWithDelay: () => {
        refreshWithDelay(dispatch);
    }
    };
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(CreateCustomer);