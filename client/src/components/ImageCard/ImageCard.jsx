import LazyImage from "../LazyImage"
import "./ImageCard.scss"

export default function ImageCard({ imageName, imageSrc, download }) {
  return (
    <div className="image-container">
        <LazyImage src={imageSrc} alt="" />
        <button className="download-btn" onClick={() => download(imageName)}>Scarica</button>
    </div>
  )
}
