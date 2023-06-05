import LazyImage from "../LazyImage"
import "./PhotoCard.scss"

export default function PhotoCard({ preview, category_name, sub_category_name, album_name, imageName }) {
  return (
      <div className="photo-container">
          <div className="photo-container-image" onClick={() => window.open(`/${category_name}${sub_category_name ? `/${sub_category_name}` : ""}/album/${album_name}/${imageName}`)}>
            <LazyImage src={preview} />
          </div>
      </div>
  )
}
