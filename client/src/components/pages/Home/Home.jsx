import CategoryList from "../../CategoryList/CategoryList"
import "./Home.scss"
import { useEffect } from "react"
import SiteLogo from "../../SiteLogo/SiteLogo"
import { useNavigate } from "react-router-dom"
import Zoom from "react-reveal/Zoom"
import Ad from "../../Ad/Ad"
import { FaWallet } from "react-icons/fa"

export default function Home({ categories }) {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "CS PhotoSport: Home"
    }, [])

    return (
        <div className="home-container">
            {/* <Ad /> */}
            <SiteLogo />
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <Zoom big delay={1550}>
                    <button style={{ margin: ".3rem" }} onClick={() => window.open("https://donate.stripe.com/cN203Ycfkg1f6xW3cc")} className="donate-button donate-home-button">
                        <FaWallet size="1rem" color="white" />Dona
                    </button>
                </Zoom>
            </div>
            <CategoryList categories={categories} />
        </div>
    )
}