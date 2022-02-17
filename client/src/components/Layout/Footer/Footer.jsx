import "./Footer.scss"

export default function Footer() {
    return (
        <footer>
            <h1 className="footer-title">© { new Date().getFullYear() } CS PhotoSport Tutti i diritti riservati</h1>
        </footer>
    )
}