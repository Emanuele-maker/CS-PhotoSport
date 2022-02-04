import AlbumList from "../../AlbumList/AlbumList"
import "./Home.scss"

export default function Home({ albums }) {
    return (
        <div className="container">
            <h1>I miei album</h1>
            <AlbumList albums={albums} />
        </div>
    )
}