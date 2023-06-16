import "./SearchDropDown.scss"

const SearchDropDown = ({ inputValue, show, content, width, onSelectQuery }) => {
    return (
        <div className="search-drop-down" style={{ display: show ? "flex" : "none", width }}>
            <ul>
                {
                    content.filter(text => text.toLowerCase().includes(inputValue.trim().toLowerCase())).length > 0 ? content.filter(text => text.toLowerCase().includes(inputValue.trim().toLowerCase())).map(text => {
                        return <li onClick={() => onSelectQuery(text)}>{ text }</li>
                    }) : <h3>Nessun giocatore trovato...</h3>
                }
            </ul>
        </div>
    )
}

export default SearchDropDown