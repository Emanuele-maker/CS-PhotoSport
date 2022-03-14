import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import "./Contact.scss"
import { AiOutlineMail } from "react-icons/ai"
import { BsTools } from "react-icons/bs"

export default function Contact({ sessionId }) {
    useEffect(() => {
        document.title = "CS PhotoSport"
    }, [])

  return (
    <div className="contact-content">
        <Heading>Contatti</Heading>
        <div className="email-contact">
          <AiOutlineMail className="email-icon" size="1.8rem" color="white" />
          <h2><a href="mailto: postmaster@csphotosport.com">postmaster@csphotosport.com</a></h2>
        </div>
        <div className="credits">
          <h2>Webmaster: Emanuele Salvadori</h2>
        </div>
        <div className="support-tools">
          <div className="support-tools-header">
            <BsTools color="white" size="1.8rem" />
            <h2>Strumenti di supporto:</h2>
          </div>
          <h3>ID di sessione: { sessionId }</h3>
        </div>
    </div>
  )
}
