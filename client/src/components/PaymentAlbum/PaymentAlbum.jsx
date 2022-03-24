import "./PaymentAlbum.scss"
import Heading from "../Heading/Heading"
import { previewsRoute } from "../../staticInfo"
import PhotoCard from "../PhotoCard/PhotoCard"

export default function PaymentAlbum({ previews, previewsStruct, category_name, sub_category_name, subCategory, onAddToCart, album, album_name }) {
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
