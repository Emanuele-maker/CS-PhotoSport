import { useEffect, useState } from "react"
import SearchBar from "../../components/SearchBar/SearchBar"
import Guess from "./Guess/Guess"
import "./Guesser.scss"
import playersData from "./players-data.json"

const Guesser = () => {
  const [guesses, setGuesses] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)

  const correctGuess = {
    name: "GERGO ZALANKI",
    age: 28,
    nationality: "Ungheria",
    club: "Pro Recco",
    role: "Attaccante"
  }

  const playerNames = playersData.map(player => {
    return player.name
  })

  useEffect(() => {
    const date = new Date()
    const today = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    if (localStorage.getItem("correctDate") === today) setIsCorrect(true)
  }, [])

  return (
    <div className="guesser-container">
      <main>
        <h1>Waterpolo</h1>
        <h1>Guesser</h1>
        <h2>Indovina il pallanuotista del giorno</h2>
        <SearchBar disabled={isCorrect} dropDownContent={playerNames} onSelectQuery={query => setGuesses([...guesses, query])} notUseSearchIcon={true} onChange={() => {}} placeholder="Indovina il nome del giocatore..." width="30rem" />
        <div className="guess-table-grid" style={{ gridTemplateRows: `repeat(${guesses.length}, 1fr)` }}>
          <div className="table-child label">Nome</div>
          <div className="table-child label">Nazionalità</div>
          <div className="table-child label">Età</div>
          <div className="table-child label">Club</div>
          <div className="table-child label">Ruolo</div>
          {
            guesses.map(guess => (
              <Guess correctGuess={correctGuess} setIsCorrect={setIsCorrect} name={guess} />
            ))
          }
        </div>
      { isCorrect && <>
        <h2>HAI INDOVINATO! (<span style={{ color: "#147549" }}>{ correctGuess.name }</span>)</h2>
        <h3 style={{ margin: 0 }}>Torna domani per il prossimo pallanuotista!</h3>
      </> }
      </main>
    </div>
  )
}

export default Guesser