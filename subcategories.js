const fs = require("fs")
const path = require("path")
const editJsonFile = require("edit-json-file")

let imagesFile = editJsonFile(path.join(__dirname, "./client/src/images.json"))

fs.readdir(path.join(__dirname, "/client/public/img"), (err, categories) => {
    if (err) throw err
    categories.forEach(category => {
        const subCategoriesStruct = []
        const albumsStruct = []
        fs.readdir(path.join(__dirname, `/client/public/img/${category}`), (err, subCategories) => {
            if (err) throw err
            subCategories.forEach(subCategory => {
                fs.readdir(path.join(__dirname, `/client/public/img/${category}/${subCategory}`), (err, albums) => {
                    if (err) throw err
                    if (albums[0].endsWith(".jpg")) {
                        albumsStruct.push({
                            title: subCategory,
                            previews: albums.map((fileName, i) => {
                                return {
                                    index: i,
                                    fileName,
                                    album: subCategory,
                                    category,
                                    addedToCart: false,
                                    favorite: false
                                }
                            })
                        })
                        imagesFile.set(category, {
                            title: category,
                            albums: albumsStruct
                        })
                        imagesFile.save()
                    } else {
                        let subAlbumsStruct = []
                        albums.map(album => {
                            console.log("looping albums")
                            fs.readdir(path.join(__dirname, `/client/public/img/${category}/${subCategory}/${album}`), (err, images) => {
                                if (err) throw err
                                subAlbumsStruct.push({
                                    title: album,
                                    previews: images.map((image, i) => {
                                        return {
                                            index: i,
                                            subCategory,
                                            fileName: image,
                                            album,
                                            category,
                                            addedToCart: false,
                                            favorite: false
                                        }
                                    })
                                })
                            })
                        })
                        subCategoriesStruct.push({
                            title: subCategory,
                            albums: subAlbumsStruct
                        })
                        console.log("done pushing to subs")
                    }
                })
            })
            imagesFile.set(category, {
                title: category,
                subCategories: subCategoriesStruct
            })
            imagesFile.save()
        })
    })
})