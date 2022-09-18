import "./CategoryCard.scss"
import { Link } from "react-router-dom"
import LazyImage from "../LazyImage"
import formatURL from "../../formatURL"
import Fade from "react-reveal/Fade"

export default function CategoryCard({ category }) {
    return (
        <Fade big delay={1000} duration={500} width="100%">
            <Link className="card-container" to={`/${formatURL(category.title)}`}>
                <div className="image-holder">
                    <LazyImage src={ category.cover } alt="Cover dell'album" />
                </div>
                {/* <div className="image-holder" style={{ backgroundImage: `url("${category.cover}")` }}></div> */}
                <h4>{ category.title }</h4>
            </Link>
        </Fade>
    )
}