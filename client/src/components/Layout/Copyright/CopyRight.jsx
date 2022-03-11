import "./CopyRight.scss"

export default function CopyRight() {
    return (
        <footer>
            <h1 className="footer-title">© { new Date().getFullYear() } CS PhotoSport Tutti i diritti riservati</h1>
        </footer>
    )
}