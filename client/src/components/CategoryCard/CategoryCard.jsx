import "./CategoryCard.scss"
import { Link } from "react-router-dom"
import LazyImage from "../LazyImage"
import formatURL from "../../formatURL"

export default function CategoryCard({ category }) {
    return (
        <Link className="card-container" to={`/${formatURL(category.title)}`}>
            <div className="image-holder">
                <LazyImage src={ category.cover } alt="Cover dell'album" />
            </div>
            {/* <div className="image-holder" style={{ backgroundImage: `url("${category.cover}")` }}></div> */}
            <h4>{ category.title }</h4>
        </Link>
    )
}