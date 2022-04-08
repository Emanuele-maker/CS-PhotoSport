import "./News.scss"
import Heading from "../../Heading/Heading"
import { useState } from "react"
import BlogPost from "../../BlogPost/BlogPost"
import { previewsRoute } from "../../../staticInfo"

const News = () => {
    const [blogPosts, setBlogPosts] = useState([
        {
            title: "Vivicittà Latina 2022",
            paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            headerImage: `${previewsRoute}/Running/Vivicittà Latina 2022/1 2 6.jpg`,
            albumRoute: "/running/album/vivicittà-latina-2022"
        }
    ])

    return (
        <div className="news-page">
            <Heading>NEWS</Heading>
            { 
                blogPosts.map((blogPost, key) => (
                    <BlogPost key={key} {...blogPost} />
                ))
            }
        </div>
    )
}

export default News