const fs = require("fs")
const path = require("path")

const main = async () => {
    let images = {}
    let previews = {}
     fs.readdir(path.join(__dirname, "./client/src/img"), async (err, albums) => {
        if (err) return console.log(`Unable to open dir: `, err)
        albums.forEach(album => {
            fs.readdir(path.join(__dirname, `./client/src/img/${album}`), (err, files) => {
                if (err) return console.log(`Unable to open dir: `, err)
                images[album] = []
                files.forEach((fileName, i) => {
                    images[album].push({
                        path: `./img/${fileName}`,
                        index: i,
                        fileName: fileName,
                        album: album
                    })
                })
                fs.writeFile("./client/src/images.json", JSON.stringify(images), err => {
                    if (err) console.log(err)
                })

            })

            fs.readdir(path.join(__dirname, `./client/src/previews/${album}`), async (err, files) => {
                if (err) console.log("Unable to open dir:", err)
                previews[album] = []
                files.forEach((fileName, i) => {
                    previews[album].push({
                        path: `./previews/${fileName}`,
                        index: i,
                        fileName: fileName,
                        album: album
                    })
                })
                fs.writeFile("./client/src/previews.json", JSON.stringify(previews), err => {
                    if (err) console.log(err)
                })
            })
        })
    })
}

main()