import CategoryList from "../../CategoryList/CategoryList"
import Heading from "../../Heading/Heading"
import "./Home.scss"
import { useEffect } from "react"
// import AdComponent from "../../AdComponent"

export default function Home({ categories }) {
    useEffect(() => {
        document.title = "CS PhotoSport: Home"
    }, [])

    return (
        <div className="home-container">
            {/* <AdComponent /> */}
            <Heading>HOME</Heading>
            <CategoryList categories={categories} />
        </div>
    )
}