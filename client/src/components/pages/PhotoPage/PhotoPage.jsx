import "./PhotoPage.scss"
import { useParams, useNavigate } from "react-router-dom"
import LazyImage from "../../LazyImage"
import { previewsRoute, imagesRoute } from "../../../staticInfo"
import { BiArrowBack } from "react-icons/bi"
import { IoIosShareAlt } from "react-icons/io"
import formatURL from "../../../formatURL"
import { FaShoppingCart } from "react-icons/fa"
import { BsDownload } from "react-icons/bs"
import { useState } from "react"

const PhotoPage = ({ categories, previewsStruct, onAddToCart }) => {
    const { category_name, album_name, image_name } = useParams()
    const navigate = useNavigate()

    const category = categories.find(category => formatURL(category.title) === category_name)

    const album = categories.find(category => formatURL(category.title) === category_name).albums.find(album => formatURL(album.title) === album_name)

    const useShare = navigator?.share !== undefined && navigator?.canShare !== undefined

    const isFree = album?.isFree === true

    const image = previewsStruct[Object.keys(previewsStruct).find(key => {
        return key === category.title
    })]?.find(alb => alb.title === album.title)?.previews.find(img => img.fileName === image_name)

    const [addedToCart, setAddedToCart] = useState(image?.addedToCart)

    const share = () => {
        const shareData = {
            title: image.fileName,
            text: "Guarda questa foto su CS PhotoSport!",
            url: `${window.location.origin}/${category_name}/album/${album_name}/${image_name}`
        }
        if (!navigator?.canShare?.(shareData)) return alert("Il tuo browser non supporta la condivisione!")
        navigator.share(shareData)
    }

    const downloadImage = (imageSrc) => {
        const link = document.createElement('a')
        link.href = imageSrc
        link.download = image_name
        link.setAttribute("class", "download-link")
        link.setAttribute("id", image_name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }


    return (
        <div className="photo-page">
            <div className="photo-page-nav">
                <BiArrowBack className="nav-icon back-button" color="white" size="3.5rem" onClick={() => navigate(`/${category_name}/album/${album_name}`)} />
                <h2>{ image_name.replace(".jpg", "") }</h2>
                { useShare && <IoIosShareAlt className="nav-icon nav-share-button" color="white" size="3.5rem" onClick={share} /> }
            </div>
            <LazyImage src={`${previewsRoute}/${category.title}/${album.title}/${image_name}`} />
            {
                isFree ?
                <button className="download" onClick={() => downloadImage(`${imagesRoute}/${category.title}/${album.title}/${image_name}`)}><BsDownload size="1.3rem" color="white" />Scarica</button>

                :

                addedToCart
                ?
                <button className="added-to-cart">Elemento aggiunto al carrello</button>
                :
                <button className="add-to-cart" onClick={() => {
                    onAddToCart(image)
                    setAddedToCart(true)
                }}><FaShoppingCart size="1.5rem" />Aggiungi al carrello</button>
            }
            {
                useShare &&
                <button className="share-button" onClick={share}>
                    <IoIosShareAlt size="1.5rem" />
                    Condividi
                </button>
            }
        </div>
    )
}

export default PhotoPage