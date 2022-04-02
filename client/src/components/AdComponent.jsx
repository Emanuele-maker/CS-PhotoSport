import { useEffect } from "react"

export default function AdComponent() {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
    }, [])

    return (
        <ins className="adsbygoogle"
        style={{display: "block", height: "90px"}}
        data-ad-client="ca-pub-5204475998828585"
        slot="4985105893"
        format="auto"
        responsive="true"></ins>
    )
}
