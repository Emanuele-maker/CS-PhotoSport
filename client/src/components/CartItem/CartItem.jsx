import "./CartItem.scss"
import { ImCross } from "react-icons/im"

export default function CartItem({ item, onRemove }) {
  return (
    <div className="item" key={item.index}>
        <ImCross size="1.5rem" className="cross-icon" onClick={() => onRemove(item)} />
        <img src={require(`../../previews/${item.album}/${item.fileName}`)} />
        <h3>{ item.fileName }</h3>
        <h2>€3.00</h2>
    </div>
  )
}
