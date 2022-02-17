import { Link } from "react-router-dom"
import "./Navbar.scss"
import Footer from "../Footer/Footer"
import { useHistory } from "react-router-dom"

export default function Navbar() {
    const history = useHistory()

    return (
        <nav className="nav">
            <h1>CS PhotoSport</h1>
            <div className="list">
                <ul className={`list`}>
                        <li onClick={() => history.push("/")}><Link to="/" className="link">Home</Link></li>
                        <li onClick={() => history.push("/cart")}><Link className="cart-link link" to="/cart">Carrello</Link></li>
                    </ul>
                <Footer />
            </div>
        </nav>
    )
}