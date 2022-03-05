import "./SubCategoryCard.scss"
import { useNavigate } from "react-router-dom"

export default function CategoryCard({ category, subCategory }) {
    const navigate = useNavigate()

    return (
        <div className="category-container" onClick={() => {
            navigate(`/${category.title}/${subCategory.title}`)
        }}>
        <img src={ subCategory.cover } alt="Cover dell'album" />
        <h4>{ subCategory.title }</h4>
        </div>
    )
}