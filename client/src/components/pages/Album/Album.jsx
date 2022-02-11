import { useEffect } from "react"
// import LoadingSpinner from "../../LoadingSpinner"
import { useParams } from "react-router-dom"
// import useFetch from "../../../useFetch"
import PhotoCard from "../../PhotoCard/PhotoCard"
import "./Album.scss"
import previewsJSON from "../../../previews.json"
import { useState } from "react"

export default function Album({ onAddToCart, cartImages }) {
    const { album_name } = useParams()
    const [previews, setPreviews] = useState(JSON.parse(JSON.stringify(previewsJSON))[album_name])
 
    // const { data: images, loading, error } = useFetch(`/images/${album_name}`)

    // useEffect(() => {
    //     function base64ToBlob(base64, mime) {
    //         mime = mime || ''
    //         var sliceSize = 1024
    //         var byteChars = window.atob(base64)
    //         var byteArrays = []

    //         for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
    //             var slice = byteChars.slice(offset, offset + sliceSize)

    //             var byteNumbers = new Array(slice.length)
    //             for (var i = 0; i < slice.length; i++) {
    //                 byteNumbers[i] = slice.charCodeAt(i)
    //             }

    //             var byteArray = new Uint8Array(byteNumbers)

    //             byteArrays.push(byteArray)
    //         }
    //         return new Blob(byteArrays, {type: mime})
    //     }
    //     images?.forEach(image => {
    //         const blobStr = base64ToBlob(image.preview, "image/jpg")
    //         const blobUrl = URL.createObjectURL(blobStr)
    //         onAddPreviewSrc(image, blobUrl)
    //         image.previewSrc = blobUrl
    //         if (!previews.includes(blobUrl)) previews.push(blobUrl)
    //     })
    // }, [images])

    // if (error) console.log(error)

    return (
        <div className="grid photos-container">
                <>
                    {
                        previews && previews.length > 0 ? previews.map((preview, previewIndex) => {
                            return <PhotoCard key={previewIndex} preview={require(`../../../previews/${album_name}/${preview.fileName}`)} onAddToCart={() => onAddToCart(preview)} addedToCart={cartImages?.find(img => img === preview)} />
                        }) : <h1>Nessuna foto trovata in questo album</h1>
                    }
                </>
        </div>
    )
}