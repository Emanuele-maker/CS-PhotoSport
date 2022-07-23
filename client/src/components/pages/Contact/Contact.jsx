import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import "./Contact.scss"
import BsTools from "./BsTools.svg"
import AiOutlineMail from "./AiOutlineMail.svg"

export default function Contact({ sessionId }) {
    useEffect(() => {
        document.title = "CS PhotoSport"
    }, [])

  return (
    <div className="contact-content">
        <Heading backUrl={-1}>Contatti</Heading>
        <div className="email-contact">
          <img src={AiOutlineMail} className="email-icon" alt="icon email" />
          <h2><a href="mailto: postmaster@csphotosport.com">postmaster@csphotosport.com</a></h2>
        </div>
        <div className="credits">
          <h2>Webmaster: Emanuele Salvadori</h2>
        </div>
        <div className="support-tools">
          <div className="support-tools-header">
            <img src={BsTools} />
            <h2>Strumenti di supporto:</h2>
          </div>
          <h3>ID di sessione: { sessionId }</h3>
        </div>
    </div>
  )
}
