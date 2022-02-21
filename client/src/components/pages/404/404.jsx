import { Link } from "react-router-dom"
import "./404.scss"

export default function NotFound() {
  return (
    <div className="not-found">
        <h1>La pagina che stai cercando non esiste...</h1>
        <Link to="/">Torna alla home</Link>
    </div>
  )
}
