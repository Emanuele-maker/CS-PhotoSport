import { useParams } from "react-router-dom"
import PhotoCard from "../../PhotoCard/PhotoCard"
import "./Album.scss"
import previewsJSON from "../../../previews.json"
import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import NotFound from "../404/404"

let previews = []
let did = []

export default function Album({ onAddToCart }) {
    const { category_name, album_name } = useParams()

    useEffect(() => {
        document.title = `CS PhotoSport: ${album_name}`
    }, [album_name])

    const parsedPreviews = JSON.parse(JSON.stringify(previewsJSON))
    const category = parsedPreviews[category_name]
    if (!category) return <NotFound />
    
    const album = category.find(album => album.title === album_name)
    if (!album) return <NotFound />
    if (!did[category.indexOf(album)]) {
        previews[category.indexOf(album)] = {
            album: album_name,
            previewImages: album.previews
        }
        did[category.indexOf(album)] = true
    }

    return (
        <>
            <Heading>{ album_name }</Heading>
            <div className="grid photos-container">
                    <>
                        {
                            previews.find(prev => prev?.album === album_name)?.previewImages ? previews.find(prev => prev?.album === album_name)?.previewImages.map((preview, previewIndex) => {
                                return <PhotoCard key={previewIndex} preview={require(`../../../previews/${category_name}/${album_name}/${preview.fileName}`)} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                            }) : <h1>Nessuna foto trovata in questo album</h1>
                        }
                    </>
            </div>
        </>
    )
}