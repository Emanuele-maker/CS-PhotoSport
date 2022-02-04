export default function Success({ boughtImages }) {
    function base64ToBlob(base64, mime) {
        mime = mime || ''
        var sliceSize = 1024
        var byteChars = window.atob(base64)
        var byteArrays = []

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize)

            var byteNumbers = new Array(slice.length)
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i)
            }

            var byteArray = new Uint8Array(byteNumbers)

            byteArrays.push(byteArray)
        }
        return new Blob(byteArrays, {type: mime})
    }

    async function downloadImage(img, imageSrc) {
        const link = document.createElement('a')
        link.href = imageSrc
        link.download = `${img.filename}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    boughtImages?.forEach(image => {
        const blobStr = base64ToBlob(image.original, "image/jpg")
        const blobURL = URL.createObjectURL(blobStr)
        downloadImage(image, blobURL)
    })

    return (
        <>
            <h1 style={{ marginLeft: "1.9rem" }}>Congratulazioni! l' acquisto è stato effettuato con successo!</h1>
            <h2 style={{ marginLeft: "1.9rem" }}>Le immagini acquistate verranno scaricate a breve automaticamente.</h2>
        </>
    )
}
