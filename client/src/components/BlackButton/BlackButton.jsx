import "./BlackButton.scss"

const BlackButton = ({ icon, onClick, text, width, height }) => {
  return (
    <button style={{ width, height }} className="black-btn" onClick={onClick}>
        { icon && icon }
        <span>{ text }</span>
    </button>
  )
}

export default BlackButton