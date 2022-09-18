import { useEffect } from "react"
import CategoryCard from "../CategoryCard/CategoryCard"
import "./CategoryList.scss"

export default function CategoryList({ categories }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const publicCategories = categories.filter(category => {
        return !category.isPrivate
    })

    return (
        <div className="grid-container">
            <div className="grid list-container">
                { publicCategories.map((category, categoryIndex) => {
                    return (
                        <CategoryCard key={categoryIndex} category={category} isSub={false} />
                    )
                }) }
            </div>
        </div>
    )
}