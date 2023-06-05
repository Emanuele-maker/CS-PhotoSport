import { Link } from "react-router-dom"
import "./Card.scss"
import Fade from "react-reveal/Fade"
import LazyImage from "../LazyImage"

const Card = ({ title, cover, href }) => {
  return (
    <Fade big delay={1000} duration={500} width="100%">
        <Link className="card-container" to={href}>
            <div className="image-holder">
                <LazyImage src={cover} alt="Cover dell'album" />
            </div>
            <h4>{title}</h4>
        </Link>
    </Fade>
  )
}

export default Card