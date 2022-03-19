import { useParams } from "react-router-dom"
import PhotoCard from "../../PhotoCard/PhotoCard"
import "./Album.scss"
import { useEffect } from "react"
import Heading from "../../Heading/Heading"
import NotFound from "../404/404"
import { previewsRoute } from "../../../staticInfo"
import formatURL from "../../../formatURL"

export default function Album({ onAddToCart, previewsStruct }) {
    const { category_name, sub_category_name, album_name } = useParams()

    useEffect(() => {
        document.title = `CS PhotoSport: ${album_name}`
    }, [album_name])

    const category = previewsStruct[Object.keys(previewsStruct).find(key => {
        return key.toLowerCase().replaceAll(" ", "-") === category_name
    })]
    if (!category) return <NotFound />

    let subCategory, albums, album

    if (category.subCategories) {
        subCategory = category.subCategories.find(c => formatURL(c.title) === sub_category_name)
        if (!subCategory) return <NotFound />
        albums = subCategory.albums
        if (!albums) return <NotFound />
        album = albums.find(album => album.title === album_name)
    } else {
        album = category.find(album => formatURL(album.title) === album_name)
    }
    if (!album) return <NotFound />

    const previews = album.previews

    return (
        <>
            <Heading>{ album_name.replaceAll("-", " ") }</Heading>
            <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto a soli <span className="highlighted">€3.50</span> l'una</h2>
            <div className="grid photos-container">
                    <>
                        {
                            previews ? previews.map((preview, previewIndex) => {
                                return <PhotoCard key={previewIndex} preview={`${previewsRoute}/${Object.keys(previewsStruct).find(key => key.toLowerCase().replaceAll(" ", "-") === category_name)}${sub_category_name !== undefined ? `/${subCategory.title}` : ""}/${album.title.replaceAll("-", " ")}/${preview.fileName}`} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                            }) : <h1>Nessuna foto trovata in questo album</h1>
                        }
                    </>
            </div>
        </>
    )
}