import "./AlbumPage.scss"
import Heading from "../Heading/Heading"
import { previewsRoute } from "../../staticInfo"
import PhotoCard from "../PhotoCard/PhotoCard"
import { BsWhatsapp, BsFacebook, BsShareFill, BsTwitter, BsTelegram, BsNewspaper } from "react-icons/bs"
import { useEffect, useState, useMemo, useRef } from "react"
import SearchBar from "../SearchBar/SearchBar"
import { useNavigate, useLocation } from "react-router-dom"
import 'photo-grid-box/build/photo-grid-box.min.css'
import formatURL from "../../formatURL"
import { RiVideoFill } from "react-icons/ri"
import VideoButton from "../VideoButton/VideoButton"

function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export default function AlbumPage({ previews, fake, clientAlbum, previewsStruct, category_name, sub_category_name, subCategory, onAddToCart, album, album_name, isFree, useSearch, searchPlaceholder, useNews, searchType }) {
  const [filteredPreviews, setFilteredPreviews] = useState(previews)
  const [searchChars, setSearchChars] = useState(0)
  const scrollToPhoto = useRef()
  const minSearchChars = 3
  const basePrice = 300

  const navigate = useNavigate()
  const query = useQuery()

  useEffect(() => {
    if (!query.get("scrollTo")) return window.scrollTo(0, 0)
    if (!scrollToPhoto) return
    scrollToPhoto.current.scrollIntoView({ behavior: "smooth" })
  }, [query])

  if (fake) return (
    <>
      <Heading backUrl={`/${category_name}`}>{ clientAlbum.title }</Heading>
      <div dangerouslySetInnerHTML={{__html: clientAlbum.message}}></div>
    </>
  )

  if (clientAlbum.coming_soon) return (
    <>
      <Heading backUrl={`/${category_name}`}>{ clientAlbum.title }</Heading>
      <h1 style={{ color: "white", width: "100%", fontSize: "1.2rem", textAlign: "center" }}>Le foto di questo album verranno pubblicate a breve...</h1>
    </>
  )

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
    setSearchChars(e.target.value.length)
    if (e.target.value === "") return setFilteredPreviews(previews)
    const search = e.target.value.toLowerCase()
    let filtered = []
    if (searchType === "number") filtered = previews.filter(preview => preview.fileName.toLowerCase().split(" ").includes(search))
    else filtered = previews.filter(preview => preview.fileName.toLowerCase().includes(search))
    setFilteredPreviews(filtered)
  }

  return (
    <>
            <Heading backUrl={`/${category_name}`}>{ album_name.replaceAll("-", " ") }</Heading>
            {
              useNews &&
              <div className="news-btn-container">
                <button className="news-btn" onClick={() => navigate(`/news/${album.title}`, { replace: true })}>
                  <BsNewspaper size="1.5rem" color="white" />
                  <span>Guarda l'articolo</span>
                </button>
              </div>
            }
            {/* {
              clientAlbum.useVideo && <VideoButton text="Guarda i video" action={() => navigate(formatURL(`/${category_name}/album/${album_name}/video`))} />
            } */}
            { isFree 
            ? <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto</h2> 
            : 
            <>
              <h2 className="sub-title"><span className="highlighted">{ previews.length }</span> Foto a soli <span className="highlighted">€{ parseFloat((clientAlbum.priceInCents || basePrice) / 100).toFixed(2) }</span> l'una</h2>
              <h2 className="sub-title">Ogni <span className="highlighted">5 Foto</span> verrà applicato un <span className="highlighted">10% di sconto</span></h2>
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
            { useSearch &&
              <>
                <h1 className="search-title">Cerca tra le foto</h1>
                <SearchBar searchType={searchType ? searchType : "text"} width="80%" onChange={filterPreviews} placeholder={searchPlaceholder ? searchPlaceholder : ""} />
              </>
            }
            {
              ((searchChars > 0 && searchChars < minSearchChars) && searchType === "text") ?
              <h2 className="sub-title">Inserisci almeno { minSearchChars } caratteri nella ricerca</h2>
              :
                filteredPreviews.length < 1 ? <h2 className="sub-title">Nessuna foto trovata</h2> :
                <div className="photos-container">
                        <>
                            {
                                filteredPreviews.length > 0 && filteredPreviews.map((preview, previewIndex) => {
                                  return <PhotoCard key={previewIndex} category_name={category_name} album_name={album_name} imageName={preview.fileName} preview={`${previewsRoute}/${Object.keys(previewsStruct).find(key => key.toLowerCase().replaceAll(" ", "-") === category_name)}${sub_category_name !== undefined ? `/${subCategory.title}` : ""}/${album.title.replaceAll("-", " ")}/${preview.fileName}`} onAddToCart={() => {preview = onAddToCart(preview)}} addedToCart={preview.addedToCart} />
                                })
                            }
                        </>
                </div>
            }
    </>
  )
}
