import { useEffect } from "react"
import LazyImage from "../LazyImage"
import "./ImageCard.scss"

export default function ImageCard({ imageName, imageSrc, download }) {
  useEffect(() => {
    const button = document.getElementById(imageName)
    button.addEventListener("click", () => {
      download(imageName)
      window.gtag("event", "download", {
        event_category: "download",
        event_label: imageName,
      })
    })
  }, [download, imageName])

  return (
    <div className="image-container">
        <LazyImage src={imageSrc} alt="" />
        <button className="download-btn" id={imageName}>Scarica</button>
    </div>
  )
}
