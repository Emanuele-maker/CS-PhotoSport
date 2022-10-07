import fs from "fs"
import editJsonFile from "edit-json-file"
import path from "path"
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const loadImages = () => {
    let imagesFile = editJsonFile(path.join(__dirname, "../client/src/images.json"))
    let previewsFile = editJsonFile(path.join(__dirname, "../client/src/previews.json"))

    fs.readdir(path.join(__dirname, "../client/public/img"), (err, categories) => {
        if (err) throw new Error(err)
        categories.forEach(category => {
            fs.readdir(path.join(__dirname, `../client/public/img/${category}`), (err, subCategories) => {
                if (err) throw new Error(err)
                subCategories.forEach((subCategory, subCategoryIndex) => {
                    fs.readdir(path.join(__dirname, `../client/public/img/${category}/${subCategory}`), (err, albums) => {
                        if (err) throw new Error(err)
                        if (albums[0].endsWith(".jpg")) {
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
                                        addedToCart: false,
                                        favorite: false
                                    }
                                })
                            })
                            imagesFile.save()
                            return
                        }
                        albums.forEach(album => {
                            fs.readdir(path.join(__dirname, `../client/public/img/${category}/${subCategory}/${album}`), (err, fileImages) => {
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
                                                addedToCart: false,
                                                favorite: false
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
                                                        addedToCart: false,
                                                        favorite: false
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

    fs.readdir(path.join(__dirname, "../client/public/previews"), (err, categories) => {
        if (err) throw new Error(err)
        categories.forEach(category => {
            fs.readdir(path.join(__dirname, `../client/public/previews/${category}`), (err, subCategories) => {
                if (err) throw new Error(err)
                subCategories.forEach((subCategory, subCategoryIndex) => {
                    fs.readdir(path.join(__dirname, `../client/public/previews/${category}/${subCategory}`), (err, albums) => {
                        if (err) throw new Error(err)
                        if (albums[0].endsWith(".jpg")) {
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
                                        addedToCart: false,
                                        favorite: false
                                    }
                                })
                            })
                            previewsFile.save()
                            return
                        }
                        albums.forEach(album => {
                            fs.readdir(path.join(__dirname, `../client/public/previews/${category}/${subCategory}/${album}`), (err, fileImages) => {
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
                                                addedToCart: false,
                                                favorite: false
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
                                                        addedToCart: false,
                                                        favorite: false
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
}

export default loadImages