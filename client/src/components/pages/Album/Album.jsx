import { useParams } from "react-router-dom"
import "./Album.scss"
import { useEffect } from "react"
import NotFound from "../404/404"
import formatURL from "../../../formatURL"
import AlbumPage from "../../AlbumPage/AlbumPage"

export default function Album({ onAddToCart, previewsStruct, categories }) {
    const { category_name, sub_category_name, album_name } = useParams()

    useEffect(() => {
        document.title = `CS PhotoSport: ${album_name}`
    }, [album_name])

    const category = previewsStruct[Object.keys(previewsStruct).find(key => {
        return key.toLowerCase().replaceAll(" ", "-") === category_name
    })]
    if (!category) return <NotFound />

    let subCategory, albums, album

    if (category.subCategories) {
        subCategory = category.subCategories.find(c => formatURL(c.title) === sub_category_name)
        if (!subCategory) return <NotFound />
        albums = subCategory.albums
        if (!albums) return <NotFound />
        album = albums.find(album => album.title === album_name)
    } else {
        album = category.find(album => formatURL(album.title) === album_name)
    }
    if (!album) return <NotFound />

    const previews = album.previews

    const { useSearch, isFree, searchPlaceholder, useNews } = categories.find(category => formatURL(category.title) === category_name).albums.find(album => formatURL(album.title) === album_name)

    return (
        <>
            {
                <AlbumPage searchPlaceholder={searchPlaceholder} category={category} useNews={useNews} useSearch={useSearch} isFree={isFree} onAddToCart={onAddToCart} category_name={category_name} subCategory={subCategory} sub_category_name={sub_category_name} previews={previews} previewsStruct={previewsStruct} album={album} album_name={album_name}  />
            }
        </>
    )
}