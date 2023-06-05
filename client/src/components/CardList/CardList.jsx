import { useEffect } from "react"
import Card from "../Card/Card"
import "./CardList.scss"

const CardList = ({ content, custom_list }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="grid-container">
            <div className="grid list-container">
                {
                    custom_list ?
                    custom_list.map(card => {
                        return card
                    })
                    : content.map((cardContent, cardIndex) => {
                        return <Card title={cardContent.title} cover={cardContent.cover} href={cardContent.href} key={cardIndex} />
                    }) 
                }
            </div>
        </div>
    )
}

export default CardList