import "./CategoryCard.scss"
import { useNavigate } from "react-router-dom"
import LazyImage from "../LazyImage"

export default function CategoryCard({ category }) {
    const navigate = useNavigate()

    return (
        <div className="category-container" onClick={() => {
            navigate(`/${category.title}`)
        }}>
        <LazyImage src={ category.cover } alt="Cover dell'album" />
        <h4>{ category.title }</h4>
        </div>
    )
}