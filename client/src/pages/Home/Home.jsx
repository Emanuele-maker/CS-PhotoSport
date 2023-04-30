import CategoryList from "../../components/CategoryList/CategoryList"
import "./Home.scss"
import { useEffect } from "react"
import SiteLogo from "../../components/SiteLogo/SiteLogo"
import { useNavigate } from "react-router-dom"
import Zoom from "react-reveal/Zoom"
import Fade from "react-reveal/Fade"
import { FaWallet } from "react-icons/fa"
import playstorelogo from "../../assets/playstore.png"

export default function Home({ categories }) {
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "CS PhotoSport: Home"
    }, [])

    return (
        <div className="home-container">
            <SiteLogo />
            <Fade delay={1500} duration={500} width="100%">
                <div className="download-app">
                    <h2>Scarica la nuova app!</h2>
                    <a href="https://play.google.com/store/apps/details?id=com.manudev.csphotosport&pli=1">
                        <img src={playstorelogo} alt="play store link"/>
                    </a>
                </div>
            </Fade>
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <Zoom big delay={2000}>
                    <button style={{ margin: ".3rem" }} onClick={() => window.open("https://donate.stripe.com/cN203Ycfkg1f6xW3cc")} className="donate-button donate-home-button">
                        <FaWallet size="1rem" color="white" />Dona
                    </button>
                </Zoom>
            </div>
            <CategoryList categories={categories} />
        </div>
    )
}