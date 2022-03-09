import "./CartItem.scss"
import ImCross from "../ImCross.svg"

const siteRoute = process.env.NODE_ENV === "production" ? "http://csphotosport.com" : ""
const staticRoute = `${siteRoute}/build`

export default function CartItem({ item, onRemove }) {
  return (
    <div className="item" key={item.index}>
        <img onClick={() => onRemove(item)} src={ImCross} className="cross-icon" alt="" />
        <img className="preview" src={`${staticRoute}/previews/${item.category}/${item.album}/${item.fileName}`} alt="" />
        <h3>{ item.fileName }</h3>
    </div>
  )
}