import editJsonFile from "edit-json-file"
import inquirer from "inquirer"

const categoriesFile = editJsonFile("../client/src/categories.json")
const categories = [...categoriesFile.data.categories]

const main = async() => {
    const answer = await inquirer.prompt({
        name: "mode",
        type: "list",
        message: "prod or dev?",
        choices: [
            "production",
            "development"
        ]
    })

    if (answer.mode === "production") {
        categories.map(category => {
            category.cover = category.cover.replace("http://localhost:3000", "https://csphotosport.com")
            category.albums.map(album => {
                album.cover = album.cover.replace("http://localhost:3000", "https://csphotosport.com")
            })
        })
    } else {
        categories.map(category => {
            category.cover = category.cover.replace("https://csphotosport.com", "http://localhost:3000")
            category.albums.map(album => {
                album.cover = album.cover.replace("https://csphotosport.com", "http://localhost:3000")
            })
        })
    }

    categoriesFile.set("categories", categories)
    categoriesFile.save()
}

await main()