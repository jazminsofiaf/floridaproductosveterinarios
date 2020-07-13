import {
    ERROR,
    LOADING,
    SUBMITTING,
    STOP_LOADING,
    //
    FETCH_SUPPLIER_ORDERS,
    FETCH_SUPPLIER_PRODUCTS,
    FETCH_CUSTOMER_PRODUCTS,
    FETCH_SUPPLIERS,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMERS_ORDERS,
    //
    CREATE_CUSTOMER,
    CREATE_RECEPTION,
    CREATE_SUPPLIER_ORDER,
    CREATE_CUSTOMER_ORDER,
    //
    FETCH_ORDER_BY_ID,
    //
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART, ADD_CUSTOMER_PAYMENT
} from './types';

import {Dispatch} from 'redux';
import SupplierService from '../services/backoffice/supplier-service'
import ReceptionService from '../services/backoffice/reception-service'
import CustomerService from "../services/backoffice/customer-service"


export const stopLoading = (dispatch: Dispatch) => {
    dispatch({
        type: STOP_LOADING
    });
}

export const fetchCustomers = async (dispatch: Dispatch) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await CustomerService.fetchCustomers();

        dispatch({
            type: FETCH_CUSTOMERS,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const fetchCustomersOrders = async (dispatch: Dispatch) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await CustomerService.fetchOrders();

        dispatch({
            type: FETCH_CUSTOMERS_ORDERS,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const createCustomer = async (dispatch: Dispatch, data: ICustomer) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await CustomerService.createCustomer(data);

        setTimeout(() => {
            dispatch({
                type: CREATE_CUSTOMER,
            });
        }, 200);
        alert("Felicidades, creacion exitosa!");

    } catch (e) {
        setTimeout(() => {
            dispatch({
                type: ERROR,
                payload: {message: e.message},
            });
        }, 200);
        alert("Error, perfil invalido.\nSi el error persiste contactenos.");
    }
};

export const addCustomerPayment = async (dispatch: Dispatch, data: IPaymentPostData) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await CustomerService.addPayment(data);

        dispatch({
            type: ADD_CUSTOMER_PAYMENT,
        });
        alert("Felicidades, Pago exitoso!");

    } catch (e) {
        dispatch({
            type: ERROR,
            payload: {message: e.message},
        });
        alert("Error, el pago fallo");
    }
};

export const fetchCustomerProducts = async (dispatch: Dispatch, id: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await CustomerService.fetchProducts(id);

        return dispatch({
            type: FETCH_CUSTOMER_PRODUCTS,
            payload: response,
        });
    } catch (e) {
        return dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const fetchSuppliers = async (dispatch: Dispatch) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await SupplierService.fetchSuppliers();

        return dispatch({
            type: FETCH_SUPPLIERS,
            payload: response,
        });
    } catch (e) {
        return dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const fetchSupplierProducts = async (dispatch: Dispatch, id: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await SupplierService.fetchSupplierProducts(id);

        return dispatch({
            type: FETCH_SUPPLIER_PRODUCTS,
            payload: response,
        });
    } catch (e) {
        return dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const fetchSupplierOrders = async (dispatch: Dispatch) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await SupplierService.fetchOrders();

        return dispatch({
            type: FETCH_SUPPLIER_ORDERS,
            payload: response,
        });
    } catch (e) {
        return dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const createCustomerOrder = async (dispatch: Dispatch, data: IOrderPostData) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await CustomerService.createOrder(data);

        setTimeout(() => {
            dispatch({
                type: CREATE_CUSTOMER_ORDER,
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

export const createSupplierOrder = async (dispatch: Dispatch, data: IOrderPostData) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await SupplierService.createOrder(data);

        setTimeout(() => {
            dispatch({
                type: CREATE_SUPPLIER_ORDER,
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

export const addToCart = (dispatch: Dispatch, newItem: ICartItem, cartItems: ICartItem[]) => {
    let updatedCartItems: ICartItem[] = [];

    if (!cartItems) {
        updatedCartItems.push(newItem);
    } else {
        let added = false;
        cartItems.forEach((item: ICartItem) => {
            if (item.id === newItem.id) {
                item.amount = item.amount + newItem.amount;
                added = true;
            }
            updatedCartItems.push(item)
        });
        if (!added) {
            updatedCartItems.push(newItem);
        }
    }
    dispatch({
        type: ADD_TO_CART,
        payload: updatedCartItems
    });
};

export const removeFromCart = (dispatch: Dispatch, removeId: string, cartItems: ICartItem[]) => {
    let updatedCartItems: ICartItem[] = cartItems.filter((item: ICartItem) => item.id !== removeId);

    dispatch({
        type: REMOVE_FROM_CART,
        payload: updatedCartItems
    });
};

export const emptyCart = (dispatch: Dispatch) => {
    dispatch({
        type: EMPTY_CART,
    });
};