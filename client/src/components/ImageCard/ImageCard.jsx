import LazyImage from "../LazyImage"
import "./ImageCard.scss"

export default function ImageCard({ imageName, imageSrc, download }) {

  return (
    <div className="image-container">
        <LazyImage src={imageSrc} alt="" />
        <button className="download-btn" onClick={() => {
          download(imageName)
          window.gtag("event", "download", {
            event_category: "download",
            event_label: imageName,
          })
        }}>Scarica l'originale</button>
    </div>
  )
}
