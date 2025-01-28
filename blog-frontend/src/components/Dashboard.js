import { useEffect, useState } from "react"
import Layout from "./Layout.js"

const Dashboard = () => {
    const [adminDetails, setAdminDetails] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:5000/api/admin/dashboard-admin', {
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
            <h1>Admin Dashboard</h1>
            {adminDetails ? (
                <div>
                    { adminDetails.name ? <p>Name: {adminDetails.name}</p> : '' }
                    <p>Email: {adminDetails.email}</p>
                </div>
            ) : (
                <p>Loading admin details...</p>
            )}
        </Layout>
    )
}

export default Dashboard