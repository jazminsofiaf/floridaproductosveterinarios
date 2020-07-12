/// <reference types="react-scripts" />
import { match, RouteComponentProps } from 'react-router-dom';

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

    export interface ISupplierOrder {
        id: string;
        owner_summary: string;
        number: string;
        emission_date: string;
        status: string;
        products: IOrderProduct[];
        total: number;
    }

    interface IOrderProduct {
        id: string,
        name: string,
        price: number,
        expiration_date?: any,
        amount: number,
    }

    export interface IReceptionOrderPostData {
        order_id: string;
        bill_number: number;
        bill_type: string;
        gross_revenue: boolean;
        received_products: IOrderProduct[];
        total: number;
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

    export interface IServicePostData {
        name: string;
        category_id: string;
        disabled: string;
    }

    export interface ICategoryPostData {
        name: string;
        disabled: boolean;
    }

    export interface ICountryPostData extends ICountry {}
}
