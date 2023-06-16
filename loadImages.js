const path = require("path")
const dirTree = require("directory-tree")
const editJsonFile = require("edit-json-file")

const treeIMG = dirTree(path.join(__dirname, "/client/public/img"))
const treePrev = dirTree(path.join(__dirname, "/client/public/img"))

const jsonIMG = editJsonFile(path.join(__dirname, "/client/src/images.json"))
const jsonPrev = editJsonFile(path.join(__dirname, "/client/src/previews.json"))

const imagesStruct = treeIMG.children.map(categoryFile => {
    let category = {
        title: categoryFile.name,
        subCategories: [],
        albums: []
    }
    categoryFile.children.forEach(subCategoryFile => {
        if (subCategoryFile.children[0].name.endsWith(".jpg")) {
            delete category.subCategories
            const albumName = subCategoryFile.name
            const albumImages = subCategoryFile.children.map((image, i) => {
                return {
                    index: i,
                    fileName: image.name,
                    album: albumName,
                    category: categoryFile.name,
                    addedToCart: false,
                    favorite: false
                }
            })
            category.albums.push({
                title: albumName,
                images: albumImages
            })
        } else {
            delete category.albums
            const albums = subCategoryFile.children.map(album => {
                const albumImages = album.children.map((image, i) => {
                    return {
                        index: i,
                        fileName: image.name,
                        album: album.name,
                        category: categoryFile.name,
                        subCategory: subCategoryFile.name,
                        addedToCart: false,
                        favorite: false
                    }
                })
                return {
                    title: album.name,
                    images: albumImages
                }
            })
            category.subCategories.push({
                title: subCategoryFile.name,
                albums
            })
        }
    })
    return category
})

const prevStruct = treePrev.children.map(categoryFile => {
    let category = {
        title: categoryFile.name,
        subCategories: [],
        albums: []
    }
    categoryFile.children.forEach(subCategoryFile => {
        if (subCategoryFile.children[0].name.endsWith(".jpg")) {
            delete category.subCategories
            const albumName = subCategoryFile.name
            const albumPreviews = subCategoryFile.children.map((image, i) => {
                return {
                    index: i,
                    fileName: image.name,
                    album: albumName,
                    category: categoryFile.name,
                    addedToCart: false,
                    favorite: false
                }
            })
            category.albums.push({
                title: albumName,
                previews: albumPreviews
            })
        } else {
            delete category.albums
            const albums = subCategoryFile.children.map(album => {
                const albumPreviews = album.children.map((image, i) => {
                    return {
                        index: i,
                        fileName: image.name,
                        album: album.name,
                        category: categoryFile.name,
                        subCategory: subCategoryFile.name,
                        addedToCart: false,
                        favorite: false
                    }
                })
                return {
                    title: album.name,
                    previews: albumPreviews
                }
            })
            category.subCategories.push({
                title: subCategoryFile.name,
                albums
            })
        }
    })
    return category
})

jsonIMG.set("images", imagesStruct)
jsonIMG.save()

jsonPrev.set("previews", prevStruct)
jsonPrev.save()