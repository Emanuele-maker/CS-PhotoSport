import "./Footer.scss"
import { BsFacebook, BsInstagram } from "react-icons/bs"
import { ImFlickr3 } from "react-icons/im"

export default function Footer() {
    const redirect = (url) => {
        window.open(url)
    }

    return (
        <footer>
            <h5>Seguici sui social</h5>
            <div className="social-icons">
                <BsFacebook onClick={() => redirect("https://www.facebook.com/cristianphotosport")} />
                <BsInstagram onClick={() => redirect("https://www.instagram.com/cs_photosport/")} />
                <ImFlickr3 onClick={() => redirect("https://www.flickr.com/people/132698149@N04/")} />
            </div>
        </footer>
    )
}
