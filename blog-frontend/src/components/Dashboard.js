import { useEffect, useState } from "react"
import api from '../api.js'
import Layout from "./Layout.js"
import '../styles/dashboard.css'

const Dashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const token = sessionStorage.getItem('accessToken')
                const response = await api.get('/admin/dashboard-admin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                
                setAdminDetails(response.data)
            } catch (err) {
                console.error('Error fetching admin details:', err)
                setError('Failed to fetch admin details')
            }
        }

        fetchAdminDetails()
    }, [])

    if (error) {
        return <div className="alert alert-danger">{error}</div>
    }

    return (
        <Layout>
            <div className="dashboard-container main">
                <div>
                    <h1>Admin Dashboard</h1>
                </div>
                {adminDetails ? (
                    <div>
                        { adminDetails.name ? <h3>Hello, {adminDetails.name}</h3> : '' }
                        <p style={{ fontSize: '20px' }}>Email: {adminDetails.email}</p>
                    </div>
                ) : (
                    <p>Loading admin details...</p>
                )}
            </div>
        </Layout>
    )
}

export default Dashboard