import { AiOutlineSearch } from "react-icons/ai"
import "./SearchBar.scss"

export default function SearchBar({ onChange }) {
  return (
    <div className="search">
        <AiOutlineSearch color="white" size="2.2rem" />
        <input type="text" className="search-bar" placeholder="Inserisci il nome dell'album da cercare..." onInput={onChange} height="2rem" />
    </div>
  )
}
