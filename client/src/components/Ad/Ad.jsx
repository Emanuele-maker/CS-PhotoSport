import { useEffect } from "react"

const Ad = ({ currentPath }) => {
    useEffect(() => {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    }, [currentPath])
    
    return (
      <div key={currentPath}>
        <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5204475998828585"
            data-ad-slot="4985105893"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
      </div>
    )
}

export default Ad