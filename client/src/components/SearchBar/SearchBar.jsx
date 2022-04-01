import { AiOutlineSearch } from "react-icons/ai"
import "./SearchBar.scss"

export default function SearchBar({ onChange, placeholder, width }) {
  return (
    <div className="search">
        <AiOutlineSearch color="white" size="2.2rem" />
        <input type="text" className="search-bar" placeholder={placeholder} onInput={onChange} height="2rem" style={{ width: width }} />
    </div>
  )
}

// set default props for SearchBar
SearchBar.defaultProps = {
  placeholder: "Inserisci il nome dell'album da cercare...",
  width: "20rem"
}