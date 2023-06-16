import { AiOutlineSearch } from "react-icons/ai"
import "./SearchBar.scss"
import SearchDropDown from "../SearchDropDown/SearchDropDown"
import { useRef, useState } from "react"

export default function SearchBar({ disabled, onChange, customButton, placeholder, width, notUseSearchIcon, type, dropDownContent, onSelectQuery }) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef()

  return (
    <div className="search-container">
        <div className="search-bar-container">
            { !notUseSearchIcon && <AiOutlineSearch color="white" size="3rem" /> }
            <input disabled={disabled} ref={inputRef} type={type} placeholder={placeholder} onInput={event => {
              onChange(event)
              setInputValue(event.currentTarget.value)
            }} height="2rem" style={{ width: width }} />
        { customButton && customButton }
      </div>
      {
        dropDownContent && <SearchDropDown show={inputValue.length > 2} inputValue={inputValue} width="30rem" content={dropDownContent} onSelectQuery={query => {
          onSelectQuery(query)
          inputRef.current.value = ""
          setInputValue("")
        }} />
      }
    </div>
  )
}

SearchBar.defaultProps = {
  placeholder: "Inserisci il nome dell'album da cercare...",
  width: "100%",
  type: "text"
}