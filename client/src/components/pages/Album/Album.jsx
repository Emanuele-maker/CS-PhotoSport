import { useParams } from "react-router-dom"
import PhotoCard from "../../PhotoCard/PhotoCard"
import "./Album.scss"
import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import NotFound from "../404/404"

export default function Album({ onAddToCart, previewsStruct }) {
    const { category_name, album_name } = useParams()

    useEffect(() => {
        document.title = `CS PhotoSport: ${album_name}`
    }, [album_name])

    const category = previewsStruct[category_name]
    if (!category) return <NotFound />
    
    const album = category.find(album => album.title === album_name)
    if (!album) return <NotFound />

    const previews = album.previews

    return (
        <>
            <Heading>{ album_name }</Heading>
            <div className="grid photos-container">
                    <>
                        {
                            previews ? previews.map((preview, previewIndex) => {
                                return <PhotoCard key={previewIndex} preview={require(`../../../previews/${category_name}/${album_name}/${preview.fileName}`)} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                            }) : <h1>Nessuna foto trovata in questo album</h1>
                        }
                    </>
            </div>
        </>
    )
}