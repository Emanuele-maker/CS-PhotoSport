import { useEffect } from "react"
import CategoryCard from "../CategoryCard/CategoryCard"
import "./CategoryList.scss"

export default function CategoryList({ categories }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="grid categories-container">
                { categories.map((category, categoryIndex) => {
                    return (<CategoryCard key={categoryIndex} category={category} isSub={false} />)
                }) }
            </div>
        </>
    )
}