import "./CartItem.scss"
import ImCross from "../ImCross.svg"

export default function CartItem({ item, onRemove }) {
  return (
    <div className="item" key={item.index}>
        <img onClick={() => onRemove(item)} src={ImCross} className="cross-icon" alt="" />
        <img className="preview" src={require(`../../previews/${item.category}/${item.album}/${item.fileName}`)} alt="" />
        <h3>{ item.fileName }</h3>
    </div>
  )
}