import "./AlbumCard.scss"
import { Link } from "react-router-dom"
import LazyImage from "../LazyImage"
import formatURL from "../../formatURL"

export default function AlbumCard({ category_name, sub_category_name, album }) {
    return (
        <Link className={`card-container ${album.coming_soon && "coming-soon"}`} to={formatURL(`/${category_name}${sub_category_name ? `/${sub_category_name}` : ""}/album/${album.title}`)}>
            <div className="image-holder">
                <LazyImage src={ album.cover } alt="Cover dell'album" />
            </div>
            <h4>{ album.title }</h4>
            { album.coming_soon && <h3 style={{ color: "white", margin: 0 }}>Coming soon...</h3> }
        </Link>
    )
}