import "./News.scss"
import Heading from "../../Heading/Heading"
import { useEffect, useState } from "react"
import BlogPostCard from "../../BlogPostCard/BlogPostCard"
import { previewsRoute } from "../../../staticInfo"

const News = () => {
    const [blogPosts, setBlogPosts] = useState([
        {
            title: "CN Latina vs Olympic Roma",
            date: "03/04/2022",
            paragraph: "Il 3 aprile si è disputata la partita di pallanuoto giovanile under 14 CN Latina vs Olympic Roma. Questo incontro, presso la piscina comunale latinense, ha visto come vincitrice i padroni di casa per 12-4. Ai fini della classifica parziale del girone d’andata, il match è stato molto importante per entrambe le squadre. Il CN Latina aveva bisogno di 3 punti per concludere la prima fase in 3 posizione davanti all’Acquademia Velletri. L’olympic Roma, invece, stava cercando la prima vittoria della stagione. Nei primi due parziali, la partita è stata molto combattuta: il primo termina per 2-1. Nella seconda metà del match, i latinensi prendono definitivamente il controllo sul campo, portandosi a casa i 3 punti.",
            headerImage: `${previewsRoute}/Pallanuoto/CN Latina vs Olympic Roma/IMG_2798.jpg`,
            albumRoute: "/pallanuoto/album/cn-latina-vs-olympic-roma",
            links: [
                {
                    title: "Diretta streaming su Youtube | 1º parziale",
                    href: "https://www.youtube.com/watch?v=Gegk8Abxqfw"
                },
                {
                    title: "Diretta streaming su Youtube | 2º e 3º parziale",
                    href: "https://www.youtube.com/watch?v=x2m6q5Sf8vs"
                }
            ]
        }
    ])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="news-page">
            <Heading>NEWS</Heading>
            {
                blogPosts.map((blogPost, key) => (
                    <BlogPostCard key={key} {...blogPost} />
                ))
            }
        </div>
    )
}

export default News