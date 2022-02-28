const fs = require("fs")
const editJsonFile = require("edit-json-file")
const path = require("path")

let imagesFile = editJsonFile(path.join(__dirname, "./client/src/images.json"))
let previewsFile = editJsonFile(path.join(__dirname, "./client/src/previews.json"))

fs.readdir(path.join(__dirname, "./client/src/img"), (err, categories) => {
    if (err) throw new Error(err)
    categories.forEach(category => {
        fs.readdir(path.join(__dirname, `./client/src/img/${category}`), (err, albums) => {
            if (err) throw new Error(err)
            albums.forEach(album => {
                fs.readdir(path.join(__dirname, `./client/src/img/${category}/${album}`), (err, fileImages) => {
                    if (err) throw new Error(err)
                    imagesFile.append(category, {
                        title: album,
                        images: fileImages.map((fileName, i) => {
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
                })
            })
        })
    })
})

fs.readdir(path.join(__dirname, "./client/src/previews"), (err, categories) => {
    if (err) throw new Error(err)
    categories.forEach(category => {
        fs.readdir(path.join(__dirname, `./client/src/previews/${category}`), (err, albums) => {
            if (err) throw new Error(err)
            albums.forEach(album => {
                fs.readdir(path.join(__dirname, `./client/src/previews/${category}/${album}`), (err, filePreviews) => {
                    if (err) throw new Error(err)
                    previewsFile.append(category, {
                        title: album,
                        previews: filePreviews.map((fileName, i) => {
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
                })
            })
        })
    })
})