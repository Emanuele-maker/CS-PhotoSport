import Navbar from "./Navbar/Navbar"
import "./Layout.scss"
import { useState } from "react"
import Header from "./Header/Header"

export default function Layout({ children, cartCount }) {
    const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(true)

    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ]
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        }) || (( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ))
    }

    return (
        <>
            { isMobileNavbarOpened && <Navbar cartCount={cartCount} /> }
            <Header setMobileNavbar={() => setIsMobileNavbarOpened(true)} cartCount={cartCount} />
            <div className={`page-content`} onClick={() => { detectMob() && setIsMobileNavbarOpened(false) }}>
                <div className={`obfuscator ${isMobileNavbarOpened && detectMob() ? "visible" : "invisible"}`}></div>
                { children }
            </div>
        </>
    )
}