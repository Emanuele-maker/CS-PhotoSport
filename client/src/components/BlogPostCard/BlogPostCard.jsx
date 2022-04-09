import "./BlogPostCard.scss"
import { useNavigate } from "react-router-dom"

const BlogPostCard = ({ title, date, paragraph, headerImage, albumRoute, links }) => {
    const navigate = useNavigate()

    return (
        <div className="blog-post">
            <img src={headerImage} alt={title} onClick={() => navigate(albumRoute)} />
            <h1>{ title }</h1>
            <h2>{ date }</h2>
            <button onClick={() => navigate(albumRoute)}>Guarda le foto</button>
            <p>{ paragraph }</p>
            {
                links &&
                <div className="blog-post-links">
                    <h1>Link esterni</h1>
                    {
                        links.map((link, key) => (
                            <a key={key} href={link.href} target="_blank" rel="noopener noreferrer">{ link.title }</a>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default BlogPostCard