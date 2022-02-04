import "./PhotoCard.scss"

export default function PhotoCard({ preview, onAddToCart, addedToCart }) {
  return (
      <div className="photo-container">
          <img src={preview} />
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
