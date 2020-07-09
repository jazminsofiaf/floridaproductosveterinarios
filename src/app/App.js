import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {createMuiTheme, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import SupplierOrdersPage from "./pages/SupplierOrdersPage";
import { Orders } from "./components/supplier"
import {Provider} from 'react-redux';
import createStore from './create-store';

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
                                <Route exact path="/supplier-orders" component={SupplierOrdersPage}/>
                                <Route exact path="/orders" component={Orders}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </MuiThemeProvider>
            </div>
        </Provider>
    );
}

export default App;
