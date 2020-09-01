import axios from 'axios'
import jwt from "jsonwebtoken";
import AuthenticationService from "../services/backoffice/authentication-service";
import {setLogged} from "../actions/actions";

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function setPageAuthorizationStatus(store) {
    if (localStorage.token) {
        let seconds = new Date().getTime() / 1000;
        let expiration = jwt.decode(localStorage.token).exp
        if (seconds >= expiration) {
            AuthenticationService.isLogged()
                .then(async res => {
                    if (res.Boolean) {
                        store.dispatch(setLogged(true))
                        setAuthorizationToken(localStorage.token);
                    } else {
                        store.dispatch(setLogged(false))
                        setAuthorizationToken(false);
                    }
                })
        } else {
            store.dispatch(setLogged(true))
            setAuthorizationToken(localStorage.token);
        }
    }
}

export function logout() {
    localStorage.removeItem("token");
    setAuthorizationToken(false);
}