import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Layout from './Layout.js'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        
    }, [posts])

    return (
        <Layout>
            <h1>Welcome to My Blog!</h1>
        </Layout>
    )
}

export default Home