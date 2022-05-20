import "./AlbumPage.scss"
import Heading from "../Heading/Heading"
import { previewsRoute } from "../../staticInfo"
import PhotoCard from "../PhotoCard/PhotoCard"
import FreePhotoCard from "../FreePhotoCard/FreePhotoCard"
import { BsWhatsapp, BsFacebook, BsShareFill, BsTwitter, BsTelegram, BsNewspaper } from "react-icons/bs"
import { useState } from "react"
import SearchBar from "../SearchBar/SearchBar"
import { useNavigate } from "react-router-dom"

export default function AlbumPage({ previews, previewsStruct, category_name, sub_category_name, subCategory, onAddToCart, album, album_name, isFree, useSearch, searchPlaceholder, useNews }) {
  const [filteredPreviews, setFilteredPreviews] = useState(previews)

  const navigate = useNavigate()

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

  // create a function that updates the filteredPreviews state

  const filterPreviews = (e) => {
    // set the filteredPreviews state to the initial previews state if the input is empty
    if (e.target.value === "") return setFilteredPreviews(previews)
    const search = e.target.value.toLowerCase()
    const filtered = previews.filter(preview => preview.fileName.toLowerCase().includes(search))
    setFilteredPreviews(filtered)
  }

  return (
    <>
            <Heading>{ album_name.replaceAll("-", " ") }</Heading>
            { 
              useNews &&
              <div className="news-btn-container">
                <button className="news-btn" onClick={() => navigate(`/news/${album.title}`, { replace: true })}>
                  <BsNewspaper size="1.5rem" color="white" />
                  <span>Guarda l'articolo</span>
                </button>
              </div>
            }
            { isFree 
            ? <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto</h2> 
            : 
            <>
              <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto a soli <span className="highlighted">€3.00</span> l'una</h2>
              <h2 className="sub-title">Ogni <span className="highlighted">10 Foto</span> verrà applicato un <span className="highlighted">10% di sconto</span></h2>
            </>
            }
            {
              canShare &&
              <>
              <h2 className="sub-title">Condividi su:</h2>
              <div className="share-icons">
                <BsShareFill className="share-icon" size="2rem" color="white" onClick={share} />
                <BsWhatsapp className="share-icon" size="2rem" color="white" onClick={whatsappShare} />
                <BsFacebook className="share-icon" size="2rem" color="white" onClick={fackebookShare} />
                <BsTelegram className="share-icon" size="2rem" color="white" onClick={telegramShare} />
                <BsTwitter className="share-icon" size="2rem" color="white" onClick={twitterShare} />
              </div>
              </>
            }
            { useSearch && <SearchBar width="15rem" onChange={filterPreviews} placeholder={searchPlaceholder ? searchPlaceholder : ""} /> }
            <div className="grid photos-container">
                    <>
                        {
                            filteredPreviews.length > 0 && filteredPreviews.map((preview, previewIndex) => {
                              if (isFree) return <FreePhotoCard key={previewIndex} category_name={category_name} album_name={album_name} imageName={preview.fileName} preview={`${previewsRoute}/${Object.keys(previewsStruct).find(key => key.toLowerCase().replaceAll(" ", "-") === category_name)}${sub_category_name !== undefined ? `/${subCategory.title}` : ""}/${album.title.replaceAll("-", " ")}/${preview.fileName}`} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                              else return <PhotoCard key={previewIndex} category_name={category_name} album_name={album_name} imageName={preview.fileName} preview={`${previewsRoute}/${Object.keys(previewsStruct).find(key => key.toLowerCase().replaceAll(" ", "-") === category_name)}${sub_category_name !== undefined ? `/${subCategory.title}` : ""}/${album.title.replaceAll("-", " ")}/${preview.fileName}`} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                            })
                        }
                    </>
            </div>
            { filteredPreviews.length < 1 && <h2 className="sub-title">Nessuna foto trovata</h2> }
    </>
  )
}
