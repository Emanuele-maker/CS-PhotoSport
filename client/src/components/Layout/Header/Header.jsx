import { FaShoppingCart, FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import "./Header.scss"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Tada from 'react-reveal/Tada'

export default function Header({ cartCount, setMobileNavbar, shakeCartIcon, setShakeCartIcon }) {
    const navigate = useNavigate()

    return (
        <div className={`header mobile`}>
            <FaBars size="1.5rem" className="icon bars" color="white" onClick={setMobileNavbar} />
            <div className="cart-container">
                <div className="search-container" onClick={() => navigate("/ricerca")}>
                    <AiOutlineSearch size="2rem" className="icon search-icon" />
                    <p>cerca nel sito</p>
                </div>
                <Link to="/carrello">
                    <Tada spy={shakeCartIcon} onReveal={() => setShakeCartIcon(false)}>
                        <FaShoppingCart color="white" size="1.5rem" className="icon cart-icon" />
                    </Tada>
                </Link>
                <p className="cart-count">{ cartCount }</p>
            </div>
        </div>
    )
}