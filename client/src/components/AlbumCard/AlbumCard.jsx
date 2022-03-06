import "./AlbumCard.scss"
import { useNavigate } from "react-router-dom"

export default function AlbumCard({ category, subCategory, album }) {
    const navigate = useNavigate()

    return (
        <div className="album-container" onClick={() => {
            if (subCategory) navigate(`/${category}/${subCategory}/${album.title}`)
            else navigate(`/${category}/album/${album.title}`)
        }}>
            <img src={ album.cover } alt="Cover dell'album" />
            <h4>{ album.title }</h4>
        </div>
    )
}