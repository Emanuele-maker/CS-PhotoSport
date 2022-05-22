import "./AboutContainer.scss"
import Slide from 'react-reveal/Slide'
import { Link, useNavigate } from "react-router-dom"

export default function AboutContainer({ imageSrc, imageAlt, title, href, paragraph, justify, bgColor, animDuration, animDelay }) {
  const navigate = useNavigate()
  
  return (
    <Slide delay={animDelay} duration={animDuration} left={justify === "right"} right={justify === "left"} big>
        <div className="about-container" style={{ backgroundColor: bgColor }}>
          <Link to={href}><h1>{ title }</h1></Link>
          <div className="about-container-content">
            <img onClick={() => navigate(href)} src={imageSrc} alt={imageAlt} />
            <p>{ paragraph }</p>
          </div>
        </div>
    </Slide>
  )
}

AboutContainer.defaultProps = {
    justify: "right",
    bgColor: "pink"
}