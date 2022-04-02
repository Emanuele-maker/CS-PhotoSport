import { useEffect } from "react"

export default function AdComponent() {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, [])

    return (
        <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5204475998828585"
        data-ad-slot="4985105893"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    )
}
