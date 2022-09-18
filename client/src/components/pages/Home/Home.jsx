import CategoryList from "../../CategoryList/CategoryList"
import "./Home.scss"
import { useEffect } from "react"
import SiteLogo from "../../SiteLogo/SiteLogo"
import { useNavigate } from "react-router-dom"
import Zoom from "react-reveal/Zoom"

export default function Home({ categories }) {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "CS PhotoSport: Home"
    }, [])

    return (
        <div className="home-container">
            <SiteLogo />
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <Zoom big delay={1550}>
                    <button style={{ margin: ".3rem" }} onClick={() => navigate("/profilo")} className="register-button register-home-button">Registrati</button>
                </Zoom>
            </div>
            <CategoryList categories={categories} />
        </div>
    )
}