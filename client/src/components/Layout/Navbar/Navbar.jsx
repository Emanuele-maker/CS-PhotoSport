import "./Navbar.scss"
import CopyRight from "../Copyright/CopyRight"
import {Link, useNavigate} from "react-router-dom"
import NavbarListItem from "../NavbarListItem/NavbarListItem"
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineMail } from "react-icons/ai"
import { FaQuestion, FaUserAlt, FaWallet } from "react-icons/fa"
import playstorelogo from "../../../playstore.png"

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
                    <NavbarListItem onClick={onClickLink} href="/profilo" text={isLoggedIn ? "PROFILO" : "REGISTRATI"} icon={<FaUserAlt color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/chi-siamo" text="CHI SIAMO" icon={<FaQuestion color="#458BA9" size="1.5rem" />} />
                    {/* <NavbarListItem onClick={onClickLink} href="/news" text="NEWS" icon={<BsNewspaper color="#458BA9" size="1.5rem" />} /> */}
                    <NavbarListItem onClick={onClickLink} href="/social" text="SOCIAL" icon={<AiOutlineMail color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={(href) => window.open(href)} href="https://donate.stripe.com/cN203Ycfkg1f6xW3cc" text="DONAZIONE" icon={<FaWallet color="#458BA9" size="1.5rem" />} />
                </ul>
                {/*<div className="download-app">*/}
                {/*    <span>Scarica l'app</span>*/}
                {/*    <Link to="#">*/}
                {/*        <img src={playstorelogo} alt="play store link" />*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <CopyRight />
            </div>
        </nav>
    )
}