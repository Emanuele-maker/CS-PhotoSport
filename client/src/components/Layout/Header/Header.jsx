import { FaShoppingCart, FaBars } from "react-icons/fa"
import "./Header.scss"
import { Link } from "react-router-dom"

export default function Header({ cartCount, setMobileNavbar }) {

    return (
        <div className={`header mobile`}>
            <FaBars size="1.5rem" className="icon bars" color="white" onClick={setMobileNavbar} />
            <div className="cart-container">
                <Link to="/carrello"><FaShoppingCart color="white" size="1.5rem" className="icon cart-icon" /></Link>
                <p className="cart-count">{ cartCount }</p>
            </div>
        </div>
    )
}