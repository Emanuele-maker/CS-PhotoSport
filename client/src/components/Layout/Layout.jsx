import Navbar from "./Navbar/Navbar"
import "./Layout.scss"
import { useEffect, useState } from "react"
import Header from "./Header/Header"

let isMobile = false

export default function Layout({ children, cartCount }) {
    const [isMobileNavbarOpened, setIsMobileNavbarOpened] = useState(false)

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
            return navigator.userAgent.match(toMatchItem)
        }) || (( window.innerWidth <= 1000 ) && ( window.innerHeight <= 800 ))
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            isMobile = detectMob()
        })
    }, [])

    return (
        <>
            { isMobileNavbarOpened || !detectMob() ? <Navbar cartCount={cartCount} /> : <></> }
            <Header setMobileNavbar={() => setIsMobileNavbarOpened(true)} cartCount={cartCount} />
            <div className={`page-content`} onClick={() => { detectMob() && setIsMobileNavbarOpened(false) }}>
                <div className={`obfuscator ${isMobileNavbarOpened && detectMob() ? "visible" : "invisible"}`}></div>
                { children }
            </div>
        </>
    )
}