import LazyImage from "../LazyImage"
import "./PhotoCard.scss"
import { useNavigate } from "react-router-dom"

export default function PhotoCard({ preview, onAddToCart, addedToCart, category_name, album_name, imageName }) {
  const navigate = useNavigate()

  return (
      <div className="photo-container" id={imageName}>
          <div className="photo-container-image" onClick={() => navigate(`/${category_name}/album/${album_name}/${imageName}`)}>
            <LazyImage src={preview} onDrag={() => {}} />
          </div>
          {/* {
            addedToCart 
            ?
            <button className="added-to-cart">Elemento aggiunto al carrello</button>
            :
            <button className="add-to-cart" onClick={onAddToCart}>Aggiungi al carrello</button>
          } */}
      </div>
  )
}
