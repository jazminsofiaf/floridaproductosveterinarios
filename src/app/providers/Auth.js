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
            const token = Object.entries(currentUser)[5][1].b.g;
            setToken(token);
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