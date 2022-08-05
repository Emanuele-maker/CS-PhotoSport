import "./SearchPage.scss"
import { useEffect, useState } from "react"
import AlbumCard from "../../AlbumCard/AlbumCard"
import FreePhotoCard from "../../FreePhotoCard/FreePhotoCard"
import PhotoCard from "../../PhotoCard/PhotoCard"
import SearchBar from "../../SearchBar/SearchBar"
import Heading from "../../Heading/Heading"
import { previewsRoute } from "../../../staticInfo"
import { AiOutlineSearch } from "react-icons/ai"
import formatURL from "../../../formatURL"

export default function SearchPage({ categories, previewsStruct, onAddImageToCart }) {
    const [filteredItems, setFilteredItems] = useState([])
    const [searchParam, setSearchParam] = useState("")
    const [showNoResults, setShowNoResults] = useState(false)

    const initFilteredItems = () => {
        const items = []
        categories.forEach(category => {
            category.albums.forEach(album => items.push(album))
            const structAlbums = previewsStruct[category.title]
            structAlbums.forEach(album => {
                album.previews.forEach(preview => {
                    items.push(preview)
                })
            })
        })
        return items
    }

    const anythingInCommon = (str1, str2) => {
        if (str2.length < str1.length) return anythingInCommon(str2, str1)
    
        for (let i = 0, len = str1.length; i < len; i++) {
            if (str2.indexOf(str1[i]) !== -1) return true
        }

        return false
    }

    const updateFilteredItems = () => {
        if (searchParam.length < 1) return setFilteredItems([])
        const imgParam = "IMG_"
        const items = initFilteredItems().filter(item => {
            if (item.title) {
                if (item.tags && item.tags.length > 0) return item.title.toLowerCase().includes(searchParam.toLowerCase()) || item.tags.find(tag => tag.toLowerCase() === searchParam.toLowerCase())
                return item.title.toLowerCase().includes(searchParam.toLowerCase())
            }
            if (item.fileName) return (item.fileName.toLowerCase().includes(searchParam.toLowerCase()) && !anythingInCommon(searchParam.toLowerCase(), imgParam.toLowerCase()) && item.fileName.includes(imgParam))
        })
        if (items.length < 1) setShowNoResults(true)
        else setShowNoResults(false)
        setFilteredItems(items)
    }

    useEffect(() => {
        window.title = "CS PhotoSport: Cerca"
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Heading backUrl={-1}>Ricerca</Heading>
            <h1 className="sub-title">Effettua una ricerca tra gli album del sito</h1>
            <div className="search-page-container">
                <SearchBar notUseSearchIcon={true} placeholder="Inserisci una parola chiave..." onChange={(event) => setSearchParam(event.target.value)} width="100%" />
                <button onClick={updateFilteredItems} className="search-submit">
                    <AiOutlineSearch size="2.5rem" />
                    <span>CERCA</span>
                </button>
            </div>
            { showNoResults && <h1 className="sub-title">Nessun risultato trovato</h1> }
            <div className="grid filtered-albums">
                {
                    filteredItems.map((item, itemIndex) => {
                        let category, subCategory
                        if (item.title) {
                            if (categories.find(category => category.subCategories?.albums.includes(item)) !== undefined) {
                                category = categories.find(category => category.subCategories?.find(subCategory => subCategory.albums.includes(item))).title
                                subCategory = category.category.subCategories?.find(subCategory => subCategory.albums.includes(item)).title
                            } else {
                                category = categories.find(category => category.albums.includes(item)).title
                            }
                            return <AlbumCard category={category} subCategory={subCategory} album={item} key={itemIndex} />
                        }
                        if (item.fileName) {
                            const isAlbumFree = categories.find(category => category.title === item.category).albums.find(album => album.title === item.album).isFree
                            if (isAlbumFree) return <FreePhotoCard category_name={formatURL(item.category)} album_name={formatURL(item.album)} key={itemIndex} imageName={item.fileName} preview={`${previewsRoute}/${item.category}/${item.album}/${item.fileName}`} />
                            else return <PhotoCard category_name={formatURL(item.category)} album_name={formatURL(item.album)} key={itemIndex} onAddToCart={onAddImageToCart} addedToCart={item.addedToCart} imageName={item.fileName} preview={`${previewsRoute}/${item.category}/${item.album}/${item.fileName}`} />
                        }
                    })
                }
            </div>
        </>
    )
}