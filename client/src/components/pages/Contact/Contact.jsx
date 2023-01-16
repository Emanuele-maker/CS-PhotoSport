import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import "./Contact.scss"
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail} from "react-icons/ai"
import playstorelogo from "../../../playstore.png"

export default function Contact() {
    useEffect(() => {
        document.title = "CS PhotoSport: social"
    }, [])

  return (
    <div className="social-content">
        <Heading backUrl={-1}>Social</Heading>
        <div className="credits">
            <h2>Webmaster: Emanuele Salvadori</h2>
        </div>
        <div className="buttons-container">
            <a target="_blank" href="mailto:cristian.salvadori@gmail.com" className="social-button email-button">
                <AiOutlineMail size="2.2rem" />
                <span>Email</span>
            </a>
            <a target="_blank" href="https://www.instagram.com/cs_photosport/" className="social-button instagram-button">
                <AiOutlineInstagram size="2.2rem" />
                <span>Instagram</span>
            </a>
            <a target="_blank" href="https://www.facebook.com/cristianphotosport/" className="social-button facebook-button">
                <AiOutlineFacebook size="2.2rem" />
                <span>Facebook</span>
            </a>
        </div>
        <div className="download-app">
            <h2>Scarica l'app!</h2>
            <a href="https://play.google.com/store/apps/details?id=com.manudev.csphotosport&pli=1">
                <img src={playstorelogo} alt="play store link" />
            </a>
        </div>
    </div>
  )
}
