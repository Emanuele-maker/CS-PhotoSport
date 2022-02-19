import "./CartItem.scss"
import ImCross from "../ImCross.svg"

export default function CartItem({ item, onRemove }) {
  return (
    <div className="item" key={item.index}>
        <img src={ImCross} className="cross-icon" />
        <img onClick={() => onRemove(item)} className="preview" src={require(`../../previews/${item.album}/${item.fileName}`)} />
        <h3>{ item.fileName }</h3>
        <h2>€3.00</h2>
    </div>
  )
}