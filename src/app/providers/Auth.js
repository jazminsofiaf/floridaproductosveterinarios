import React, { useEffect, useState } from "react";
import Fire from './Fire'

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null)

    useEffect(() => {
        Fire.auth().onAuthStateChanged(setCurrentUser);
    }, [])

    useEffect(() => {
        if (currentUser) {
            console.log("USE EFFECT: " + JSON.stringify(currentUser, null, 2));
            const token = Object.entries(currentUser)[5][1].b.g;
            setToken(token);
            console.log("USE EFFECT TOKEN: " + token);
        }
    }, [currentUser])

    return (
        <AuthContext.Provider
            value={{
                currentUser, setToken, token
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}