import images from "../models/Image.js"
import fs from "fs"
import * as path from "path"
import crypto from "crypto"
import __dirname from "../__dirname.js"

fs.readdir(path.join(__dirname, "./img"), (err, albums) => {
    if (err) return console.log(`Unable to open dir: `, err)

    albums.forEach(album => {
        fs.readdir(path.join(__dirname, `./img/${album}`), (err, files) => {
            if (err) return console.log(`Unable to open dir: `, err)
            files.forEach((fileName, i) => {
                images.push({
                    original: fs.readFileSync(path.join(__dirname, `./img/${album}/${fileName}`)).toString("base64"),
                    index: i,
                    id: crypto.randomBytes(16).toString("hex"),
                    album: album,
                    filename: fileName,
                    preview: fs.readFileSync(path.join(__dirname, `./previews/${album}/${fileName}`)).toString("base64")
                })
            })
        })
    })
})

const getAlbumImages = (req: any, res: any) => {
    const albumImages = images.filter(image => image.album === req.params.album_name)
    res.json(albumImages)
}

export {
    getAlbumImages
}