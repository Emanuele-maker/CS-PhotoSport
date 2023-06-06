import "./PhotoPage.scss"
import {useNavigate, useParams} from "react-router-dom"
import LazyImage from "../../components/LazyImage"
import { previewsRoute, imagesRoute, siteRoute } from "../../staticInfo"
import { BiArrowBack } from "react-icons/bi"
import { IoIosShareAlt, IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import formatURL from "../../formatURL"
import { BsDownload, BsCartPlus, BsCartCheck } from "react-icons/bs"
import { useState } from "react"
import { AiOutlineStar } from "react-icons/ai"
import axios from "axios"
import { ImCross } from "react-icons/im"
import LoginPopup from "../../components/LoginPopup/LoginPopup"
import AddToCartBtn from "../../components/AddToCartBtn/AddToCartBtn"

const PhotoPage = ({ categories, previewsStruct, onAddToCart, isLoggedIn, setUserFavorites, userFavoritesState, logUserIn }) => {
    const { category_name, sub_category_name, album_name, image_name } = useParams()
    const navigate = useNavigate()

    const useSub = sub_category_name !== undefined

    const category = categories.find(category => formatURL(category.title) === category_name)

    const subCategory = category.subCategories?.find(sub => formatURL(sub.title) === sub_category_name)

    const album = useSub ? categories.find(category => formatURL(category.title) === category_name).subCategories.find(sub => formatURL(sub.title) === sub_category_name).albums.find(album => formatURL(album.title) === album_name) : categories.find(category => formatURL(category.title) === category_name).albums.find(album => formatURL(album.title) === album_name)

    const useShare = navigator?.share !== undefined && navigator?.canShare !== undefined

    const isFree = album?.isFree === true

    const initalImage = useSub ? previewsStruct[Object.keys(previewsStruct).find(key => {
        return key === category.title
    })]?.subCategories.find(sub => sub.title === subCategory.title).albums.find(alb => alb.title === album.title)?.previews.find(img => img.fileName === image_name)
    : previewsStruct[Object.keys(previewsStruct).find(key => {
        return key === category.title
    })]?.find(alb => alb.title === album.title)?.previews.find(img => img.fileName === image_name)

    const [currentImage, setCurrentImage] = useState(initalImage)
    const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false)
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

    const addFavorite = () => {
        setUserFavorites([...userFavoritesState, currentImage])
        axios.post(`${siteRoute}/api/myUser/add-favorite`, {
            user_id: localStorage.getItem("userId"),
            favorites: [...userFavoritesState, currentImage]
        }, {
            method: "POST"
        })
        localStorage.setItem("userFavorites", JSON.stringify([...userFavoritesState, currentImage]))
    }

    const removeFavorite = () => {
        setUserFavorites(userFavoritesState.filter(favorite => favorite.fileName !== currentImage.fileName))
        axios.post(`${siteRoute}/api/myUser/add-favorite`, {
            user_id: localStorage.getItem("userId"),
            favorites: userFavoritesState.filter(favorite => favorite.fileName !== currentImage.fileName)
        }, {
            method: "POST"
        })
        localStorage.setItem("userFavorites", JSON.stringify(userFavoritesState.filter(favorite => favorite.fileName !== currentImage.fileName)))
    }

    return (
        <div className="photo-page">
            <div className="photo-page-nav">
                <BiArrowBack className="nav-icon back-button" color="white" size="3.5rem" onClick={() => window.close()} />
                <h2>{ currentImage.fileName.replace(".jpg", "") }</h2>
                {
                    !album.isFree &&
                    <>
                        {
                            (cartBtnClicked || currentImage.addedToCart) 
                            ? <BsCartCheck className="nav-icon nav-share-button" color="white" size="3.5rem" /> 
                            : <BsCartPlus className="nav-icon nav-share-button" color="white" size="3.5rem" onClick={() => {
                                onAddToCart(currentImage)
                                setCartBtnClicked(true)
                            }} />
                        }
                    </>
                }
            </div>
            <div className="image-navigation">
                <div className="icon-container">
                    <IoIosArrowBack onClick={moveImageBack} className="nav-icon" color="white" size="3.5rem" />
                </div>
                <div className="image-holder">
                    <LazyImage src={`${previewsRoute}/${category.title}${useSub ? `/${sub_category_name}` : ""}/${album.title}/${currentImage.fileName}`} />
                </div>
                <div className="icon-container">
                    <IoIosArrowForward onClick={moveImageForward} className="nav-icon" color="white" size="3.5rem" />
                </div>
            </div>
            {
                isFree ?
                <button className="download" onClick={() => downloadImage(`${imagesRoute}/${category.title}/${album.title}/${image_name}`)}><BsDownload size="1.3rem" color="white" />Scarica</button>
                :
                currentImage.addedToCart
                ?
                <button className="added-to-cart">Elemento aggiunto al carrello</button>
                :
                <AddToCartBtn onClick={() => {
                    onAddToCart(currentImage)
                    setAddedToCart(true)
                }} addedToCart={currentImage.addedToCart} />
            }
            {
                <button className={userFavoritesState?.find(favorite => favorite?.fileName === currentImage.fileName && favorite.album === currentImage.album && favorite.category === currentImage.category) ? "logout" : "add-to-cart"} onClick={isLoggedIn ? userFavoritesState?.find(favorite => favorite?.fileName === currentImage.fileName && favorite.album === currentImage.album && favorite.category === currentImage.category) ? removeFavorite : addFavorite : () => setIsLoginPopupVisible(true)}>
                    {
                        userFavoritesState?.find(favorite => favorite?.fileName === currentImage.fileName && favorite.album === currentImage.album && favorite.category === currentImage.category) ? (<><ImCross color="white" size="1rem" />Rimuovi dai preferiti</>) : (<><AiOutlineStar color="white" size="1.5rem" />Aggiungi ai preferiti</>)
                    }
                </button>
            }
            {
                useShare &&
                <button className="share-button" onClick={share}>
                    <IoIosShareAlt size="1.5rem" />
                    Condividi
                </button>
            }
            <LoginPopup isVisible={isLoginPopupVisible} logUserIn={logUserIn} setIsVisible={setIsLoginPopupVisible} />
        </div>
    )
}

export default PhotoPage