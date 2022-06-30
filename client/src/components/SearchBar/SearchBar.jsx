import { AiOutlineSearch } from "react-icons/ai"
import "./SearchBar.scss"

export default function SearchBar({ onChange, placeholder, width, notUseSearchIcon, type }) {
  return (
    <div className="search-bar-container">
        { !notUseSearchIcon && <AiOutlineSearch color="white" size="3rem" /> }
        <input type={type} placeholder={placeholder} onInput={onChange} height="2rem" style={{ width: width }} />
    </div>
  )
}

// set default props for SearchBar
SearchBar.defaultProps = {
  placeholder: "Inserisci il nome dell'album da cercare...",
  width: "100%",
  type: "text"
}