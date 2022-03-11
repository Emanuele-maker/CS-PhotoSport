import "./CopyRight.scss"

export default function CopyRight() {
    return (
        <div className="copyright">
            <h1 className="copyright-title">© { new Date().getFullYear() } CS PhotoSport Tutti i diritti riservati</h1>
        </div>
    )
}