import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import "./Contact.scss"

export default function Contact({ sessionId }) {
    useEffect(() => {
        document.title = "CS PhotoSport"
    }, [])

  return (
    <div className="contact-content">
        <Heading>Contatti</Heading>
        <h2>Per informazioni o supporto, puoi contattarci attraverso la seguente mail: <a href="mailto: postmaster@csphotosport.com">postmaster@csphotosport.com</a></h2>
        <h2>Strumenti di supporto:</h2>
        <h3>ID di sessione: { sessionId }</h3>
    </div>
  )
}
