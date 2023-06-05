import CardList from "../CardList/CardList"
import formatURL from "../../formatURL"

export default function CategoryList({ categoriesToRender }) {
    const listContent = categoriesToRender.map(({ title, cover }) => {
        return {
            title,
            cover,
            href: formatURL(`/${title}`)
        }
    })

    return <CardList content={listContent} />
}