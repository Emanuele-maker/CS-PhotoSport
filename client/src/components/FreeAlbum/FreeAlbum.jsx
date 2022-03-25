import "./FreeAlbum.scss"
import Heading from "../Heading/Heading"
import { previewsRoute } from "../../staticInfo"
import FreePhotoCard from "../FreePhotoCard/FreePhotoCard"

export default function FreeAlbum({ previews, previewsStruct, category_name, sub_category_name, subCategory, onAddToCart, album, album_name }) {
  return (
    <>
            <Heading>{ album_name.replaceAll("-", " ") }</Heading>
            <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto</h2>
            <div className="grid photos-container">
                    <>
                        {
                            previews ? previews.map((preview, previewIndex) => {
                                return <FreePhotoCard key={previewIndex} preview={`${previewsRoute}/${Object.keys(previewsStruct).find(key => key.toLowerCase().replaceAll(" ", "-") === category_name)}${sub_category_name !== undefined ? `/${subCategory.title}` : ""}/${album.title.replaceAll("-", " ")}/${preview.fileName}`} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                            }) : <h1>Nessuna foto trovata in questo album</h1>
                        }
                    </>
            </div>
    </>
  )
}
