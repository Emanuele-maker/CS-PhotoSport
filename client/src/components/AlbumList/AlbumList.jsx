import AlbumCard from "../AlbumCard/AlbumCard"
import "./AlbumList.scss"

export default function AlbumList({ albums }) {
    return (
        <div className="grid albums-container">
            { albums.map(album => {
                return (<AlbumCard key={album.id} album={album} />)
            }) }
        </div>
    )
}