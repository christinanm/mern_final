import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const baseURL = 'https://web215-mern-backend.onrender.com';

const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get(`${baseURL}/api/auth/verify`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })

                if (res.data.success) {
                    setUser(res.data.user)
                } else {
                    setUser(null)
                }

            } catch (error) {
                console.log(error)
            }
        }
        verifyUser()
    }, [])

    return (
        <div>
           <authContext.Provider value = {{ user, login, logout }}>
            {children}
            </authContext.Provider>
        </div>
    )
}

export const useAuth = () => useContext(authContext)

export default ContextProvider