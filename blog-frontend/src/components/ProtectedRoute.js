import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/AuthContext.js"

const ProtectedRoute = () => {
    const { isSignedIn } = useContext(AuthContext)

    return isSignedIn ? <Outlet /> : <Navigate to="/admin/secure-access-portal" />
}

export default ProtectedRoute