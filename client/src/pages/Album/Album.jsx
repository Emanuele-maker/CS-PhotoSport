import { useParams } from "react-router-dom"
import "./Album.scss"
import NotFound from "../404/404"
import formatURL from "../../formatURL"
import AlbumPage from "../../components/AlbumPage/AlbumPage"

export default function Album({ onAddToCart, previewsStruct, categories }) {
    const { category_name, sub_category_name, album_name } = useParams()

    const category = previewsStruct[Object.keys(previewsStruct).find(key => {
        return key.toLowerCase().replaceAll(" ", "-") === category_name
    })]
    const isFake = categories.find(category => formatURL(category.title) === category_name).fake
    if (!category && !categories.find(category => formatURL(category.title) === category_name).fake) return <NotFound />

    let subCategory, albums, album
    let useSub = false

    // search the album from the current category/sub category albums
    if (category?.subCategories && !isFake) {
        subCategory = category.subCategories.find(c => formatURL(c.title) === sub_category_name)
        if (!subCategory) return <NotFound />
        albums = subCategory.albums
        if (!albums) return <NotFound />
        album = albums.find(album => formatURL(album.title) === album_name)
        useSub = true
    } else if (!isFake) {
        album = category.find(album => formatURL(album.title) === album_name)
    }
    if (!album && !isFake) return <NotFound />

    const previews = album?.previews

    const clientAlbum = useSub ? categories.find(category => formatURL(category.title) === category_name).subCategories.find(sub => formatURL(sub.title) === sub_category_name).albums.find(album => formatURL(album.title) === album_name) : categories.find(category => formatURL(category.title) === category_name).albums.find(album => formatURL(album.title) === album_name)
    const { useSearch, isFree, searchPlaceholder, useNews, searchType, fake } = clientAlbum

    return (
        <>
            {
                <AlbumPage clientAlbum={clientAlbum} searchPlaceholder={searchPlaceholder} category={category} fake={fake} useNews={useNews} useSearch={useSearch} isFree={isFree} onAddToCart={onAddToCart} category_name={category_name} subCategory={subCategory} sub_category_name={sub_category_name} previews={previews} previewsStruct={previewsStruct} album={album} album_name={album_name} searchType={searchType}  />
            }
        </>
    )
}