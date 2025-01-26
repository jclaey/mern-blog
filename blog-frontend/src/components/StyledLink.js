import { Link } from 'react-router-dom'

const StyledLink = ({ to, className, fontSize, children }) => {
    return (
        <Link 
            to={to} 
            style={{ fontSize: `${fontSize}px` }} 
            className={`nav-link ${className}`} 
            id="styled-link"
        >
            {children}
        </Link>
    )
}

export default StyledLink