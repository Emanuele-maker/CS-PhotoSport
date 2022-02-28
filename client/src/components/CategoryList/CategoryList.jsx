import CategoryCard from "../CategoryCard/CategoryCard"
import "./CategoryList.scss"

export default function CategoryList({ categories }) {
    return (
        <div className="grid categories-container">
            { categories.map((category, categoryIndex) => {
                return (<CategoryCard key={categoryIndex} category={category} />)
            }) }
        </div>
    )
}