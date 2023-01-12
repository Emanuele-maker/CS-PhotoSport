import LazyImage from "../LazyImage"
import "./PhotoCard.scss"
import { FaHeart, FaRegHeart, FaComment, FaRegComment } from "react-icons/fa"

export default function PhotoCard({ preview, category_name, album_name, imageName }) {
  return (
      <div className="photo-container">
          <div className="photo-container-image" onClick={() => window.open(`/${category_name}/album/${album_name}/${imageName}`)}>
            <LazyImage src={preview} />
          </div>
      </div>
  )
}
