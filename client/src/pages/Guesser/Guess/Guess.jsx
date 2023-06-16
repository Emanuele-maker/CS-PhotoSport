import "./Guess.scss"
import { BsArrowUp, BsArrowDown } from "react-icons/bs"
import playersData from "../players-data.json"

const Guess = ({ name, setIsCorrect, correctGuess }) => {
  const guess = playersData.find(player => player.name === name)

  if (correctGuess.name === guess.name) {
    const date = new Date()
    const today = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
    localStorage.setItem("correctDate", today)
    setIsCorrect(true)
  }

  return (
    <>
      <div className={`table-child ${correctGuess.name === guess.name ? "correct" : "incorrect"}`}>{ guess.name }</div>
      <div className={`table-child ${correctGuess.nationality === guess.nationality ? "correct" : "incorrect"}`}>{ guess.nationality }</div>
      <div className={`table-child ${correctGuess.age === guess.age ? "correct" : "close"}`}>
        { correctGuess.age > guess.age && <BsArrowUp size="15px" color="#F0F0F0" /> }
        { correctGuess.age < guess.age && <BsArrowDown size="15px" color="#F0F0F0" /> }
        { guess.age }
      </div>
      <div className={`table-child ${correctGuess.club === guess.club ? "correct" : "incorrect"}`}>{ guess.club }</div>
      <div className={`table-child ${correctGuess.role === guess.role ? "correct" : "incorrect"}`}>{ guess.role }</div>
    </>
  )
}

export default Guess