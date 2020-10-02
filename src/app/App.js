import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
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
import CreateProduct from "./views/product/create-product"
import ProductInfoPage from "./views/product/product-info-page"
import PrivateRoute from "./providers/PrivateRoute";
import {setPageAuthorizationStatus} from "./utils/authorizationToken";
import CreateSupplier from "./views/supplier/create-supplier";
import CreateSupplierProduct from "./views/supplier/create-supplier-product";
import ArcurList from "./views/supplier/arcur";
import Account from "./views/account/account";
import SupplierList from "./views/supplier/information/supplier-list";
import UpperBar from "./views/upperBar/UpperBar";


const store = createStore();

setPageAuthorizationStatus(store);

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
        <Provider store={store}>
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <UpperBar />
                        <div className={'container'}>
                            <Switch>
                                <PrivateRoute exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <PrivateRoute exact path="/new-customer" component={CreateCustomer} />
                                <PrivateRoute exact path="/customers" component={CustomerList} />
                                <PrivateRoute exact path="/customer-order" component={CreateCustomerOrder} />
                                <PrivateRoute exact path="/users-orders" component={CustomerOrderList} />
                                <PrivateRoute exact path="/supplier-orders" component={SupplierOrders}/>
                                <PrivateRoute exact path="/new-supplier" component={CreateSupplier}/>
                                <PrivateRoute exact path="/new-supplier-product" component={CreateSupplierProduct}/>
                                <PrivateRoute exact path="/supplier-order" component={CreateSupplierOrder} />
                                <PrivateRoute exact path="/new-product" component={CreateProduct} />
                                <PrivateRoute exact path="/products-info" component={ProductInfoPage} />
                                <PrivateRoute exact path="/arcur" component={ArcurList} />
                                <PrivateRoute exact path="/account/:id" component={Account} />
                                <PrivateRoute exact path="/suppliers" component={SupplierList} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        </Provider>
    );
}

export default App;
