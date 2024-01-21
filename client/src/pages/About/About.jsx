import "./About.scss"
import Fade from 'react-reveal/Fade'
import Zoom from "react-reveal/Zoom"
import SiteLogo from "../../components/SiteLogo/SiteLogo"
import AboutContainer from "../../components/AboutContainer/AboutContainer"
import { previewsRoute, coverRoute } from "../../staticInfo"
import { useEffect } from "react"

const About = () => {
    const animDuration = 800

    useEffect(() => {
        document.title = "CS PhotoSport: About"
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="about-page">
            <SiteLogo />
            <h2 className="about-page-sub-title">
                <Fade big cascade delay={animDuration - 100} duration={animDuration}>
                    <span>Un blog fotografico di eventi sportivi</span>
                </Fade>
            </h2>
            <h3>
                <Zoom big cascade delay={animDuration * 2 - 150} duration={animDuration}>
                    <span>LA NOSTRA PASSIONE: LO SPORT</span>
                </Zoom>
            </h3>
            <AboutContainer animDuration={animDuration} animDelay={animDuration * 2 - 150} imageSrc={`${previewsRoute}/Running/Vivicittà Latina 2022/1 2 6.jpg`} imageAlt="Running" title="RUNNING" href="/running" paragraph="Gare su strada a tutti i livelli" justify="left" bgColor="lightblue" />
            <AboutContainer animDuration={animDuration} animDelay={animDuration * 2 - 150} imageSrc={`${previewsRoute}/Kite, Windsurf & Wingfoil/Fogliano 20 Maggio 2022/IMG_4154.jpg`} imageAlt="Kite & WindSurf" title="KITE & WINDSURF" href="/kite,-windsurf-&-wingfoil" paragraph="" justify="right" bgColor="#fff993" />
            <AboutContainer animDuration={animDuration} animDelay={100} imageSrc={`${previewsRoute}/Pallanuoto/A2 Maschile/Castelli Romani vs CN Latina/IMG_9386.jpg`} imageAlt="Pallanuoto" title="PALLANUOTO" href="/pallanuoto" paragraph="Partite di livello giovanile e professionale" justify="left" bgColor="#ff8e8e" />
            <AboutContainer animDuration={animDuration} animDelay={100} imageSrc={`${previewsRoute}/Triathlon/The Green Race/Ciclismo/IMG_0723.jpg`} imageAlt="Triathlon" title="TRIATHLON" href="/triathlon" paragraph="Competizioni regionali e nazionali" justify="right" bgColor="#9ffcc9" />
            <AboutContainer animDuration={animDuration} animDelay={100} imageSrc={`${coverRoute}/Cover FIPAV 27.3.2022.jpg`} imageAlt="Beach Volley" title="BEACH VOLLEY" href="/beachvolley" paragraph="Tornei amatoriali e professionali" justify="left" bgColor="#f7d7a0" />
        </div>
    )
}

export default About