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
    albums: [],
    subCategories: []
}

let newSubCategory = {
    title: "",
    cover: "",
    category: "",
    albums: []
}

let newAlbum = {
    title: "",
    category: "",
    cover: "",
    subCategory: "",
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
            execSync("move ..\\img ..\\client\\public", { "shell": "powershell.exe" })
        }
    })
    fs.readdir("../client/public/previews", (err, files) => {
        if (err || files.length === 0) {
            execSync("move ..\\previews ..\\client\\public", { "shell": "powershell.exe" })
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

const main = async() => {
    const answers = await inquirer.prompt({
        name: "config_type",
        type: "list",
        message: "Per iniziare seleziona cosa vuoi aggiornare nel sito (Assicurati di aver travasato le foto)",
        choices: [
            "Crea Categoria",
            "Crea Album",
            "Crea Sottocategoria"
        ]
    })
    
    if (answers.config_type === "Crea Categoria") await configureCategory()
    if (answers.config_type === "Crea Album") await configureAlbum()
    if (answers.config_type === "Crea Sottocategoria") await configureSubCategory()
}

const goodbye = async() => {
    const text = chalkAnimation.rainbow("Grazie per aver utilizzato il programma!")
    console.log("Prosegui nel file passaggi.txt per continuare la procedura di aggiornamento!")
    text.stop()
    process.exit(0)
}

const configureAlbum = async() => {
    const newCategoryExists = newCategory.title.length > 0
    const subCategoryExists = newSubCategory.title.length > 0
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
        },
        {
            name: "isPrivate",
            type: "list",
            message: "L'album è privato?",
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
        choices: categories.map(category => {
            return category.title
        })
    })
    else console.log(`Configura il primo album nella categoria appena creata`)
    const album = await inquirer.prompt(questions)
    const useSub = categories.find(category => category.title === album.category_name).subCategories !== undefined

    const subQuestions = []
    let subInq
    
    if (useSub && !newCategoryExists) subQuestions.unshift({
        name: "sub_category_name",
        type: "list",
        message: "Seleziona la sottocategoria in cui vuoi inserire l'album",
        choices: categories.find(category => category.title === album.category_name).subCategories.map(sub => {
            return sub.title
        })
    })
    else if (useSub && newCategoryExists) subQuestions.unshift({
        name: "sub_category_name",
        type: "list",
        message: "Seleziona la sottocategoria in cui vuoi inserire l'album",
        choices: categories.find(category => category.title === newCategory.title).subCategories.map(sub => {
            return sub.title
        })
    })

    if (!subCategoryExists) subInq = await inquirer.prompt(subQuestions)

    newAlbum.title = album.album_name
    if (useSub) newAlbum.subCategory = subCategoryExists ? newSubCategory.title : subInq.sub_category_name
    newAlbum.category = newCategoryExists ? newCategory.title : album.category_name 
    newAlbum.cover = `${staticInfo.previewsRoute}/${newCategoryExists ? newCategory.title : album.category_name}/${useSub ? (subCategoryExists ? `${newSubCategory.title}/` : `${subInq.sub_category_name}/`) : ""}${newAlbum.title}/${album.album_cover}.jpg`
    newAlbum.isFree = album.isFree === "Si"
    newAlbum.isPrivate = album.isPrivate === "Si"

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

    if (newCategoryExists && !useSub) newCategory.albums.push(newAlbum)
    else if (!useSub) {
        delete newAlbum.subCategory
        categories.find(category => category.title === album.category_name)?.albums.unshift(newAlbum)
    } else if (subCategoryExists) {
        newAlbum.subCategory = newSubCategory.title
        newSubCategory.albums.unshift(newAlbum)
        newSubCategory.title = subInq.sub_category_name
        categories.find(category => category.title === album.category_name)?.subCategories.unshift(newSubCategory)
    } else {
        newAlbum.subCategory = subInq.sub_category_name
        categories.find(category => category.title === album.category_name)?.subCategories.find(sub => sub.title === subInq.sub_category_name).albums.unshift(newAlbum)
    }
    categoriesFile.set("categories", categories)
    categoriesFile.save()
}

const configureSubCategory = async() => {
    const newCategoryExists = newCategory.title.length > 0
    const questions = [
        {
            name: "sub_category_name",
            type: "input",
            message: "Nome della sottocategoria"
        },
        {
            name: "create_first_album",
            type: "list",
            message: "Vuoi creare il primo album per questa sottocategoria?",
            choices: [
                "Si",
                "No"
            ]
        }
    ]

    if (!newCategoryExists) questions.unshift({
        name: "category_name",
        type: "list",
        message: "Seleziona la categoria in cui creare la sottocategoria",
        choices: categories.filter(category => category.subCategories !== undefined).map(category => {
            return category.title
        })
    })

    const subCategory = await inquirer.prompt(questions)

    newSubCategory.title = subCategory.sub_category_name

    if (subCategory.create_first_album === "Si") await configureAlbum(true)

    const subCategoryCover = await inquirer.prompt({
        name: "sub_category_cover",
        type: "input",
        message: "Cover della categoria che vuoi creare SENZA .jpg",
        default() {
            return "es. IMG_0001"
        }
    })

    newSubCategory.cover = `${staticInfo.previewsRoute}/${newCategoryExists ? newCategory.title : subCategory.category_name}/${newSubCategory.title}/${newAlbum.title}/${subCategoryCover.sub_category_cover}.jpg`

    if (!newCategoryExists) {
        categories.find(category => category.title === subCategory.category_name).subCategories.unshift(newSubCategory)
    } else {
        categories.unshift(newCategory)
    }
    categoriesFile.set("categories", categories)
    categoriesFile.save()
}

const configureCategory = async() => {
    const category = await inquirer.prompt([
        {
            name: "category_name",
            type: "input",
            message: "Nome Categoria"
        },
        {
            name: "choose_sub_album",
            type: "list",
            message: "Vuoi creare una sottocategoria o un album?",
            choices: [
                "Sottocategoria",
                "Album"
            ]
        }
    ])

    newCategory.title = category.category_name

    if (category.choose_sub_album === "Sottocategoria") await configureSubCategory()

    if (category.choose_sub_album === "Album") await configureAlbum()

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