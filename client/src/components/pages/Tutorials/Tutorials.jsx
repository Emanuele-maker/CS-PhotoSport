import Heading from "../../Heading/Heading"
import "./Tutorials.scss"

const Tutorials = () => {
  return (
    <div className="tutorials-container">
      <Heading backUrl={-1}>Video Tutorial</Heading>
      <div className="tutorial">
        <h2>Come uitlizzare il sito da dispositivo mobile</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/h5NJZc2Bdr4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div className="tutorial">
        <h2>Come utilizzare il sito da PC</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/iWLHfn_I3ks" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  )
}

export default Tutorials