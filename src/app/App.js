import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Faq from "./views/pages/Faq";
import Home from "./views/pages/Home";
import Login from "./views/pages/Login";
import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SupplierOrders } from "./views/supplier"
import {Provider} from 'react-redux';
import createStore from './create-store';
import { CreateSupplierOrder } from "./views/supplierOrder";
import { CreateCustomer, CustomerList } from "./views/customer"
import { CreateCustomerOrder, CustomerOrderList } from "./views/customerOrder"
import BillProductSelection from "./views/supplierOrder/bill-product-selection"
import CreateProductLink from "./views/productsLinker/create-product-link"
import CreateProduct from "./views/product/create-product"
import ProductInfoPage from "./views/product/product-info-page"

let theme = createMuiTheme({
    palette: {
        type: 'light',
        background: {
            default: '#FFFAF0',
        },
        primary: {
            main: '#f2513f',
        },
        secondary: {
            main: '#25a1ba',
        },
        text: {
            // primary: '#424B54',
        }
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    spacing: 5,
    typography: {
        useNextVariants: true,
        h3: {
            fontWeight: 2000,
        },
        subtitle1: {
            fontSize: 20,
            fontWeight: 500,
            fontStyle: 'italic',
        },
    },
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <Provider store={createStore()}>
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/faq" component={Faq}/>
                                <Route exact path="/new-customer" component={CreateCustomer} />
                                <Route exact path="/customers" component={CustomerList} />
                                <Route exact path="/customer-order" component={CreateCustomerOrder} />
                                <Route exact path="/users-orders" component={CustomerOrderList} />
                                <Route exact path="/supplier-orders" component={SupplierOrders}/>
                                <Route exact path="/supplier-order" component={CreateSupplierOrder} />
                                <Route exact path="/table" component={BillProductSelection} />
                                <Route exact path="/linker" component={CreateProductLink} />
                                <Route exact path="/new-product" component={CreateProduct} />
                                <Route exact path="/products-info" component={ProductInfoPage} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        </Provider>
    );
}

export default App;
