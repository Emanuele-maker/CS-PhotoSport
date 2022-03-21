import "./AlbumCard.scss"
import { useNavigate } from "react-router-dom"
import LazyImage from "../LazyImage"
import formatURL from "../../formatURL"

export default function AlbumCard({ category, subCategory, album }) {
    const navigate = useNavigate()

    return (
        <div className="album-container" onClick={() => {
            if (subCategory) navigate(formatURL(`/${category}/${subCategory}/${album.title}`))
            else navigate(formatURL(`/${category}/album/${album.title}`))
        }}>
            <LazyImage src={ album.cover } alt="Cover dell'album" />
            <h4>{ album.title }</h4>
        </div>
    )
}