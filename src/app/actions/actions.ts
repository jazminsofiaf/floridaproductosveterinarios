import {
    ERROR,
    LOADING,
    SUBMITTING,
    REFRESH,
    //
    USER_LOGIN,
    IS_LOGGED,
    //
    FETCH_SUPPLIER_ORDERS,
    FETCH_SUPPLIER_PRODUCTS,
    FETCH_CUSTOMER_PRODUCTS,
    FETCH_SUPPLIERS,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMERS_ORDERS,
    FETCH_CUSTOMER_ORDER_BY_ID,
    FETCH_DISTRIBUTOR_PRODUCTS,
    FETCH_PRODUCTS_INFO,
    //
    UPDATE_CUSTOMER_ORDER,
    UPDATE_SUPPLIER_ORDER,
    UPDATE_PRODUCT_LINK,
    //
    CREATE_CUSTOMER,
    CREATE_RECEPTION,
    CREATE_SUPPLIER_ORDER,
    CREATE_CUSTOMER_ORDER,
    CREATE_DISTRIBUTOR_PRODUCT,
    //
    FETCH_ORDER_BY_ID,
    FETCH_SUPPLIER_BY_ID,
    //
    SOLICIT_SUPPLIER_ORDER,
    //
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    ADD_CUSTOMER_PAYMENT,
    FETCH_ASSEMBLE_INSTRUCTIONS,
    DELIVER_CUSTOMER_ORDER,
    MARK_ORDER_ASSEMBLED,
    CANCEL_CUSTOMER_ORDER,
} from './types';

import {Dispatch} from 'redux';
import SupplierService from '../services/backoffice/supplier-service'
import ReceptionService from '../services/backoffice/reception-service'
import CustomerService from "../services/backoffice/customer-service"
import OrderService from "../services/backoffice/order-service"
import ProductService from "../services/backoffice/product-service"
import AuthenticationService from "../services/backoffice/authentication-service"
import {setAuthorizationToken} from "../utils/authorizationToken";

export const refreshWithDelay = (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch({
            type: REFRESH
        });
    }, 1500);
}

export function refreshWithDelay2() {
    return (dispatch: (arg0: { type: string }) => void) => {
        setTimeout(() => {
            dispatch({
                type: REFRESH
            });
        }, 1500);
    }
}

export function refreshAndRedirect(redirect: any) {
    return (dispatch: (arg0: { type: string }) => void) => {
        setTimeout(() => {
            dispatch({
                type: REFRESH
            });
            redirect()
        }, 1500);
    }
}

export function userLogin(credentials: ICredential) {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            const response = await AuthenticationService.login(credentials);

            console.log(JSON.stringify(response, null, 2))
            localStorage.setItem('token', response.user.token)
            setAuthorizationToken(response.user.token)

            dispatch({
                type: USER_LOGIN,
                payload: response.user,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e.response.data,
            });
        }
    }
};

// export const isLogged = async (dispatch: Dispatch) => {
//     try {
//         const response = await AuthenticationService.isLogged();
//
//         dispatch({
//             type: IS_LOGGED,
//             payload: response.Boolean,
//         });
//     } catch (e) {
//         dispatch({
//             type: ERROR,
//             payload: e.response.data,
//         });
//     }
// };

export function setLogged(value: boolean) {
    return {
        type: IS_LOGGED,
        payload: value,
    };
};

export function logOut() {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch ({
            type: IS_LOGGED,
            payload: false,
        });
    }
};

export function fetchDistributorProducts() {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            const response = await ProductService.fetchProducts();

            dispatch({
                type: FETCH_DISTRIBUTOR_PRODUCTS,
                payload: response,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e.response.data,
            });
        }
    }
};

export function createDistributorProduct(data: IDistributorProduct) {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch({
            type: SUBMITTING,
        });

        try {
            await ProductService.createProduct(data);

            dispatch({
                type: CREATE_DISTRIBUTOR_PRODUCT,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: {message: e.message},
            });
        }
    };
}

export function updateLink(data: IProductLink) {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch({
            type: SUBMITTING,
        });

        try {
            await SupplierService.updateLink(data);

            dispatch({
                type: UPDATE_PRODUCT_LINK,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: {message: e.message},
            });
        }
    };
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

export function cancelCustomerOrder(orderId: string) {
    return async (dispatch: (arg0: { type: string }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            await OrderService.cancelOrder(orderId);

            dispatch({
                type: CANCEL_CUSTOMER_ORDER,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
            });
        }
    };
}

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


export function markAssembledForced(orderId: string) {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            const response = await OrderService.markAssembledForced(orderId);

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
}

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

export function fetchProductsInfo() {
    return async (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            const response = await ProductService.fetchProductsInfo();

            return dispatch({
                type: FETCH_PRODUCTS_INFO,
                payload: response,
            });
        } catch (e) {
            return dispatch({
                type: ERROR,
                payload: e.response,
            });
        }
    };
}

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

export function createReception(data: IReceptionOrderPostData) {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        dispatch({
            type: SUBMITTING,
        });

        try {
            // data?.received_products?.forEach((item: any) => {
            //     item.original_price = undefined;
            //     item.expiration_date = format(item.expiration_date, "dd/MM/yyyy");
            // });

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
}

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
        if (newItem.amount > 0 && newItem.price && !Number.isNaN(newItem.price)) {
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
            dispatch({
                type: ADD_TO_CART,
                payload: updatedCartItems
            });
        }
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

export function solicitSupplierOrder(orderId: string) {
    return async (dispatch: (arg0: { type: string }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            await SupplierService.solicitSupplierOrder(orderId);

            dispatch({
                type: SOLICIT_SUPPLIER_ORDER,
            });
        } catch (e) {
            return dispatch({
                type: ERROR,
            });
        }
    }
}

export function fetchSupplierInfo(orderId: string) {
    return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
        dispatch({
            type: LOADING,
        });

        try {
            const response = await SupplierService.fetchSuppliersById(orderId);

            dispatch({
                type: FETCH_SUPPLIER_BY_ID,
                payload: response,
            });
        } catch (e) {
            dispatch({
                type: ERROR,
                payload: e.response.data,
            });
        }
    }
}