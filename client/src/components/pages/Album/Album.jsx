import { useParams } from "react-router-dom"
import PhotoCard from "../../PhotoCard/PhotoCard"
import "./Album.scss"
import previewsJSON from "../../../previews.json"
import { useState, useEffect } from "react"
import Heading from "../../Heading/Heading"

export default function Album({ onAddToCart, cartImages }) {
    const { album_name } = useParams()
    const [previews, setPreviews] = useState(JSON.parse(JSON.stringify(previewsJSON))[album_name])

    useEffect(() => {
        document.title = `CS PhotoSport: ${album_name}`
    }, [])

    return (
        <>
            <Heading>{ album_name }</Heading>
            <div className="grid photos-container">
                    <>
                        {
                            previews && previews.length > 0 ? previews.map((preview, previewIndex) => {
                                return <PhotoCard key={previewIndex} preview={require(`../../../previews/${album_name}/${preview.fileName}`)} onAddToCart={() => onAddToCart(preview)} addedToCart={cartImages?.find(img => img === preview)} />
                            }) : <h1>Nessuna foto trovata in questo album</h1>
                        }
                    </>
            </div>
        </>
    )
}