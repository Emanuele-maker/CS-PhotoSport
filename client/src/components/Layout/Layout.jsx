import Navbar from "./Navbar/Navbar"
import "./Layout.scss"
import { useState } from "react"
import Header from "./Header/Header"
import CookieBanner from "./CookieBanner/CookieBanner"
import Footer from "./Footer/Footer"

export default function Layout({ children, cartCount, isCartIconVisible, shakeCartIcon, setShakeCartIcon }) {
    const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)

    return (
        <>
            { isMobileNavbarOpened ? <Navbar onCloseNav={() => setIsMobileNavbarOpened(false)} cartCount={cartCount} /> : <></> }
            <Header setShakeCartIcon={setShakeCartIcon} shakeCartIcon={shakeCartIcon} isCartIconVisible={isCartIconVisible} setMobileNavbar={() => setIsMobileNavbarOpened(true)} cartCount={cartCount} />
            <div className={`page-content`} onClick={() => { setIsMobileNavbarOpened(false) }}>
                <div className={`obfuscator ${isMobileNavbarOpened ? "visible" : "invisible"}`}></div>
                { children }
            </div>
            <CookieBanner />
            <Footer />
        </>
    )
}