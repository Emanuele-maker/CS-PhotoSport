import { Link } from "react-router-dom"
import "./Navbar.scss"
import { FaShoppingCart, FaBars } from "react-icons/fa"
import { useState } from "react"

export default function Navbar({ cartCount }) {
    const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)

    return (
        <nav className="nav">
            <Link to="/" className="link"><h1>Cristian Salvadori</h1></Link>
            <div className="list">
                <ul className={`list ${isMobileNavbarOpened ? "visible-list" : "unvisible-list"}`}>
                        <li><Link to="/" className="link">Home</Link></li>
                        <li><Link to="/shop" className="link">Shop</Link></li>
                        <li>
                            {
                                <div className="cart-container">
                                    <Link to="/cart"><FaShoppingCart color="white" size="1.5rem" className="cart-icon" /></Link>
                                    <p className="cart-count">{ cartCount }</p>
                                    <Link className="cart-link link" to="/cart">Carrello</Link>
                                </div>
                            }
                        </li>
                    </ul>
                <FaBars size="1.5rem" className="bars" color="white" onClick={() => setIsMobileNavbarOpened(!isMobileNavbarOpened)} />
            </div>
        </nav>
    )
}