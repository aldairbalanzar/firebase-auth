import React, { useState, createContext, useContext, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    
    const register = (email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
    }
    
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrUser(user)
            setIsLoading(false)
        })
        
        return unsub
    }, [])
    
    const value = {
        currUser,
        register
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
