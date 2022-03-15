import "./Sucess.scss"
import axios from "axios"
import { useEffect } from "react"
import { imagesRoute, siteRoute } from "../../../staticInfo"

export default function Success({ onSetSessionId, onSetBoughtImages, onResetBoughtImages }) {
    useEffect(() => {
      function downloadImage(img, imageSrc) {
          const link = document.createElement('a')
          link.href = imageSrc
          link.download = `${img.fileName}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
      }
      (async () =>
      {
      if (localStorage.getItem("downloaded") === "true") return
      await axios.get(`${siteRoute}/api/begin-session/${localStorage.getItem("sessionId")}`, {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
      })
      .then(res => {
          onSetSessionId(res.data.session.id)
          localStorage.setItem("sessionId", res.data.session.id)
          if (res.data.session.boughtImages && res.data.session.boughtImages.length > 0) {
            onSetBoughtImages(res.data.session.boughtImages)
            res.data.session.boughtImages.forEach(image => {
              downloadImage(image, `${imagesRoute}/${image.category}/${image.album}/${image.fileName}`)
              localStorage.setItem("downloaded", "true")
            })
            onResetBoughtImages()
          }
      })
      }
      )()
    }, [])

  return (
    <div className="success-content">
      <h1>Pagamento Riuscito!</h1>
      <h2>Le immagini acquistate verranno scaricate automaticamente dal tuo browser!</h2>
    </div>
  )
}