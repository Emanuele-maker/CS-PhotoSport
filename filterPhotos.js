const fs = require("fs")
const path = require("path")

const folder1 = path.join(__dirname, "/client/public/img/07e108bd394a/Fuoco Corso Open Mamme")
const folder2 = "E:\\Danza\\Saggio 27.6.2022\\Fuoco\\Fuoco Corso Open Mamme\\esportazione 2"

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