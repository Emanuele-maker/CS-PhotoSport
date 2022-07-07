import React from 'react'
import { Link } from 'react-router-dom'
import "./HeaderItem.scss"

const HeaderItem = ({ title, icon, href }) => {
  return (
    <div className="header-item">
        <Link to={href}>
            { icon }
            <span>{ title }</span>
        </Link>
    </div>
  )
}

export default HeaderItem