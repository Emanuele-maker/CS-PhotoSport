import "./AlbumCard.scss"
import { useHistory } from "react-router-dom"

export default function AlbumCard({ album }) {
    const history = useHistory()

    return (
        <div className="album-container" onClick={() => history.push(`/album/${album.title}`)}>
            <img src={album.cover} alt="Cover dell'album" />
            <h4>{ album.title }</h4>
            <p>{ album.description }</p>
        </div>
    )
}