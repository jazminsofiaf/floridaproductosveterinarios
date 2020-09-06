/// <reference types="react-scripts" />
import {match, RouteComponentProps} from 'react-router-dom';

declare global {
    // export interface IResponse extends express.Response {
    //     renderView: (View: React.FunctionComponent, props?: any) => void;
    // }
    //
    // export interface IInternalUser extends firebase.User {
    //     token: string;
    // }
    //
    // export interface IRequest extends express.Request {
    //     req: any;
    //     user?: IInternalUser;
    //     device?: {
    //         type: string;
    //     };
    // }

    export interface IInitialState {
        // currentUser?: IUser;
        pathname?: string;
    }

    export type IWindow = typeof window & {
        __PRELOADED_STATE__: object;
    };

    export interface IComponent {
        children?: React.ReactNode;
        className?: string;
        // currentUser?: IUser;
        match?: match;
        location?: RouteComponentProps['location'];
        history?: RouteComponentProps['history'];
        error?: string;
        success?: string;
        loading?: boolean;
        submitting?: boolean;
        form?: any;
        currentPathname?: string;
        initialState?: IInitialState;
        deviceType?: string;
        refreshWithDelay: () => void;
    }

    // export interface IUser extends firebase.User {
    //     uid: string;
    //     email: string;
    //     email_verified?: string;
    //     name: string;
    //     disabled?: boolean;
    //     phone?: string;
    //     access?: string;
    //     country_id: string;
    //     token?: string;
    // }

    export interface IOrder {
        id: string;
        owner_id: string;
        owner_summary: string;
        number: string;
        emission_date: string;
        delivery_date: string;
        status: string;
        products: IOrderProduct[];
        items_count: number;
        total: number;
    }

    export interface IOrderProduct {
        id: string
        name: string
        price: number
        status?: string
        expiration_date?: any
        amount: number

        expiration_view?: string
    }

    export interface IReceivedProduct {
        id: string
        amount: number
        price: number
        discount: string
        expiration_date?: any
        extra: number
        final_cost: number
    }

    export interface ISupplierProduct {
        id: string,
        name: string,
        price: number,
        product_id: string,
    }

    export interface ICartItem {
        id: string,
        name: string,
        price: number,
        amount: number
    }

    export interface IProductLink {
        supplier_product_id: string,
        product_id: string,
        ratio: number
    }

    export interface IDistributorProduct {
        name: string,
        category: string,
        brand: string,
        application: string,
        species: string[],
        image: string,
        presentation: {
            format: string,
            amount: number,
            measure: string
        }
    }

    export interface IReceptionOrderPostData {
        order_id: string;
        emission_date: string;
        bill_number: number;
        bill_type: string;
        received_products: IReceivedProduct[];
        bill_discount: number;
        discount_dist: number;
        gross_tax: number;
        apply_tax: boolean;
    }

    export interface IService {
        id: string;
        name: string;
        category_id: string;
        disabled: string;
    }

    export interface ICategory {
        id: string;
        name: string;
        disabled: boolean;
    }

    export interface ICountry {
        id: string;
        name: string;
        locale: string;
        currency_id: string;
        phone_code: string;
        disabled: boolean;
    }

    export interface IAction {
        type: string;
        payload: any;
    }

    export interface ICustomer {
        id: string;
        first_name: string;
        surname: string;
        business_name: string;
        id_number: string;
        email: string;
        phone: string;
        category: string;
        addresses: IAddress[];
    }

    export interface ICredential {
        email: string;
        password: string;
    }

    export interface ICustomerSummary {
        id: string;
        name_summary: string;
        contact_summary: string;
        address_summary: string;
        category: string;
        balance: string;
    }

    export interface IAddress {
        id?: string;
        country: string;
        province:string;
        city: string;
        locality: string;
        street_name: string;
        street_number: number;
        postal_code: string;
        floor_number: string;
    }

    export interface IPaymentPostData {
        owner_id: string,
        payments: [IPayment]
    }

    export interface IPayment {
        payment_method: string;
        amount: number;
        ref_number: string;
    }

    export interface IUserPostData {
        email?: string;
        email_verified?: string;
        password: string;
        name: string;
        phone?: string;
        access?: string;
        country_id: string;
        disabled: boolean;
    }

    export interface IOrderPostData {
        owner_id: string;
        products: IOrderProduct[];
    }

    export interface IOrderUpdatePostData {
        order_id: string;
        owner_id: string;
        products: IOrderProduct[];
    }

    export interface ISupplier {
        id: string;
        name_summary: string;
    }

    export interface IServicePostData {
        name: string;
        category_id: string;
        disabled: string;
    }

    export interface ICategoryPostData {
        name: string;
        disabled: boolean;
    }

    export interface ICountryPostData extends ICountry {
    }
}
