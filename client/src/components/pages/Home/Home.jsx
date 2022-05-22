import CategoryList from "../../CategoryList/CategoryList"
import "./Home.scss"
import { useEffect } from "react"
import SiteLogo from "../../SiteLogo/SiteLogo"

export default function Home({ categories }) {
    useEffect(() => {
        document.title = "CS PhotoSport: Home"
    }, [])

    return (
        <div className="home-container">
            <SiteLogo />
            <CategoryList categories={categories} />
        </div>
    )
}