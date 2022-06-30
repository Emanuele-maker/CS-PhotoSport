import "./Heading.scss"
import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

export default function Heading({ children }) {
    const navigate = useNavigate()

    return (
        <div className="heading-container">
            <BiArrowBack className="back-button" color="white" size="3.5rem" onClick={() => navigate(-1)} />
            <h1 className="heading">{ children }</h1>
        </div>
    )
}