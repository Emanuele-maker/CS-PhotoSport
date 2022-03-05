const fs = require("fs")
const editJsonFile = require("edit-json-file")
const path = require("path")

let imagesFile = editJsonFile(path.join(__dirname, "./client/src/images.json"))
let previewsFile = editJsonFile(path.join(__dirname, "./client/src/previews.json"))

fs.readdir(path.join(__dirname, "./client/src/img"), (err, categories) => {
    if (err) throw new Error(err)
    categories.forEach(category => {
        fs.readdir(path.join(__dirname, `./client/src/img/${category}`), (err, subCategories) => {
            if (err) throw new Error(err)
            subCategories.forEach((subCategory, subCategoryIndex) => {
                fs.readdir(path.join(__dirname, `./client/src/img/${category}/${subCategory}`), (err, albums) => {
                    if (err) throw new Error(err)
                    albums.forEach(album => {
                        fs.readdir(path.join(__dirname, `./client/src/img/${category}/${subCategory}/${album}`), (err, fileImages) => {
                            if (err) {
                                const images = albums
                                const album = subCategories[subCategoryIndex]
                                imagesFile.append(category, {
                                    title: album,
                                    images: images.map((fileName, i) => {
                                        return {
                                            index: i,
                                            fileName: fileName,
                                            album: album,
                                            category: category,
                                            addedToCart: false
                                        }
                                    })
                                })
                                imagesFile.save()
                                return
                            }
                            imagesFile.set(category, {
                                subCategories: subCategories.map(subC => {
                                    return {
                                        title: subCategory,
                                        albums: albums.map(album => {
                                        return {
                                            title: album,
                                            images: fileImages.map((fileName, i) => {
                                                return {
                                                    index: i,
                                                    fileName: fileName,
                                                    album: album,
                                                    category: category,
                                                    subCategory: subC,
                                                    addedToCart: false
                                                }
                                            })
                                        }
                                        })
                                    }
                                })
                            })
                            imagesFile.save()
                        })
                    })
                })
            })
        })
    })
})

fs.readdir(path.join(__dirname, "./client/src/previews"), (err, categories) => {
    if (err) throw new Error(err)
    categories.forEach(category => {
        fs.readdir(path.join(__dirname, `./client/src/previews/${category}`), (err, subCategories) => {
            if (err) throw new Error(err)
            subCategories.forEach((subCategory, subCategoryIndex) => {
                fs.readdir(path.join(__dirname, `./client/src/previews/${category}/${subCategory}`), (err, albums) => {
                    if (err) throw new Error(err)
                    albums.forEach(album => {
                        fs.readdir(path.join(__dirname, `./client/src/previews/${category}/${subCategory}/${album}`), (err, fileImages) => {
                            if (err) {
                                const images = albums
                                const album = subCategories[subCategoryIndex]
                                previewsFile.append(category, {
                                    title: album,
                                    previews: images.map((fileName, i) => {
                                        return {
                                            index: i,
                                            fileName: fileName,
                                            album: album,
                                            category: category,
                                            addedToCart: false
                                        }
                                    })
                                })
                                previewsFile.save()
                                return
                            }
                            previewsFile.set(category, {
                                subCategories: subCategories.map(subC => {
                                    return {
                                        title: subCategory,
                                        albums: albums.map(album => {
                                        return {
                                            title: album,
                                            previews: fileImages.map((fileName, i) => {
                                                return {
                                                    index: i,
                                                    fileName: fileName,
                                                    album: album,
                                                    category: category,
                                                    subCategory: subC,
                                                    addedToCart: false
                                                }
                                            })
                                        }
                                        })
                                    }
                                })
                            })
                            previewsFile.save()
                        })
                    })
                })
            })
        })
    })
})