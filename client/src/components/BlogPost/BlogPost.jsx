import "./BlogPost.scss"
import { useNavigate } from "react-router-dom"

const BlogPost = ({ title, paragraph, headerImage, albumRoute }) => {
    const navigate = useNavigate()

    return (
        <div className="blog-post">
            <img src={headerImage} alt={title} onClick={() => navigate(albumRoute)} />
            <h1>{ title }</h1>
            <button onClick={() => navigate(albumRoute)}>Guarda le foto</button>
            <p>{ paragraph }</p>
        </div>
    )
}

export default BlogPost