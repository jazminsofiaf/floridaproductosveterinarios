import {
    ERROR,
    LOADING,
    SUBMITTING,
    STOP_LOADING,
    //
    FETCH_ORDERS,
    //
    CREATE_RECEPTION,
    //
    FETCH_ORDER_BY_ID
} from './types';

import {Dispatch} from 'redux';
import SupplierService from '../services/backoffice/supplier-service'
import ReceptionService from '../services/backoffice/reception-service'


export const stopLoading = (dispatch: Dispatch) => {
    dispatch({
        type: STOP_LOADING
    });
}

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

export const createReception = async (dispatch: Dispatch, data: IReceptionOrderPostData) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await ReceptionService.createReception(data);

        setTimeout(() => {
            dispatch({
                type: CREATE_RECEPTION,
            });
        }, 200);

    } catch (e) {
        setTimeout(() => {
            dispatch({
                type: ERROR,
                payload: {message: e.message},
            });
        }, 200);
    }
};

export const fetchOrderById = async (dispatch: Dispatch, id: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await SupplierService.fetchOrderById(id);

        dispatch({
            type: FETCH_ORDER_BY_ID,
            payload: response,
        });
    } catch (e) {
        return dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};