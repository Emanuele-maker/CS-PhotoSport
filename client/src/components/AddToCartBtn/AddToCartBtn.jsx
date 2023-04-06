import { FaShoppingCart } from "react-icons/fa"
import "./AddToCartBtn.scss"

const AddToCartBtn = ({ onClick, addedToCart }) => {
  return (
    <>
        {
            addedToCart ?
            <button className="added-to-cart">Elemento aggiunto al carrello</button>
            :
            <button className="add-to-cart" onClick={() => onClick()}><FaShoppingCart size="1.5rem" />Aggiungi al carrello</button>
        }
    </>
  )
}

export default AddToCartBtn