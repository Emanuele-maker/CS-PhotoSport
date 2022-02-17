import "./Cart.scss"
import { useState } from "react"
import CartItem from "../../CartItem/CartItem"

export default function Cart({ cartItems, onRemoveItem, sessionId }) {
    const [statefulItems, setStatefulItems] = useState(cartItems)

    async function goToCheckout() {
        await fetch(`/checkout/${sessionId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              items: statefulItems,
            }),
        })
        .then(res => {
          return res.json()
        })
        .then(({ url }) => {
          window.location = url
        })
    }

  return (
      <div className="cart-content">
          {
            cartItems && cartItems.length > 0 ?
            statefulItems.map(item => {
                return <CartItem key={item.index} item={item} onRemove={(item) => setStatefulItems(onRemoveItem(item))} />
            })
            :
            <h2>Nessun elemento ancora aggiunto al carrello</h2>
          }
          {
            cartItems && cartItems.length > 0 && <button onClick={goToCheckout}>Procedi al checkout</button>
          }
      </div>
  )
}
