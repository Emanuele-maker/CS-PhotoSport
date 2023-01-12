import fs from "fs"
import editJsonFile from "edit-json-file"
import path from "path"
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

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

const loadImages = () => {
    moveImagesToPublic()
    console.log("loading images...")
    let imagesFile = editJsonFile(path.join(__dirname, "../client/src/images.json"))
    let previewsFile = editJsonFile(path.join(__dirname, "../client/src/previews.json"))

    fs.readdir(path.join(__dirname, "../img"), (err, categories) => {
        if (err) throw new Error(err)
        categories.forEach(category => {
            fs.readdir(path.join(__dirname, `../img/${category}`), (err, subCategories) => {
                if (err) throw new Error(err)
                subCategories.forEach((subCategory, subCategoryIndex) => {
                    fs.readdir(path.join(__dirname, `../img/${category}/${subCategory}`), (err, albums) => {
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
                            fs.readdir(path.join(__dirname, `../img/${category}/${subCategory}/${album}`), (err, fileImages) => {
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

    fs.readdir(path.join(__dirname, "../previews"), (err, categories) => {
        if (err) throw new Error(err)
        categories.forEach(category => {
            fs.readdir(path.join(__dirname, `../previews/${category}`), (err, subCategories) => {
                if (err) throw new Error(err)
                subCategories.forEach((subCategory, subCategoryIndex) => {
                    fs.readdir(path.join(__dirname, `../previews/${category}/${subCategory}`), (err, albums) => {
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
                            fs.readdir(path.join(__dirname, `../previews/${category}/${subCategory}/${album}`), (err, fileImages) => {
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