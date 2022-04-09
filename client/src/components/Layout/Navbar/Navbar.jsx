import "./Navbar.scss"
import CopyRight from "../Copyright/CopyRight"
import { useNavigate } from "react-router-dom"
import NavbarListItem from "../NavbarListItem/NavbarListItem"
import { AiOutlineHome, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineMail } from "react-icons/ai"
import { BsNewspaper } from "react-icons/bs"

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
                    <NavbarListItem onClick={onClickLink} href="/" text="HOME" icon={<AiOutlineHome color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/ricerca" text="CERCA" icon={<AiOutlineSearch color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/carrello" text="CARRELLO" icon={<AiOutlineShoppingCart color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/news" text="NEWS" icon={<BsNewspaper color="#458BA9" size="1.5rem" />} />
                    <NavbarListItem onClick={onClickLink} href="/contatti" text="CONTATTI" icon={<AiOutlineMail color="#458BA9" size="1.5rem" />} />
                </ul>
                <CopyRight />
            </div>
        </nav>
    )
}