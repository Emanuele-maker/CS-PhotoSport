import { useState } from "react"
import "./CookieBanner.scss"

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(true)

    if (!showBanner) return <></>

    return (
        <div className="cookie-banner">
            <p>Questo sito utilizza i cookie, continuando la navigazione accetti il loro utilizzo.</p>
            <button onClick={() => setShowBanner(false)}>Accetta</button>
        </div>
    )
}
