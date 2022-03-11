import Navbar from "./Navbar/Navbar"
import "./Layout.scss"
import { useState } from "react"
import Header from "./Header/Header"
import CookieBanner from "./CookieBanner/CookieBanner"
import Footer from "./Footer/Footer"

export default function Layout({ children, cartCount, isCartIconVisible }) {
    const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)

    return (
        <>
            { isMobileNavbarOpened ? <Navbar onCloseNav={() => setIsMobileNavbarOpened(false)} cartCount={cartCount} /> : <></> }
            <Header isCartIconVisible={isCartIconVisible} setMobileNavbar={() => setIsMobileNavbarOpened(true)} cartCount={cartCount} />
            <div className={`page-content`} onClick={() => { setIsMobileNavbarOpened(false) }}>
                <div className={`obfuscator ${isMobileNavbarOpened ? "visible" : "invisible"}`}></div>
                { children }
            </div>
            <CookieBanner />
            <Footer />
        </>
    )
}