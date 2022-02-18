import AlbumList from "../../AlbumList/AlbumList"
import Heading from "../../Heading/Heading"
import "./Home.scss"
import { useEffect } from "react"

export default function Home({ albums }) {
    useEffect(() => {
        document.title = "CS PhotoSport: Home"
    }, [])

    return (
        <div className="container">
            <Heading>CS PhotoSport</Heading>
            <AlbumList albums={albums} />
        </div>
    )
}