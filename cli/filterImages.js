import fs from "fs"
import path from "path"

const filterPhotos = (folder1, folder2) => {
    fs.readdir(folder1, (err, files) => {
        if (err) throw err

        fs.readdir(folder2, (err, files2) => {
            if (err) throw err
            
            files.forEach(file1 => {
                files2.forEach(file2 => {
                    if (!files2.includes(file1) && file1.includes(".jpg") && file2.includes(".jpg")) fs.unlink(path.join(folder1, file1), (err) => {
                        if (err) throw err
                    })
                })
            })
        })
    })
}

export default filterPhotos