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
       return  auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
       return  auth.sendPasswordResetEmail(email)
    }

    const updateEmail = (email) => {
       return currUser.updateEmail(email)
    }

    const updatePassword = (password) => {
       return currUser.updatePassword(password)
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
        register,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
