import "./Search.scss"
import { AiOutlineSearch } from "react-icons/ai"
import { useEffect, useState } from "react"
import AlbumCard from "../../AlbumCard/AlbumCard"

let searchParam = ""

export default function Search({ categories }) {
    const [filteredAlbums, setFilteredAlbums] = useState([])

    const initFilteredAlbums = () => {
        const albums = []
        categories.forEach(category => {
            category.albums.forEach(album => albums.push(album))
        })
        return albums
    }

    const startingAlbums = initFilteredAlbums()


    const updateFilteredAlbums = () => {
        if (searchParam.length < 1) return setFilteredAlbums(startingAlbums)
        const albums = initFilteredAlbums().filter(album => album.title.toLowerCase().includes(searchParam.toLowerCase()))
        setFilteredAlbums(albums)
    }

    const onChange = (event) => {
        searchParam = event.target.value
        updateFilteredAlbums()
    }

    useEffect(() => {
        setFilteredAlbums(startingAlbums)
        window.title = "CS PhotoSport: Cerca"
    }, [])

    return (
        <>
            <div className="search">
               <AiOutlineSearch color="white" size="2.2rem" />
               <input type="text" className="search-bar" placeholder="Inserisci il nome dell'album da cercare..." onInput={onChange} height="2rem" />
            </div>
            <div className="grid filtered-albums">
                {
                    filteredAlbums.map((album, albumIndex) => {
                        let category, subCategory
                        if (categories.find(category => category.subCategories?.albums.includes(album)) !== undefined) {
                            category = categories.find(category => category.subCategories?.find(subCategory => subCategory.albums.includes(album))).title
                            subCategory = category.category.subCategories?.find(subCategory => subCategory.albums.includes(album)).title
                        } else {
                            category = categories.find(category => category.albums.includes(album)).title
                        }
                        return <AlbumCard category={category} subCategory={subCategory} album={album} key={albumIndex} />
                    })
                }
            </div>
        </>
    )
}