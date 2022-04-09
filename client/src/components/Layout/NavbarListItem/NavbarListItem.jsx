import { Link } from "react-router-dom"
import "./NavbarListItem.scss"

const NavbarListItem = ({ onClick, href, text, icon }) => {
  return (
    <li className="navbar-list-item" onClick={() => onClick(href)}>
        { icon && icon }
        <Link to={href}>{ text }</Link>
    </li>
  )
}

export default NavbarListItem