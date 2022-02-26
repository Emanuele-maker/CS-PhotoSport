import { Link } from "react-router-dom"
import "./Navbar.scss"
import Footer from "../Footer/Footer"
import { useNavigate } from "react-router-dom"

export default function Navbar({ onCloseNav }) {
    const navigate = useNavigate()

    const onClickLink = (route) => {
        onCloseNav()
        navigate(route)
    }

    return (
        <nav className="nav">
            <h1>CS PhotoSport</h1>
            <div className="list">
                <ul className={`list`}>
                        <li onClick={() => onClickLink("/")}><Link to="/" className="link">Home</Link></li>
                        <li onClick={() => onClickLink("/carrello")}><Link className="cart-link link" to="/carrello">Carrello</Link></li>
                    </ul>
                <Footer />
            </div>
        </nav>
    )
}