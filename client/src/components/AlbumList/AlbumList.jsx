import { useParams } from "react-router-dom"
import "./AlbumList.scss"
import Heading from "../Heading/Heading"
import NotFound from "../../pages/404/404"
import formatURL from "../../formatURL"
import CardList from "../CardList/CardList"
import AlbumCard from "../AlbumCard/AlbumCard"

export default function AlbumList({ categories }) {
    const { category_name, sub_category_name } = useParams()

    const category = categories.find(c => formatURL(c.title) === category_name)
    if (!category) return <NotFound />
    // if there are sub categories and we are not in a sub category, render that sub category list
    if (category.subCategories && !sub_category_name) {
        const listContent = category.subCategories.map(({ title, cover }) => {
            return {
                title,
                cover,
                href: formatURL(`/${category_name}/${title}`)
            }
        })
        return (
            <div style={{ width: "100%" }}>
                <Heading backUrl={"/"}>{ category_name }</Heading>
                <CardList content={listContent} />
            </div>
        )
    }
    
    let subCategory, albums

    // if there are sub categories, render the albums that are in the sub category you are in
    if (category.subCategories) {
        subCategory = category.subCategories.find(sc => formatURL(sc.title) === sub_category_name)
        if (!subCategory) return <NotFound />
        else albums = subCategory.albums
    }
    else albums = category.albums

    const publicAlbums = albums.filter(album => !album.isPrivate)

    if (!albums) return <NotFound />

    const customList = publicAlbums.map((album) => {
        return <AlbumCard album={album} category_name={category_name} sub_category_name={sub_category_name} />
    })

    return (
        <>
            <Heading backUrl={`/${sub_category_name ? category_name : ""}`}>{ sub_category_name ? sub_category_name.replaceAll("-", " ") : category_name.replaceAll("-", " ") }</Heading>
            {
                publicAlbums.length === 0 &&
                <div className="albums-not-available">
                    <h2>Se sei interessato alle foto, contattaci al seguente indirizzo email:</h2>
                    <a href="mailto:cristian.salvadori@gmail.com">cristian.salvadori@gmail.com</a>
                </div>
            }
            <CardList custom_list={customList} />
        </>
    )
}