import "./Navbar.scss"
import CopyRight from "../Copyright/CopyRight"
import {Link, useNavigate} from "react-router-dom"
import NavbarListItem from "../NavbarListItem/NavbarListItem"
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineMail, AiOutlineInfoCircle } from "react-icons/ai"
import { FaQuestion } from "react-icons/fa"
import { IoWalletOutline } from "react-icons/io5"
import { HiOutlineUser } from "react-icons/hi"
import playstorelogo from "../../assets/playstore.png"

export default function Navbar({ onCloseNav, isLoggedIn }) {
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
                    <NavbarListItem onClick={onClickLink} href="/" text="HOME" icon={<AiOutlineHome color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/ricerca" text="CERCA" icon={<AiOutlineSearch color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/carrello" text="CARRELLO" icon={<AiOutlineShoppingCart color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/info" text="INFORMAZIONI" icon={<AiOutlineInfoCircle color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/profilo" text={isLoggedIn ? "PROFILO" : "REGISTRATI"} icon={<HiOutlineUser color="#458BA9" size="1.5rem" />} />
                    {/* <NavbarListItem onClick={onClickLink} href="/news" text="NEWS" icon={<BsNewspaper color="#458BA9" size="1.5rem" />} /> */}
                    <NavbarListItem onClick={onClickLink} href="/social" text="SOCIAL" icon={<AiOutlineMail color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={(href) => window.open(href)} href="https://donate.stripe.com/cN203Ycfkg1f6xW3cc" text="DONAZIONE" icon={<IoWalletOutline color="#458BA9" size="1.5rem" />} />
                </ul>
                <div className="download-app">
                    <span style={{ color: "black" }}>Scarica l'app!</span>
                    <Link to="https://play.google.com/store/apps/details?id=com.manudev.csphotosport&pli=1">
                        <img src={playstorelogo} alt="play store link" />
                    </Link>
                </div>
                <CopyRight />
            </div>
        </nav>
    )
}