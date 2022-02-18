import { FaShoppingCart, FaBars } from "react-icons/fa"
import "./Header.scss"
import { Link } from "react-router-dom"

export default function Header({ cartCount, setMobileNavbar }) {
    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ]
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem)
        })
    }

    return (
        <div className={`header ${detectMob() ? "mobile" : ""}`}>
            <FaBars size="1.5rem" className="icon bars" color="white" onClick={setMobileNavbar} />
            <div className="cart-container">
                <Link to="/carrello"><FaShoppingCart color="white" size="1.5rem" className="icon cart-icon" /></Link>
                <p className="cart-count">{ cartCount }</p>
            </div>
        </div>
    )
}