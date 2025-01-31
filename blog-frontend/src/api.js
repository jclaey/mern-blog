import axios from "axios"
import { getAccessToken, setAccessToken } from "./utils/authHelpers.js"

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Allows sending cookies (refreshToken)
})

// 🔄 Add an interceptor to refresh the token when it expires
api.interceptors.response.use(
    (response) => response, // If the response is successful, return it
    async (error) => {
        const originalRequest = error.config
        
        // If the error is due to an expired token & it's the first retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true // Mark request to prevent infinite loops

            try {
                // Request a new access token using the refresh token
                const refreshResponse = await axios.post(
                    "http://localhost:5000/api/admin/refresh",
                    {},
                    { withCredentials: true }
                )

                const newAccessToken = refreshResponse.data.accessToken

                // Store the new token
                setAccessToken(newAccessToken)

                // Update request headers and retry the failed request
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
                return api(originalRequest)
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError)
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api