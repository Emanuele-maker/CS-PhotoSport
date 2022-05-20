import LazyImage from "../LazyImage"
import "./FreePhotoCard.scss"
import { useNavigate } from "react-router-dom"

export default function FreePhotoCard({ preview, category_name, album_name, imageName }) {
  const navigate = useNavigate()

  const downloadImage = (imageSrc) => {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = imageName
    link.setAttribute("class", "download-link")
    link.setAttribute("id", imageName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
      <>
        <div className="photo-container">
        <div className="photo-container-image" onClick={() => navigate(`/${category_name}/album/${album_name}/${imageName}`)}>
          <LazyImage src={preview} />
        </div>
          <button className="download" onClick={() => downloadImage(preview.replace("previews", "img"))}>Scarica</button>
        </div>
      </>
  )
}
