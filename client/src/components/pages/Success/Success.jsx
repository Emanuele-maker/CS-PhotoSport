import "./Sucess.scss"
import axios from "axios"
import { imagesRoute, previewsRoute, siteRoute } from "../../../staticInfo"
import ImageCard from "../../ImageCard/ImageCard"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import jwtDecode from "jwt-decode"

export default function Success({ onSetSessionId, onAddUserImage, isLoggedIn, logUserIn }) {
    const [boughtImages, setBoughtImages] = useState([])

    const downloadImage = (img, imageSrc) => {
      const link = document.createElement('a')
      link.href = imageSrc
      link.download = img.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

      const download = (imageName) => {
        const image = boughtImages.find(img => img.fileName === imageName)
        if (image.subCategory !== undefined) downloadImage(image, `${imagesRoute}/${image.category}/${image.subCategory}/${image.album}/${image.fileName}`)
        else downloadImage(image, `${imagesRoute}/${image.category}/${image.album}/${image.fileName}`)
      }

      const downloadAll = () => {
        boughtImages.forEach(img => {
          download(img.fileName)
        })
      }
      useEffect(() => {
      (async () => {
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
            setBoughtImages(JSON.parse(res.data.session.boughtImages))
            console.log(JSON.parse(res.data.session.boughtImages))
            axios.post(`${siteRoute}/api/myUser/add-image`, {
              images: [...JSON.parse(res.data.session.boughtImages), ...JSON.parse(localStorage.getItem("userImages"))],
              user_id: localStorage.getItem("userId")
            })
          }
        })
        }
      )()
    }, [onAddUserImage, onSetSessionId])


  return (
    <div className="success-content" rel="noopener noreferrer" target="_blank">
      <h1>Pagamento Riuscito!</h1>
      <h1>Scarica le foto acquistate</h1>
      {
        isLoggedIn ?
        <h2>Puoi trovarle anche sul tuo <Link to="/profilo">Profilo</Link></h2>
        :
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <h2>Accedi al tuo account Google per avere sempre accesso alle tue foto acquistate</h2>
          <GoogleLogin auto_select onSuccess={res => {
            const { sub, picture, name, email } = jwtDecode(res.credential)
            logUserIn(sub, name, email, picture)
          }} />
        </div>
      }
      {
        boughtImages.length > 0 ? 
        <>
          {/* <div className="download-all"><button className="download-all-btn" onClick={downloadAll}>Scarica tutte le foto</button></div> */}
          <div className="grid">
            {
              boughtImages.map(img => {
                return <ImageCard download={download} imageName={img.fileName} imageSrc={img.subCategory ? `${previewsRoute}/${img.category}/${img.subCategory}/${img.album}/${img.fileName}` : `${previewsRoute}/${img.category}/${img.album}/${img.fileName}`} />
              })
            }
          </div>
        </>
        : <h1>Caricamento...</h1>
      }
    </div>
  )
}