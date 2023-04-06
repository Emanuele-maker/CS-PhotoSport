import "./Info.scss"
import Heading from "../../Heading/Heading"
import VideoButton from "../../VideoButton/VideoButton"
import { Link, useNavigate } from "react-router-dom"
import poweredByStripe from "../../../Powered by Stripe.png"
import { FaShoppingCart } from "react-icons/fa"
import checkoutGIF from "../../../checkout.gif"
import cartGIF from "../../../cart.gif"

const Info = () => {
  const navigate = useNavigate()

  return (
    <div className="info-page">
        <Heading backUrl={-1}>Informazioni</Heading>
        {/* <VideoButton text="Guarda il tutorial" action={() => navigate("/info/video")} /> */}
        <div className="text-container">
          <h1>GUIDA A CSPHOTOSPORT</h1>
          <h2>COME FUNZIONA IL SITO</h2>
          <p>
            CS PhotoSport offre ai suoi utenti il servizio di download di tutte le foto in alta risoluzione, che possono essere comodamente scaricate da tutti i dispositivi.
            Per fare ciò, è sufficiente aggiungere le foto al carrello e scaricarle successivamente al checkout del pagamento.
            <br />
            <b>NOTA BENE:</b> Non offriamo un servizio di stampa delle immagini
          </p>
          <br />
          <p><b>METODO DI PAGAMENTO:</b> Il circuito di sicurezza delle carte di credito scelto per il nostro sito è STRIPE</p>
          <a id="stripe-link" href="https://stripe.com" rel="noopener noreferrer" target="_blank">
            <img src={poweredByStripe} alt="Powered by Stripe" />
          </a>
          <h2>COME SI ACQUISTANO LE FOTO</h2>
          <ol>
            <li><p>Cerca nella sezione Home l'album di foto che ti interessa</p></li>
            <li>
              <p>
                Fai clic su un'immagine, e poi sul tasto
                <div className="add-to-cart">
                  <FaShoppingCart size="1.2rem" />Aggiungi al carrello
                </div>
                <span className="mobile-btn">"Aggiungi al carrello"</span>
              </p>
            </li>
            <img src={cartGIF} alt="cart gif" className="gif" />
            <li>
              <p>
                Vai al
                <Link to="/carrello">carrello</Link>
                cliccando l'icona <FaShoppingCart className="spanicon" size="1.5rem" />
                posta nella barra di navigazione, in alto a destra dello schermo
              </p>
            </li>
            <li>
              <p>
                Clicca sul tasto
                <div className="checkout-btn">Procedi al checkout</div>
                <div className="mobile-btn">"Procedi al checkout"</div>
                e inserisci i dati della tua carta di credito
              </p>
            </li>
            <img src={checkoutGIF} alt="Checkout gif" className="gif" />
            <li>
              <p>
                Nella schermata dopo il pagamento, apparirà la lista delle foto acquistate e potrai scaricarle singolarmente in alta definizione cliccando sul tasto
                <div className="download-btn">Scarica l'originale</div>
                <div className="mobile-btn">"Scarica l'originale"</div>
              </p>
            </li>
          </ol>
          <div className="tutorials-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/h5NJZc2Bdr4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/iWLHfn_I3ks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
    </div>
  )
}

export default Info