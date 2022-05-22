import "./SiteLogo.scss"
import Slide from 'react-reveal/Slide'
import { buildRoute } from "../../staticInfo"

export default function SiteLogo() {
  return (
    <div className="site-logo">
        <Slide left big duration={900}>
            <img onDrag={() => {}} src={`${buildRoute}/favicon.png`} alt="logo del sito" />
        </Slide>
        <Slide right big duration={900}>
            <h1>CS PhotoSport</h1>
        </Slide>
    </div>
  )
}
