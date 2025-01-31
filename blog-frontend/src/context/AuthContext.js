import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/admin/refresh", {
                    withCredentials: true,
                })
                setAccessToken(response.data.accessToken)
                setIsSignedIn(true)
            } catch (err) {
                setIsSignedIn(false)
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ accessToken, isSignedIn, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext