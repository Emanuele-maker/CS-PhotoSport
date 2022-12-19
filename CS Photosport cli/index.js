#!/usr/bin/env node

import staticInfo from "./staticInfo.js"
import loadImages from "./loadImages.js"
import editJsonFile from "edit-json-file"

import { execSync } from "child_process"
import colors from "colors"
import fs from "fs"
import inquirer from "inquirer"
import chalkAnimation from "chalk-animation"

let newCategory = {
    title: "",
    cover: "",
    albums: []
}

let newAlbum = {
    title: "",
    category: "",
    cover: "",
    isFree: false,
    useSearch: false,
    searchPlaceholder: null,
    searchType: null,
    priceInCents: 0,
    tags: []
}

const categoriesFile = editJsonFile("../client/src/categories.json")
const categories = [...categoriesFile.data.categories]

const sleep = async(ms = 2500) => new Promise((r) => setTimeout(r, ms))

const welcome = async() => {
    const rainbowWelcome = chalkAnimation.rainbow("Ciao Boomerss, benvenuto nello strumento per aggiornare CS Photosport! \n")

    await sleep()

    rainbowWelcome.stop()
}

const moveImagesToPublic = async() => {
    fs.readdir("../client/public/img", (err, files) => {
        if (err || files.length === 0) {
            execSync("move ..\\img ..\\client\\public", { "shell": "powershell.exe" }, (err, stdout, stderr) => {
                if (err) console.error(err)
            })
        }
    })
    fs.readdir("../client/public/previews", (err, files) => {
        if (err || files.length === 0) {
            execSync("move ..\\previews ..\\client\\public", { "shell": "powershell.exe" }, (err, stdout, stderr) => {
                if (err) console.error(err)
            })
        }
    })
}

const execSyncBuildImages = async() => {
    console.log(colors.green("Sto compilando i puntatori delle foto, un attimo, tigre..."))
    const build = execSync("break>..\\client\\src\\images.json && break>..\\client\\src\\previews.json && move ..\\client\\public\\img ..\\ && move ..\\client\\public\\previews ..\\", (err, stdout, stderr) => {
        if (err) console.error(err)
    })
    console.log(build.toString("hex"))
    loadImages()
}

const buildReact = async() => {
    // const answer = inquirer.prompt({
    //     name: "use_react",
    //     message: "Vuoi compilare React?",
    //     type: "list",
    //     choices: [
    //         "Si",
    //         "No"
    //     ],
    //     default() {
    //         return "Si"
    //     }
    // })
    // if (answer.use_react === "No") return
    console.log(colors.green("Sto costruendo React, un attimo, tigre..."))
    execSync("cd .. && npm run build", (err, stdout, stderr) => {
        console.log(stdout)
        if (err) console.error(err)
    })
        // execSync("", {"shell": "powershell.exe"}, (err, stdout, stderr) => {
    //     if (err) console.error(err)
    // })
    // execSync("", (err, stdout, stderr) => {
    //     console.log(stdout)
    //     if (err) console.error(err)
    // }).on("message", (message) => {
    //     console.log(message)
    // })
}

const main = async() => {
    const answers = await inquirer.prompt({
        name: "config_type",
        type: "list",
        message: "Per iniziare seleziona cosa vuoi aggiornare nel sito (Assicurati di aver travasato le foto)",
        choices: [
            "Crea Categoria",
            "Crea Album",
        ]
    })
    
    if (answers.config_type === "Crea Categoria") await configureCategory()
    if (answers.config_type === "Crea Album") await configureAlbum()
}

const goodbye = async() => {
    const text = chalkAnimation.rainbow("Grazie per aver utilizzato il programma!")
    console.log("Prosegui nel file passaggi.txt per continuare la procedura di aggiornamento!")
    text.stop()
    process.exit(0)
}

const configureAlbum = async() => {
    const newCategoryExists = newCategory.title.length > 0
    const questions = [
        {
            name: "album_name",
            type: "input",
            message: "Nome dell'Album"
        },
        {
            name: "album_cover",
            type: "input",
            message: "Cover dell'Album SENZA .jpg",
            default() {
                return "es. IMG_0001"
            }
        },
        {
            name: "isFree",
            type: "list",
            message: "L'album è gratis?",
            choices: [
                "Si",
                "No"
            ]
        }
    ]
    if (!newCategoryExists) questions.unshift({
        name: "category_name",
        type: "list",
        message: "Seleziona la categoria in cui vuoi inserire l'album",
        choices: categories.filter(category => !category.fake).map(category => {
            return category.title
        })
    })
    else console.log("Configura il primo album nella categoria appena creata")
    const album = await inquirer.prompt(questions)

    newAlbum.title = album.album_name
    newAlbum.category = newCategoryExists ? newCategory.title : album.category_name 
    newAlbum.cover = `${staticInfo.previewsRoute}/${newCategoryExists ? newCategory.title : album.category_name}/${newAlbum.title}/${album.album_cover}.jpg`
    newAlbum.isFree = album.isFree === "Si"

    if (album.isFree === "No") {
        const priceInfo = await inquirer.prompt({
            name: "price",
            type: "input",
            message: "Prezzo in € delle foto dell'album",
            default() {
                return "3"
            }
        })
        newAlbum.priceInCents = priceInfo.price * 100
    }
    
    // if (album.useSearch === "Si") {
    //     const searchInfo = await inquirer.prompt([
    //         {
    //             name: "searchType",
    //             type: "list",
    //             choices: [
    //                 "text",
    //                 "number"
    //             ],
    //             message: "Scegli il tipo di ricerca da effettuare tra le foto (text è come PAGLIEI, number è come i pettorali)"
    //         },
    //         {
    //             name: "searchPlaceholder",
    //             type: "input",
    //             message: "Testo da scrivere nella casella input di ricerca",
    //             default() {
    //                 return "Inserisci una parola chiave per la ricerca..."
    //             }
    //         }
    //     ])
    //     newAlbum.useSearch = true
    //     newAlbum.searchPlaceholder = searchInfo.searchPlaceholder
    //     newAlbum.searchType = searchInfo.searchType
    // }

    if (newCategoryExists) newCategory.albums.push(newAlbum)
    else {
        categories.find(category => category.title === album.category_name)?.albums.unshift(newAlbum)
        categoriesFile.set("categories", categories)
        categoriesFile.save()
    }
}

const configureCategory = async() => {
    const category = await inquirer.prompt([
        {
            name: "category_name",
            type: "input",
            message: "Nome Categoria"
        },
        {
            name: "create_first_album",
            message: "Vuoi creare il primo album per questa categoria?",
            type: "list",
            choices: [
                "Si",
                "No"
            ]
        },
    ])

    newCategory.title = category.category_name

    if (category.create_first_album === "Si") await configureAlbum()

    const categoryCover = await inquirer.prompt({
        name: "category_cover",
        type: "input",
        message: "Cover della categoria che vuoi creare SENZA .jpg",
        default() {
            return "es. IMG_0001"
        }
    })
    newCategory.cover = `${staticInfo.previewsRoute}/${category.category_name}/${newAlbum.title}/${categoryCover.category_cover}.jpg`

    categories.push(newCategory)
    categoriesFile.set("categories", categories)
    categoriesFile.save()
}

await moveImagesToPublic()
await welcome()
await main()
await goodbye()
// await execSyncBuildImages()
// await buildReact()