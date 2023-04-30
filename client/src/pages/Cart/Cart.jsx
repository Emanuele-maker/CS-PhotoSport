import "./Cart.scss"
import { useState, useEffect } from "react"
import CartItem from "../../components/CartItem/CartItem"
import Heading from "../../components/Heading/Heading"
import { siteRoute } from "../../staticInfo"
import DiscountPopup from "../../components/DiscountPopup/DiscountPopup"
import getPrice from "../../getTotalPrice"

export default function Cart({ cartItems, onRemoveItem, sessionId, categories }) {
    const [statefulItems, setStatefulItems] = useState(cartItems || JSON.parse(localStorage.getItem("cartImages")))
    const [isDiscountPopupOpened, setIsDiscountPopupOpened] = useState(!localStorage.getItem("discountPopupOpened"))
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
              totalPrice: getPrice(statefulItems.length)
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

    useEffect(() => {
      if (isDiscountPopupOpened && !localStorage.getItem("discountPopupOpened")) localStorage.setItem("true")
      document.title = "CS PhotoSport: Carrello"
      window.scrollTo(0, 0)
    }, [])

    return (
        <div className="cart">
          {
            isDiscountPopupOpened && 
            <>
              <div className="obfuscator visible"></div>
              <DiscountPopup setIsPopupVisible={setIsDiscountPopupOpened} />
            </>
          }
          <Heading backUrl={-1}>Carrello</Heading>
          <div className="news-btn-container">
            <button className="discount-btn" onClick={() => setIsDiscountPopupOpened(true)}>
              <h2>OFFERTA SPECIALE</h2>
              <span>vedi i dettagli</span>
            </button>
          </div>
          <div className="cart-content">
            {
              cartItems && cartItems.length > 0 ?
              statefulItems.map((item, itemIndex) => {
                if (itemIndex === statefulItems.length - 1) return <><CartItem key={item.index} item={item} onRemove={(item) => setStatefulItems(onRemoveItem(item))} /><div className="total">Totale: €{ parseFloat(getPrice(statefulItems.length) / 100).toFixed(2) }</div></>
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