import {
    ERROR,
    LOADING,
    SUBMITTING,
    STOP_LOADING,
    //
    FETCH_USERS,
    FETCH_ORDERS,
    FETCH_SERVICES,
    FETCH_CATEGORIES,
    FETCH_COUNTRIES,
    //
    CREATE_USER,
    CREATE_ORDER,
    CREATE_SERVICE,
    CREATE_CATEGORY,
    CREATE_COUNTRY,
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
    //
    EDIT_USER,
    EDIT_ORDER,
    EDIT_SERVICE,
    EDIT_CATEGORY,
    EDIT_COUNTRY, CREATE_RECEPTION,
} from './types';

export default (state: [] = [], action: IAction) => {
    switch (action.type) {
        case ERROR:
            return { ...state, error: action.payload.message, success: false, submitting: false, loading: false };
        case SUBMITTING:
            return { ...state, error: false, success: false, submitting: true, loading: false };
        case LOADING:
            return { ...state, error: false, success: false, submitting: false, loading: true };
        case STOP_LOADING:
            return { ...state, loading: false}

        case FETCH_USERS:
            return { ...state, users: action.payload, error: false, submitting: false, loading: false };
        case FETCH_ORDERS:
            return { ...state, orders: action.payload, error: false, submitting: false, loading: false };
        case FETCH_SERVICES:
            return { ...state, services: action.payload, error: false, submitting: false, loading: false };
        case FETCH_CATEGORIES:
            return { ...state, categories: action.payload, error: false, submitting: false, loading: false };
        case FETCH_COUNTRIES:
            return { ...state, countries: action.payload, error: false, submitting: false, loading: false };

        case FETCH_USER_BY_ID:
            return { ...state, user: action.payload, error: false, submitting: false, loading: false };
        case FETCH_ORDER_BY_ID:
            return { ...state, order: action.payload, error: false, submitting: false, loading: false };
        case FETCH_SERVICE_BY_ID:
            return { ...state, service: action.payload, error: false, submitting: false, loading: false };
        case FETCH_CATEGORY_BY_ID:
            return { ...state, category: action.payload, error: false, submitting: false, loading: false };
        case FETCH_COUNTRY_BY_ID:
            return { ...state, country: action.payload, error: false, submitting: false, loading: false };

        case CREATE_USER:
            return { ...state, success: 'User created successfully.', error: false, submitting: false, loading: false };
        case CREATE_ORDER:
            return { ...state, success: 'Order created successfully.', error: false, submitting: false, loading: false };
        case CREATE_SERVICE:
            return { ...state, success: 'Service created successfully.', error: false, submitting: false, loading: false };
        case CREATE_CATEGORY:
            return { ...state, success: 'Category created successfully.', error: false, submitting: false, loading: false };
        case CREATE_COUNTRY:
            return { ...state, success: 'Country created successfully.', error: false, submitting: false, loading: false };
        case CREATE_RECEPTION:
            return { ...state, success: 'ReceptionItems created successfully.', error: false, submitting: false, loading: false };

        case DELETE_USER:
            return { ...state, success: 'User deleted successfully.', error: false, submitting: false, loading: false };
        case DELETE_ORDER:
            return { ...state, success: 'Order deleted successfully.', error: false, submitting: false, loading: false };
        case DELETE_SERVICE:
            return { ...state, success: 'Service deleted successfully.', error: false, submitting: false, loading: false };
        case DELETE_CATEGORY:
            return { ...state, success: 'Category deleted successfully.', error: false, submitting: false, loading: false };
        case DELETE_COUNTRY:
            return { ...state, success: 'Country deleted successfully.', error: false, submitting: false, loading: false };

        case EDIT_USER:
            return { ...state, success: 'User edited successfully.', error: false, submitting: false, loading: false };
        case EDIT_ORDER:
            return { ...state, success: 'Order edited successfully.', error: false, submitting: false, loading: false };
        case EDIT_SERVICE:
            return { ...state, success: 'Service edited successfully.', error: false, submitting: false, loading: false };
        case EDIT_CATEGORY:
            return { ...state, success: 'Category edited successfully.', error: false, submitting: false, loading: false };
        case EDIT_COUNTRY:
            return { ...state, success: 'Country edited successfully.', error: false, submitting: false, loading: false };

        default:
            return { ...state, error: false, success: false, submitting: false, loading: false };
    }
};