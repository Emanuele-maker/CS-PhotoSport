import "./VideoPlayer.scss"
import { useParams } from "react-router-dom"
import formatURL from "../../formatURL"
import NotFound from "../404/404"
import Heading from "../../components/Heading/Heading"

const VideoPlayer = ({ categories }) => {
  const { category_name, album_name } = useParams()

  const album = categories.find(category => formatURL(category.title) === formatURL(category_name))?.albums.find(album => formatURL(album.title) === formatURL(album_name))

  if (!album || !album.useVideo || !album.videos || album.videos.length === 0) return <NotFound />

  return (
    <div className="video-player-container">
        <Heading backUrl={`/${category_name}/album/${album_name}`}>{ album.title }</Heading>
        <div className="videos">
            {
                album.videos.map(video => (
                  <div style={{ width: "80%" }} dangerouslySetInnerHTML={{ __html: video }}></div>
                ))
            }
        </div>
    </div>
  )
}

export default VideoPlayer