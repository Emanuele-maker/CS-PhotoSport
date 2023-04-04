import AlbumCard from "../AlbumCard/AlbumCard"
import { useParams } from "react-router-dom"
import "./AlbumList.scss"
import Heading from "../Heading/Heading"
import NotFound from "../pages/404/404"
import { useEffect } from "react"
import SubCategoryList from "../SubCategoryList/SubCategoryList"
import formatURL from "../../formatURL"

export default function AlbumList({ categories }) {
    const { category_name, sub_category_name } = useParams()

    useEffect(() => {
        document.title = `CS PhotoSport: ${category_name}`
        window.scrollTo(0, 0)
    }, [])
    const category = categories.find(c => formatURL(c.title) === category_name)
    if (!category) return <NotFound />
    if (category.subCategories && !sub_category_name) return <SubCategoryList categories={category.subCategories} generalCategories={categories} areSub={true} />
    
    let subCategory, albums

    if (category.subCategories) {
        subCategory = category.subCategories.find(sC => formatURL(sC.title) === sub_category_name)
        if (!subCategory) return <NotFound />
        else albums = subCategory.albums
    }
    else albums = category.albums

    const publicAlbums = albums.filter(album => !album.isPrivate)

    if (!albums) return <NotFound />

    return (
        <>
            <Heading backUrl="/">{ category.actualTitle || category_name.replaceAll("-", " ") }</Heading>
            {
                publicAlbums.length === 0 &&
                <div className="albums-not-available">
                    <h2>Se sei interessato alle foto, contattaci al seguente indirizzo email:</h2>
                    <a href="mailto:cristian.salvadori@gmail.com">cristian.salvadori@gmail.com</a>
                </div>
            }
            <div className="grid-container">
                <div className="grid list-container">
                    { publicAlbums.map((album, albumIndex) => {
                        return (<AlbumCard key={albumIndex} album={album} category={category_name} subCategory={sub_category_name} />)
                    }) }
                </div>
            </div>
        </>
    )
}