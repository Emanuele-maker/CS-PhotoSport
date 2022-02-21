import { Link } from "react-router-dom"
import "./Navbar.scss"
import Footer from "../Footer/Footer"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className="nav">
            <h1>CS PhotoSport</h1>
            <div className="list">
                <ul className={`list`}>
                        <li onClick={() => navigate("/")}><Link to="/" className="link">Home</Link></li>
                        <li onClick={() => navigate("/carrello")}><Link className="cart-link link" to="/carrello">Carrello</Link></li>
                    </ul>
                <Footer />
            </div>
        </nav>
    )
}