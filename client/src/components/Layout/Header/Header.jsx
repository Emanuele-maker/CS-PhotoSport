import { FaShoppingCart, FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import "./Header.scss"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Tada from 'react-reveal/Tada'
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai"
import { BsNewspaper } from "react-icons/bs"
import { FaQuestion } from "react-icons/fa"
import { buildRoute } from "../../../staticInfo"
import HeaderItem from "../../HeaderItem/HeaderItem"
import { IoMdPhotos } from "react-icons/io"

export default function Header({ cartCount, setMobileNavbar, shakeCartIcon, setShakeCartIcon }) {
    const navigate = useNavigate()

    return (
        <div className={`header`}>
            <FaBars size="1.5rem" className="icon bars" color="white" onClick={setMobileNavbar} />
            <div className="desktop-left">
                <Link to="/" className="header-site-logo"><img src={`${buildRoute}/favicon.png`} alt="Logo del sito" className="header-site-logo-image" /></Link>
                <div className="header-items-list">
                    <HeaderItem title="Home" icon={<AiOutlineHome size="18px" color="white" />} href="/" />
                    <HeaderItem title="Chi Siamo" icon={<FaQuestion size="18px" color="white" />} href="/chi-siamo" />
                    <HeaderItem title="News" icon={<BsNewspaper size="18px" color="white" />} href="/news" />
                    <HeaderItem title="Contatti" icon={<AiOutlineMail size="18px" color="white" />} href="/contatti" />
                    <HeaderItem title="Foto Salvate" icon={<IoMdPhotos size="18px" color="white" />} href="/foto-salvate" />
                </div>
            </div>
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