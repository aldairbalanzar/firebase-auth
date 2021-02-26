import React, { useState, createContext, useContext, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState()

    
    const register = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
    }
    
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrUser(user)
        })
        
        return unsub
    }, [])
    
    const value = {
        currUser,
        register
    }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
