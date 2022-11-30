import LazyImage from "../LazyImage"
import "./PhotoCard.scss"
import { useNavigate } from "react-router-dom"

export default function PhotoCard({ preview, category_name, album_name, imageName, reference }) {
  const navigate = useNavigate()

  return (
      <div className="photo-container" ref={reference}>
          <div className="photo-container-image" onClick={() => window.open(`/${category_name}/album/${album_name}/${imageName}`)}>
            <LazyImage src={preview} onDrag={() => {}} />
          </div>
      </div>
  )
}
