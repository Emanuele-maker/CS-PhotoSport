import AlbumList from "../../AlbumList/AlbumList"
import "./Home.scss"

export default function Home({ albums }) {
    return (
        <div className="container">
            <h1 style={{ color: "white", width: "100%", background: "rgb(102, 101, 101)" }}>CS PhotoSport</h1>
            <AlbumList albums={albums} />
        </div>
    )
}