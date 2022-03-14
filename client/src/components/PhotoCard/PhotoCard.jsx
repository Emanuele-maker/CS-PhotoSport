import LazyImage from "../LazyImage"
import "./PhotoCard.scss"

export default function PhotoCard({ preview, onAddToCart, addedToCart }) {
  return (
      <div className="photo-container">
          <LazyImage src={preview} />
          { 
            addedToCart 
            ?
            <button className="added-to-cart">Elemento aggiunto al carrello</button>
            :
            <button className="add-to-cart" onClick={onAddToCart}>Aggiungi al carrello</button>
          }
      </div>
  )
}
