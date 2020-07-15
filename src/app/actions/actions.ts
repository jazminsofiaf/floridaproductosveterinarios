import {
    ERROR,
    LOADING,
    SUBMITTING,
    REFRESH,
    //
    FETCH_SUPPLIER_ORDERS,
    FETCH_SUPPLIER_PRODUCTS,
    FETCH_CUSTOMER_PRODUCTS,
    FETCH_SUPPLIERS,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMERS_ORDERS,
    FETCH_CUSTOMER_ORDER_BY_ID,
    //
    UPDATE_CUSTOMER_ORDER,
    UPDATE_SUPPLIER_ORDER,
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
    EMPTY_CART,
    ADD_CUSTOMER_PAYMENT,
    FETCH_ASSEMBLE_INSTRUCTIONS,
    DELIVER_CUSTOMER_ORDER,
    MARK_ORDER_ASSEMBLED
} from './types';

import {Dispatch} from 'redux';
import SupplierService from '../services/backoffice/supplier-service'
import ReceptionService from '../services/backoffice/reception-service'
import CustomerService from "../services/backoffice/customer-service"
import OrderService from "../services/backoffice/order-service"


export const refreshWithDelay = (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch({
            type: REFRESH
        });
    }, 1500);
}

export const fetchAssembleInstructions = async (dispatch: Dispatch, orderId: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await OrderService.fetchAssembleInstructions(orderId);

        dispatch({
            type: FETCH_ASSEMBLE_INSTRUCTIONS,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const deliverCustomerOrder = async (dispatch: Dispatch, orderId: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await OrderService.deliverOrder(orderId);

        dispatch({
            type: DELIVER_CUSTOMER_ORDER,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

export const markOrderAssembled = async (dispatch: Dispatch, orderId: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await OrderService.markAssembled(orderId);

        dispatch({
            type: MARK_ORDER_ASSEMBLED,
            payload: response,
        });
    } catch (e) {
        dispatch({
            type: ERROR,
            payload: e.response.data,
        });
    }
};

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

export const updateSupplierOrder = async (dispatch: Dispatch, data: IOrderUpdatePostData) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await SupplierService.updateOrder(data);

        setTimeout(() => {
            dispatch({
                type: UPDATE_SUPPLIER_ORDER,
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

export const updateCustomerOrder = async (dispatch: Dispatch, data: IOrderUpdatePostData, filter: string) => {
    dispatch({
        type: SUBMITTING,
    });

    try {
        await OrderService.updateOrder(data, filter);

        setTimeout(() => {
            dispatch({
                type: UPDATE_CUSTOMER_ORDER,
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
    } catch (e) {
        setTimeout(() => {
            dispatch({
                type: ERROR,
                payload: {message: e.message},
            });
        }, 200);
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

export const fetchCustomerOrderById = async (dispatch: Dispatch, id: string) => {
    dispatch({
        type: LOADING,
    });

    try {
        const response = await OrderService.fetchOrderById(id);

        dispatch({
            type: FETCH_CUSTOMER_ORDER_BY_ID,
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
        if (newItem.amount > 0) {
            let added = false;
            cartItems.forEach((item: ICartItem) => {
                if (item.id === newItem.id) {
                    item.amount = parseInt(String(item.amount)) + parseInt(String(newItem.amount));
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
    }
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