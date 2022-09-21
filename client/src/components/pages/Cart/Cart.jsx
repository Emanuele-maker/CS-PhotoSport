import "./Cart.scss"
import { useState, useEffect } from "react"
import CartItem from "../../CartItem/CartItem"
import Heading from "../../Heading/Heading"
import { siteRoute } from "../../../staticInfo"

const getTotalPrice = (items, basePrice, categories) => {
  let totalPrice = 0
  items.forEach(item => {
    const clientAlbum = categories.find(category => category.title === item.category)?.albums.find(album => album.title === item.album)
    if (clientAlbum && clientAlbum.priceInCents) totalPrice += clientAlbum.priceInCents
    else totalPrice += basePrice
  })
  return totalPrice
}

export default function Cart({ cartItems, onRemoveItem, sessionId, categories }) {
    const [statefulItems, setStatefulItems] = useState(cartItems || JSON.parse(localStorage.getItem("cartImages")))
    const basePrice = 300

    async function goToCheckout() {
        await fetch(`${siteRoute}/api/checkout/${sessionId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              items: statefulItems,
              totalPrice: getTotalPrice(statefulItems, basePrice, categories)
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

  const getPrice = (quantity, price) => {
    const discount = 1 / 10
    const limit = 5
    if (quantity < limit) return price
    else return Math.round((price) - (price * discount))
  }

    useEffect(() => {
      document.title = "CS PhotoSport: Carrello"
      window.scrollTo(0, 0)
    }, [])

    return (
        <div className="cart">
          {/* <h2>
            SCONTO: Per ogni 10 foto che acquisti viene attribuito un 10% di sconto al prezzo totale
            <br />
            Prezzo di base: €3.50
            <br />
            10 foto: €32
            <br />
            20 foto: €63
            <br />
            continuando per tutti i multipli di 10
          </h2> */}
          <Heading backUrl={-1}>Carrello</Heading>
          <h2 className="sub-title discount-explain">Ogni <span className="highlighted">5 Foto</span> verrà applicato un <span className="highlighted">10% di sconto</span></h2>
          <div className="cart-content">
            {
              cartItems && cartItems.length > 0 ?
              statefulItems.map((item, itemIndex) => {
                if (itemIndex === statefulItems.length - 1) return <><CartItem key={item.index} item={item} onRemove={(item) => setStatefulItems(onRemoveItem(item))} /><div className="total">Totale: €{ parseFloat(getPrice(statefulItems.length, getTotalPrice(statefulItems, basePrice, categories) / 100)).toFixed(2) }</div></>
                return <CartItem key={item.fileName} item={item} onRemove={(item) => setStatefulItems(onRemoveItem(item))} />
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
