import Navbar from "./Navbar/Navbar"
import "./Layout.scss"
import { useState } from "react"
import Header from "./Header/Header"

export default function Layout({ children, cartCount, isCartIconVisible, shakeCartIcon, setShakeCartIcon, isLoggedIn, logUserIn, profilePicture }) {
    const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)

    return (
        <div className="layout">
            { isMobileNavbarOpened ? <Navbar isLoggedIn={isLoggedIn} onCloseNav={() => setIsMobileNavbarOpened(false)} cartCount={cartCount} /> : <></> }
            <Header profilePicture={profilePicture} logUserIn={logUserIn} isLoggedIn={isLoggedIn} setShakeCartIcon={setShakeCartIcon} shakeCartIcon={shakeCartIcon} isCartIconVisible={isCartIconVisible} setMobileNavbar={() => setIsMobileNavbarOpened(true)} cartCount={cartCount} />
            <div className={`page-content`} onClick={() => { setIsMobileNavbarOpened(false) }}>
                <div className={`obfuscator ${isMobileNavbarOpened ? "visible" : "invisible"}`}></div>
                { children }
            </div>
        </div>
    )
}