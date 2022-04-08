import "./Navbar.scss"
import CopyRight from "../Copyright/CopyRight"
import { useNavigate } from "react-router-dom"
import NavbarListItem from "../NavbarListItem/NavbarListItem"

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
                        <NavbarListItem onClick={onClickLink} href="/" text="HOME" />
                        <NavbarListItem onClick={onClickLink} href="/ricerca" text="CERCA" />
                        <NavbarListItem onClick={onClickLink} href="/carrello" text="CARRELLO" />
                        {/* <NavbarListItem onClick={onClickLink} href="/news" text="NEWS" /> */}
                        <NavbarListItem onClick={onClickLink} href="/contatti" text="CONTATTI" />
                    </ul>
                <CopyRight />
            </div>
        </nav>
    )
}