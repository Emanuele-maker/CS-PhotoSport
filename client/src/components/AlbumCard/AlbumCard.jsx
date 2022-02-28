import "./AlbumCard.scss"
import { useNavigate } from "react-router-dom"

export default function AlbumCard({ category, album }) {
    const navigate = useNavigate()

    return (
        <div className="album-container" onClick={() => navigate(`/${category}/${album.title}`)}>
            <img src={ album.cover } alt="Cover dell'album" />
            <h4>{ album.title }</h4>
        </div>
    )
}