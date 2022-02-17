import AlbumCard from "../AlbumCard/AlbumCard"
import "./AlbumList.scss"

export default function AlbumList({ albums }) {
    return (
        <div className="grid albums-container">
            { albums.map((album, albumIndex) => {
                return (<AlbumCard key={albumIndex} album={album} />)
            }) }
        </div>
    )
}