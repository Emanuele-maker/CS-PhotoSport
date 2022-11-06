import "./PrivacyPolicy.scss"
import Heading from "../../Heading/Heading"

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy">
            <Heading backUrl={-1}>PRIVACY POLICY</Heading>
            <ul>
                <li>
                    <h3>Trattamento dei dati</h3>
                    <p>
                        La nostra app tiene conto del numero degli utenti attraverso un identificatore usato per tener traccia di ogni
                        dispositivo che acceda al sito/app e che acquisti e/o scarichi fotografie. Non raccogliamo alcun dato personale dei singoli utenti
                        sui nostri server.
                    </p>
                </li>
                <li>
                    <h3>Pubblicità</h3>
                    <p>
                        La nostra app non mostra annunci.
                    </p>
                </li>
                <li>
                    <h3>è possibile richiedere l'eliminazione dei miei dati?</h3>
                    <p>
                        Questo non è possibile, perché nessuno dei dati personali dell'utente (quali carte di credito, numero di telefono, codice fiscale) sono
                        in nostro possesso
                    </p>
                </li>
                <li>
                    <h3>Autorizzazioni richieste dall'applicazione sul dispositivo</h3>
                    <p>
                        L'app richiede l'accesso alla memoria interna del dispositivo dell'utente per poter scaricare e salvare le nostre immagini.
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default PrivacyPolicy