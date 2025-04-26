import React, {createContext, useState, useEffect} from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            // можно подтянуть профиль
            api.get('profiles/me/')
                .then(res => setUser(res.data))
                .catch(() => {
                    setToken(null);
                    localStorage.removeItem('token')
                })
        }
    }, [token])

    const login = async (credentials) => {
        const {data} = await api.post('auth/login/', credentials)
        localStorage.setItem('token', data.access)
        setToken(data.access)
        return data
    }

    const logout = () => {
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
