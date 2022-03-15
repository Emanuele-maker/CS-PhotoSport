import "./Cart.scss"
import { useState, useEffect } from "react"
import CartItem from "../../CartItem/CartItem"
import Heading from "../../Heading/Heading"
import { siteRoute } from "../../../staticInfo"

export default function Cart({ cartItems, onRemoveItem, sessionId }) {
    const [statefulItems, setStatefulItems] = useState(cartItems)

    async function goToCheckout() {
        await fetch(`${siteRoute}/api/checkout/${sessionId}`, {
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
          if (res.ok) return res.json()
          else console.error(res)
        })
        .then(({ url }) => {
          localStorage.setItem("downloaded", "false")
          window.location = url
        })
    }

  const getPrice = (quantity) => {
      const basePrice = 3.5
      const discount = 1 / 10
      const limit = 10
      if (quantity < limit) return basePrice * quantity
      else return Math.round((basePrice * quantity) - (basePrice * quantity * discount))
  }

    useEffect(() => {
      document.title = "CS PhotoSport: Carrello"
    }, [])

    return (
        <div className="cart">
          <h2>
            SCONTO: Per ogni 10 foto che acquisti viene attribuito un 10% di sconto al prezzo totale
            <br />
            Prezzo di base: €3.50
            <br />
            10 foto: €32
            <br />
            20 foto: €63
            <br />
            continuando per tutti i multipli di 10
          </h2>
          <Heading>Carrello</Heading>
          <div className="cart-content">
            {
              cartItems && cartItems.length > 0 ?
              statefulItems.map((item, itemIndex) => {
                if (itemIndex === statefulItems.length - 1) return <><CartItem key={item.index} item={item} onRemove={(item) => setStatefulItems(onRemoveItem(item))} /><div className="total">Totale: €{ getPrice(statefulItems.length) }</div></>
                return <CartItem key={item.index} item={item} onRemove={(item) => setStatefulItems(onRemoveItem(item))} />
              })
              :
              <h2>Nessun elemento ancora aggiunto al carrello</h2>
            }
            {
              cartItems && cartItems.length > 0 && <button onClick={goToCheckout}>Procedi al checkout</button>
            }
        </div>
      </div>
    )
}
