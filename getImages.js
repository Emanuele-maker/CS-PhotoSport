const fs = require("fs")
const path = require("path")

const getImages = () => {
    const images = []
    fs.readdir(path.join(__dirname, `/client/public/img`), (err, categories) => {
        if (err) throw err
        categories.map(category => {
            fs.readdir(path.join(__dirname, `/client/public/img/${category}`), (err, subCategories) => {
                if (err) throw err
                subCategories.map(subCategory => {
                    fs.readdir(path.join(__dirname, `/client/public/img/${category}/${subCategory}`), (err, albums) => {
                        if (err) throw err
                        if (albums[0].endsWith(".jpg")) return
                        albums.map(album => {
                            fs.readdir(path.join(__dirname, `/client/public/img/${category}/${subCategory}/${album}`), (err, files) => {
                                images.push([...files.map(fileName => {
                                    return {
                                        fileName,
                                        album,
                                        category,
                                        subCategory,
                                        addedToCart: false,
                                        favorite: false
                                    }
                                })])
                            })
                        })
                    })
                })
            })
        })
    })
    return images
}

console.log(getImages())
