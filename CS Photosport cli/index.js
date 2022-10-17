#!/usr/bin/env node

import staticInfo from "./staticInfo.js"
import loadImages from "./loadImages.js"
import filterPhotos from "./filterImages.js"
import editJsonFile from "edit-json-file"

import { exec } from "child_process"
import colors from "colors"
import fs from "fs"
import inquirer from "inquirer"
import chalk from "chalk"
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
    const rainbowWelcome = chalkAnimation.rainbow("Ciao Boomerss, benvenuto nello strumento per aggiornare CS Photosport \n")

    await sleep()

    rainbowWelcome.stop()
}

const moveImagesToPublic = async() => {
    fs.readdir("../client/public/img", (err, files) => {
        if (err || files.length === 0) {
            exec("move ..\\img ..\\client\\public", { "shell": "powershell.exe" }, (err, stdout, stderr) => {
                if (err) console.error(err)
            })
        }
    })
    fs.readdir("../client/public/previews", (err, files) => {
        if (err || files.length === 0) {
            exec("move ..\\previews ..\\client\\public", { "shell": "powershell.exe" }, (err, stdout, stderr) => {
                if (err) console.error(err)
            })
        }
    })
}

const execBuildImages = async() => {
    exec("break>..\\client\\src\\images.json && break>..\\client\\src\\previews.json", (err, stdout, stderr) => {
        if (err) console.error(err)
    })
    console.log(colors.green("Sto compilando i puntatori delle foto, un attimo, tigre..."))
    loadImages()
}

const buildReact = async() => {
    const answer = inquirer.prompt({
        name: "use_react",
        message: "Vuoi compilare React?",
        type: "list",
        choices: [
            "Si",
            "No"
        ]
    })
    if (answer.use_react === "No") return
    exec("move ..\\client\\public\\img ..\\", {"shell": "powershell.exe"}, (err, stdout, stderr) => {
        if (err) console.error(err)
    })
    exec("move ..\\client\\public\\previews ..\\", {"shell": "powershell.exe"}, (err, stdout, stderr) => {
        if (err) console.error(err)
    })
    console.log(colors.green("Sto costruendo React, un attimo, tigre..."))
    exec("cd .. && npm run build", (err, stdout, stderr) => {
        if (err) console.error(err)
    })
}

const main = async() => {
    const answers = await inquirer.prompt({
        name: "config_type",
        type: "list",
        message: "Per iniziare seleziona cosa vuoi aggiornare nel sito",
        choices: [
            "Crea Categoria",
            "Crea Album (Assicurati di aver travasato le foto)",
            "Aggiungi foto a un album (Assicurati di aver travasato le foto)",
            "Filtra foto in un album"
        ]
    })
    
    if (answers.config_type === "Crea Categoria") await configureCategory()
    if (answers.config_type === "Crea Album (Assicurati di aver travasato le foto)") await configureAlbum()
    if (answers.config_type === "Filtra foto in un album") await filterImages()
}

const filterImages = async() => {
    const allAlbums = []
    categories.map(category => {
        category.albums.map(album => {
            if (!album.fake) allAlbums.push(album)
        })
    })
    const answers = inquirer.prompt([
        {
            name: "album",
            type: "list",
            message: "Album in cui filtrare le foto",
            choices: allAlbums
        },
        {
            name: "origin_path",
            type: "input",
            message: "Il percorso della cartella dell'hard disk da cui hai travasato le foto"
        }
    ])
    const folder1 = `../client/public/img/${categories.find(category => category.albums.map(album => album.title === answers.album))?.title}/${answers.album}`
    const folder2 = answers.origin_path
    filterPhotos(folder1, folder2)
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
            message: "Cover dell'Album",
            default() {
                return "IMG_0001"
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
        },
        {
            name: "useSearch",
            type: "list",
            choices: [
                "Si",
                "No"
            ],
            message: "Vuoi usare la ricerca nell'album?"
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
    newAlbum.cover = `${staticInfo.previewsRoute}/${newCategoryExists ? newCategory.name : album.category_name}/${newAlbum.title}/${album.album_cover}`
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
    
    if (album.useSearch === "Si") {
        const searchInfo = await inquirer.prompt([
            {
                name: "searchType",
                type: "list",
                choices: [
                    "text",
                    "number"
                ],
                message: "Scegli il tipo di ricerca da effettuare tra le foto (text è come PAGLIEI, number è come i pettorali)"
            },
            {
                name: "searchPlaceholder",
                type: "input",
                message: "Testo da scrivere nella casella input di ricerca",
                default() {
                    return "Inserisci una parola chiave per la ricerca..."
                }
            }
        ])
        newAlbum.useSearch = true
        newAlbum.searchPlaceholder = searchInfo.searchPlaceholder
        newAlbum.searchType = searchInfo.searchType
    }

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
        message: "Cover della categoria che vuoi creare",
        default() {
            return "IMG_0001"
        }
    })
    newCategory.cover = `${staticInfo.previewsRoute}/${category.category_name}/${newAlbum.title}/${categoryCover.category_cover}`

    categories.push(newCategory)
    categoriesFile.set("categories", categories)
    categoriesFile.save()
}

await moveImagesToPublic()
await welcome()
await main()
await execBuildImages()
await buildReact()
await moveImagesToPublic()