import {
    ERROR,
    LOADING,
    SUBMITTING,
    REFRESH,
    //
    USER_LOGIN,
    //
    FETCH_USERS,
    FETCH_SUPPLIER_ORDERS,
    FETCH_SERVICES,
    FETCH_CATEGORIES,
    FETCH_COUNTRIES,
    FETCH_SUPPLIER_PRODUCTS,
    FETCH_CUSTOMER_PRODUCTS,
    FETCH_SUPPLIERS,
    FETCH_CUSTOMERS,
    FETCH_CUSTOMERS_ORDERS,
    FETCH_CUSTOMER_ORDER_BY_ID,
    FETCH_DISTRIBUTOR_PRODUCTS,
    FETCH_PRODUCTS_INFO,
    //
    FETCH_ASSEMBLE_INSTRUCTIONS,
    MARK_ORDER_ASSEMBLED,
    DELIVER_CUSTOMER_ORDER,
    CANCEL_CUSTOMER_ORDER,
    //
    CREATE_USER,
    CREATE_CUSTOMER,
    CREATE_SUPPLIER_ORDER,
    CREATE_CUSTOMER_ORDER,
    CREATE_SERVICE,
    CREATE_CATEGORY,
    CREATE_COUNTRY,
    CREATE_DISTRIBUTOR_PRODUCT,
    //
    UPDATE_CUSTOMER_ORDER,
    UPDATE_SUPPLIER_ORDER,
    UPDATE_PRODUCT_LINK,
    //
    DELETE_USER,
    DELETE_ORDER,
    DELETE_SERVICE,
    DELETE_CATEGORY,
    DELETE_COUNTRY,
    //
    FETCH_USER_BY_ID,
    FETCH_ORDER_BY_ID,
    FETCH_SERVICE_BY_ID,
    FETCH_CATEGORY_BY_ID,
    FETCH_COUNTRY_BY_ID,
    FETCH_SUPPLIER_BY_ID,
    //
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    //
    EDIT_USER,
    EDIT_ORDER,
    EDIT_SERVICE,
    EDIT_CATEGORY,
    EDIT_COUNTRY,
    CREATE_RECEPTION,
    //
    SOLICIT_SUPPLIER_ORDER,
    //
    ADD_CUSTOMER_PAYMENT, IS_LOGGED
} from './types';

export default (state: [] = [], action: IAction) => {
    switch (action.type) {
        case ERROR:
            return {...state, error: action.payload.message, success: false, submitting: false, loading: false};
        case SUBMITTING:
            return {...state, error: false, success: false, submitting: true, loading: false};
        case LOADING:
            return {...state, error: false, success: false, submitting: false, loading: true};
        case REFRESH:
            return {...state, error: false, success: false, submitting: false, loading: false};

        case USER_LOGIN:
            return {...state, currentUser: action.payload.username, error: false, success: false, submitting: false, loading: false};
        case IS_LOGGED:
            return {...state, currentUser: action.payload, error: false, success: false, submitting: false, loading: false};

        case FETCH_USERS:
            return {...state, users: action.payload, error: false, submitting: false, loading: false};
        case FETCH_SUPPLIER_ORDERS:
            return {...state, orders: action.payload, error: false, submitting: false, loading: false};
        case FETCH_SERVICES:
            return {...state, services: action.payload, error: false, submitting: false, loading: false};
        case FETCH_CATEGORIES:
            return {...state, categories: action.payload, error: false, submitting: false, loading: false};
        case FETCH_COUNTRIES:
            return {...state, countries: action.payload, error: false, submitting: false, loading: false};
        case FETCH_SUPPLIER_PRODUCTS:
            return {...state, supplierProducts: action.payload, error: false, submitting: false, loading: false};
        case FETCH_CUSTOMER_PRODUCTS:
            return {...state, customerProducts: action.payload, error: false, submitting: false, loading: false};
        case FETCH_SUPPLIERS:
            return {...state, suppliers: action.payload, error: false, submitting: false, loading: false};
        case FETCH_CUSTOMERS:
            return {...state, customers: action.payload, error: false, submitting: false, loading: false};
        case FETCH_CUSTOMERS_ORDERS:
            return {...state, customersOrders: action.payload, error: false, submitting: false, loading: false};
        case FETCH_DISTRIBUTOR_PRODUCTS:
            return {...state, distributorProducts: action.payload, error: false, submitting: false, loading: false};
        case FETCH_PRODUCTS_INFO:
            return {...state, productsInfo: action.payload, error: false, submitting: false, loading: false};

        case FETCH_ASSEMBLE_INSTRUCTIONS:
            return {...state, assembleInstructions: action.payload, error: false, submitting: false, loading: false};
        case MARK_ORDER_ASSEMBLED:
            return {...state, error: false, submitting: false, loading: false};
        case DELIVER_CUSTOMER_ORDER:
            return {...state, customers:null, error: false, submitting: false, loading: false};
        case FETCH_CUSTOMER_ORDER_BY_ID:
            return {...state, customerOrder: action.payload, cartItems: action.payload.products, error: false, submitting: false, loading: false};
        case CANCEL_CUSTOMER_ORDER:
            return {...state, error: false, success: true, submitting: false, loading: false};

        case SOLICIT_SUPPLIER_ORDER:
            return {...state, customersOrders:null,  error: false, success: true, submitting: false, loading: false};


        case FETCH_USER_BY_ID:
            return {...state, user: action.payload, error: false, submitting: false, loading: false};
        case FETCH_ORDER_BY_ID:
            return {...state, order: action.payload, error: false, submitting: false, loading: false};
        case FETCH_SERVICE_BY_ID:
            return {...state, service: action.payload, error: false, submitting: false, loading: false};
        case FETCH_CATEGORY_BY_ID:
            return {...state, category: action.payload, error: false, submitting: false, loading: false};
        case FETCH_COUNTRY_BY_ID:
            return {...state, country: action.payload, error: false, submitting: false, loading: false};
        case FETCH_SUPPLIER_BY_ID:
            return {...state, supplierInfo: action.payload, error: false, submitting: false, loading: false};


        case CREATE_USER:
            return {...state, success: 'User created successfully.', error: false, submitting: false, loading: false};
        case CREATE_CUSTOMER:
            return {...state, customers: null, success: 'Customer created successfully.', error: false, submitting: false, loading: false};
        case CREATE_SUPPLIER_ORDER:
            return {...state, success: 'Supplier order created successfully.', error: false, submitting: false, loading: false};
        case CREATE_CUSTOMER_ORDER:
            return {...state, success: 'Customer order created successfully.', error: false, submitting: false, loading: false};
        case CREATE_SERVICE:
            return {
                ...state,
                success: 'Service created successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                success: 'Category created successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case CREATE_COUNTRY:
            return {
                ...state,
                success: 'Country created successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case CREATE_RECEPTION:
            return {
                ...state,
                success: 'ReceptionItems created successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case CREATE_DISTRIBUTOR_PRODUCT:
            return {...state, success: 'Distributor product created successfully.', error: false, submitting: false, loading: false};

        case DELETE_USER:
            return {...state, success: 'User deleted successfully.', error: false, submitting: false, loading: false};
        case DELETE_ORDER:
            return {...state, success: 'Order deleted successfully.', error: false, submitting: false, loading: false};
        case DELETE_SERVICE:
            return {
                ...state,
                success: 'Service deleted successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                success: 'Category deleted successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case DELETE_COUNTRY:
            return {
                ...state,
                success: 'Country deleted successfully.',
                error: false,
                submitting: false,
                loading: false
            };

        case UPDATE_CUSTOMER_ORDER:
            return {...state, success: 'Customer order updated successfully.', error: false, submitting: false, loading: false};
        case UPDATE_SUPPLIER_ORDER:
            return {...state, success: 'Supplier order updated successfully.', error: false, submitting: false, loading: false};
        case UPDATE_PRODUCT_LINK:
            return {...state, success: 'Update link successfully.', error: false, submitting: false, loading: false};

        case EDIT_USER:
            return {...state, success: 'User edited successfully.', error: false, submitting: false, loading: false};
        case EDIT_ORDER:
            return {...state, success: 'Order edited successfully.', error: false, submitting: false, loading: false};
        case EDIT_SERVICE:
            return {...state, success: 'Service edited successfully.', error: false, submitting: false, loading: false};
        case EDIT_CATEGORY:
            return {
                ...state,
                success: 'Category edited successfully.',
                error: false,
                submitting: false,
                loading: false
            };
        case EDIT_COUNTRY:
            return {...state, success: 'Country edited successfully.', error: false, submitting: false, loading: false};

        case ADD_TO_CART:
            return {...state, cartItems: action.payload};
        case REMOVE_FROM_CART:
            return {...state, cartItems: action.payload};
        case EMPTY_CART:
            return {...state, cartItems: []};
        case ADD_CUSTOMER_PAYMENT:
            return {...state, success: 'Country edited successfully.', error: false, submitting: false, loading: false};

        default:
            return {...state, error: false, success: false, submitting: false, loading: false};
    }
};