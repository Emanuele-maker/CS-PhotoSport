import { useEffect } from "react"
import LoadingSpinner from "../../LoadingSpinner"
import { useParams } from "react-router-dom"
import useFetch from "../../../useFetch"
import PhotoCard from "../../PhotoCard/PhotoCard"
import "./Album.scss"

let previews = []

export default function Album({ onAddToCart, cartImages }) {
    const { album_name } = useParams()
 
    const { data: images, loading, error } = useFetch(`/images/${album_name}`)

    useEffect(() => {
        function base64ToBlob(base64, mime) {
            mime = mime || ''
            var sliceSize = 1024
            var byteChars = window.atob(base64)
            var byteArrays = []

            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                var slice = byteChars.slice(offset, offset + sliceSize)

                var byteNumbers = new Array(slice.length)
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i)
                }

                var byteArray = new Uint8Array(byteNumbers)

                byteArrays.push(byteArray)
            }
            return new Blob(byteArrays, {type: mime})
        }
        images?.forEach(image => {
            const blobStr = base64ToBlob(image.preview, "image/jpg")
            const blobUrl = URL.createObjectURL(blobStr)
            image.previewSrc = blobUrl
            if (!previews.includes(blobUrl)) previews.push(blobUrl)
        })
    }, [images])

    if (error) console.log(error)

    function objectsAreEqual(object1, object2) {
        if (!object1 || !object2) return false
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
      
        if (keys1.length !== keys2.length) {
          return false;
        }
      
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
      
        return true;
      }

    return (
        <div className="grid photos-container">
            { 
                loading ? <LoadingSpinner className="loading-spinner" /> : 
                images && images.length > 0 ? images.map((image, imageIndex) => {
                    const toFindCartImage =  cartImages.find(img => img === image)
                    return <PhotoCard key={imageIndex} preview={previews[imageIndex]} onAddToCart={() => onAddToCart(image)} addedToCart={cartImages.length > -1 ? objectsAreEqual(toFindCartImage, image) : false} />
                }) : <h1>Nessuna foto trovata in questo album</h1>
            }
        </div>
    )
}