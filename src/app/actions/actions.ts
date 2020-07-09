import {
    ERROR,
    LOADING,
    SUBMITTING,
    //
    FETCH_ORDERS,
    //
    CREATE_ORDER
} from './types';

import {Dispatch} from 'redux';
import SupplierService from '../services/backoffice/supplier-service'


export const fetchOrders = async (dispatch: Dispatch) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = (await SupplierService.fetchOrders()).order_list;

        return dispatch({
            type: FETCH_ORDERS,
            payload: response,
        });
    } catch (e) {
        return dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const createOrder = async (dispatch: Dispatch, data: IOrderPostData) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await SupplierService.createOrder(data);

        dispatch({
            type: CREATE_ORDER,
        });

        fetchOrders(dispatch);
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};