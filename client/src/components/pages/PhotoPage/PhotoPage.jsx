import "./PhotoPage.scss"
import { useParams, useNavigate } from "react-router-dom"
import LazyImage from "../../LazyImage"
import { previewsRoute, imagesRoute, siteRoute } from "../../../staticInfo"
import { BiArrowBack } from "react-icons/bi"
import { IoIosShareAlt, IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import formatURL from "../../../formatURL"
import { FaShoppingCart } from "react-icons/fa"
import { BsDownload, BsCartPlus, BsCartCheck } from "react-icons/bs"
import { useState } from "react"

const PhotoPage = ({ categories, previewsStruct, onAddToCart }) => {
    const { category_name, album_name, image_name } = useParams()
    const navigate = useNavigate()

    const category = categories.find(category => formatURL(category.title) === category_name)

    const album = categories.find(category => formatURL(category.title) === category_name).albums.find(album => formatURL(album.title) === album_name)

    const useShare = navigator?.share !== undefined && navigator?.canShare !== undefined

    const isFree = album?.isFree === true

    const initalImage = previewsStruct[Object.keys(previewsStruct).find(key => {
        return key === category.title
    })]?.find(alb => alb.title === album.title)?.previews.find(img => img.fileName === image_name)

    const [currentImage, setCurrentImage] = useState(initalImage)

    const [addedToCart, setAddedToCart] = useState(currentImage?.addedToCart)
    const [cartBtnClicked, setCartBtnClicked] = useState(false)

    const share = () => {
        const shareData = {
            title: currentImage.fileName,
            text: "Guarda questa foto su CS PhotoSport!",
            url: `${window.location.origin}/${category_name}/album/${album_name}/${currentImage.fileName}`
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

    const moveImageBack = () => {
        const albumStruct = previewsStruct[Object.keys(previewsStruct).find(key => {
            return key === category.title
        })]?.find(alb => alb.title === album.title)?.previews
        const imgIndex = albumStruct.indexOf(currentImage) - 1
        if (imgIndex < 0) return
        setCartBtnClicked(false)
        setCurrentImage(albumStruct[imgIndex])
    }

    const moveImageForward = () => {
        const albumStruct = previewsStruct[Object.keys(previewsStruct).find(key => {
            return key === category.title
        })]?.find(alb => alb.title === album.title)?.previews
        const imgIndex = albumStruct.indexOf(currentImage) + 1
        if (imgIndex > albumStruct.width - 1) return
        setCartBtnClicked(false)
        setCurrentImage(albumStruct[imgIndex])
    }

    return (
        <div className="photo-page">
            <div className="photo-page-nav">
                <BiArrowBack className="nav-icon back-button" color="white" size="3.5rem" onClick={() => navigate(`/${category_name}/album/${album_name}?scrollTo=${currentImage.fileName}`)} />
                <h2>{ currentImage.fileName.replace(".jpg", "") }</h2>
                {cartBtnClicked || currentImage.addedToCart ? <BsCartCheck className="nav-icon nav-share-button" color="white" size="3.5rem" /> : <BsCartPlus className="nav-icon nav-share-button" color="white" size="3.5rem" onClick={() => { onAddToCart(currentImage); setCartBtnClicked(true)}} />  }
            </div>
            <div className="image-navigation">
                <div className="icon-container">
                    <IoIosArrowBack onClick={moveImageBack} className="nav-icon" color="white" size="3.5rem" />
                </div>
                <div className="image-holder">
                    <LazyImage src={`${previewsRoute}/${category.title}/${album.title}/${currentImage.fileName}`} />
                </div>
                <div className="icon-container">
                    <IoIosArrowForward onClick={moveImageForward} className="nav-icon" color="white" size="3.5rem" />
                </div>
            </div>
            {
                isFree ?
                <button className="download" onClick={() => downloadImage(`${imagesRoute}/${category.title}/${album.title}/${image_name}`)}><BsDownload size="1.3rem" color="white" />Scarica</button>
                :
                addedToCart
                ?
                <button className="added-to-cart">Elemento aggiunto al carrello</button>
                :
                <button className="add-to-cart" onClick={() => {
                    onAddToCart(currentImage)
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