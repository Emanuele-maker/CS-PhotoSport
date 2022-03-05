import SubCategoryCard from "../SubCategoryCard/SubCategoryCard"
import Heading from "../Heading/Heading"
import "./SubCategoryList.scss"
import { useParams } from "react-router-dom"

export default function SubCategoryList({ categories, generalCategories }) {
    const { category_name } = useParams()

    return (
        <>
            <Heading>{category_name}</Heading>
            <div className="grid categories-container">
                { categories.map((category, categoryIndex) => {
                    return (<SubCategoryCard key={categoryIndex} category={generalCategories.find(c => c.title === category_name)} subCategory={category} />)
                }) }
            </div>
        </>
    )
}