import "./Cart.scss"
import { ImCross } from "react-icons/im"
import { useState } from "react"

export default function Cart({ cartElements, onRemoveItem, sessionId }) {
    const [statefulItems, setStatefulItems] = useState(cartElements)

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
      <div className="content">
          {
            cartElements && cartElements.length > 0 ?
            statefulItems.map(element => {
                return (
                    <div className="element" key={element.index}>
                        <ImCross size="1.5rem" className="cross-icon" onClick={() => {
                            setStatefulItems(onRemoveItem(element))
                        }} />
                        <img src={element.previewSrc} />
                        <h3>{ element.filename }</h3>
                        <h2>€3.00</h2>
                    </div>
                )
            })
            :
            <h2>Nessun elemento ancora aggiunto al carrello</h2>
          }
          {
            cartElements && cartElements.length > 0 && <button onClick={goToCheckout}>Procedi al checkout</button>
          }
      </div>
  )
}
