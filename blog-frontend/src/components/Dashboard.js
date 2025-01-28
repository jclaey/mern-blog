import Layout from "./Layout.js"

const Dashboard = () => {
    const fetchAdminDetails = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:5000/api/admin/dashboard-admin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data)
        } catch (err) {
            console.error('Error fetching admin details:', err)
        }
    }

    return (
        <Layout>
            
        </Layout>
    )
}

export default Dashboard