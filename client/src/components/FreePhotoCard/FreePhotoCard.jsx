import LazyImage from "../LazyImage"
import "./FreePhotoCard.scss"

export default function FreePhotoCard({ preview, imageName }) {
  function downloadImage(imageSrc) {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = "CS PhotoSport"
    link.setAttribute("class", "download-link")
    link.setAttribute("id", imageName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
      <>
        <div className="photo-container">
          <LazyImage src={preview} />
          <button className="download" onClick={() => downloadImage(preview.replace("previews", "img"))}>Scarica</button>
        </div>
      </>
  )
}
