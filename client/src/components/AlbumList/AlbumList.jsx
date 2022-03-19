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

    if (!albums) return <NotFound />

    return (
        <>
            <Heading>{ category_name.replaceAll("-", " ") }</Heading>
            <div className="grid albums-container">
                { albums.map((album, albumIndex) => {
                    return (<AlbumCard key={albumIndex} album={album} category={category_name} subCategory={sub_category_name} />)
                }) }
            </div>
        </>
    )
}