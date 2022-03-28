import "./FreeAlbum.scss"
import Heading from "../Heading/Heading"
import { previewsRoute } from "../../staticInfo"
import FreePhotoCard from "../FreePhotoCard/FreePhotoCard"
import { BsWhatsapp, BsFacebook, BsShareFill, BsTwitter, BsTelegram } from "react-icons/bs"

export default function FreeAlbum({ previews, previewsStruct, category_name, sub_category_name, subCategory, onAddToCart, album, album_name }) {
  const shareData = {
    title: album.title,
    text: "Guarda questo album di CSPhotoSport!",
    url: window.location.href
  }
  const canShare = navigator?.canShare?.(shareData)

  const share = () => {

    if (!canShare) alert("Il tuo browser non supporta la condivisione!")
    else navigator.share(shareData)
  }

  const whatsappShare = () => {
    if (!canShare) alert("Il tuo browser non supporta la condivisione!")
    else window.open(`https://wa.me?text=${shareData.title} ${shareData.url}`)
  }

  const fackebookShare = () => {
    if (!canShare) alert("Il tuo browser non supporta la condivisione!")
    else window.open(`http://www.facebook.com/sharer.php?u=${shareData.url}`)
  }

  const twitterShare = () => {
    if (!canShare) alert("Il tuo browser non supporta la condivisione!")
    else window.open(`https://twitter.com/intent/tweet?text=${shareData.title} ${shareData.url}`)
  }

  const telegramShare = () => {
    if (!canShare) alert("Il tuo browser non supporta la condivisione!")
    else window.open(`https://t.me/share/url?url=${shareData.url}&text=${shareData.text}`)
  }

  return (
    <>
            <Heading>{ album_name.replaceAll("-", " ") }</Heading>
            <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto</h2>
            <h2 className="sub-title">Condividi su:</h2>
            {
              canShare && <div className="share-icons">
                <BsShareFill className="share-icon" size="2rem" color="white" onClick={share} />
                <BsWhatsapp className="share-icon" size="2rem" color="white" onClick={whatsappShare} />
                <BsFacebook className="share-icon" size="2rem" color="white" onClick={fackebookShare} />
                <BsTelegram className="share-icon" size="2rem" color="white" onClick={telegramShare} />
                <BsTwitter className="share-icon" size="2rem" color="white" onClick={twitterShare} />
              </div>
            }
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
