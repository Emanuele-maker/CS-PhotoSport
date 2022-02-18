import "./Heading.scss"

export default function Heading({ children }) {
    return (
        <h1 className="heading">{ children }</h1>
    )
}