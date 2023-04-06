import "./VideoButton.scss"
import { RiVideoFill } from "react-icons/ri"

const VideoButton = ({ action, text }) => {
    return (
        <div className="video-btn-container">
            <button className="video-btn" onClick={() => action()}>
            <RiVideoFill size="1.5rem" color="white" />
            <span>{ text }</span>
            </button>
        </div>
    )
}

export default VideoButton