import { useState, useEffect } from "react"
import axios from "axios"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Album from "./components/pages/Album/Album"
import Cart from "./components/pages/Cart/Cart"
import Home from "./components/pages/Home/Home"
import Success from "./components/pages/Success/Success"
import "./style.scss"
import NotFound from "./components/pages/404/404"
import AlbumList from "./components/AlbumList/AlbumList"
import Contact from "./components/pages/Contact/Contact"

const siteRoute = process.env.NODE_ENV === "production" ? "http://csphotosport.com" : "http://localhost:3000"
const staticRoute = `${siteRoute}/client/build`

const categories = [
  {
    title: "Pallanuoto",
    cover: `${staticRoute}/img/Pallanuoto/CN Latina vs Muri Antichi/IMG_1716.jpg`,
    albums: [
      {
        title: "CN Latina vs Muri Antichi",
        cover: `${staticRoute}/img/Pallanuoto/CN Latina vs Muri Antichi/IMG_1258.jpg`,
      }
    ]
  },
  {
    title: "Kite, Windsurf & Windfoil",
    cover: `${staticRoute}/img/Kite, Windsurf & Windfoil/Fogliano 2 Febbraio 2022/IMG_6924.jpg`,
    albums: [
      {
        title: "Fogliano 2 Febbraio 2022",
        cover: `${staticRoute}/img/Kite, Windsurf & Windfoil/Fogliano 2 Febbraio 2022/IMG_6955.jpg`
      },
      {
        title: "Fogliano 26 Gennaio 2022",
        cover: `${staticRoute}/img/Kite, Windsurf & Windfoil/Fogliano 26 Gennaio 2022/IMG_6658.jpg` 
      }
    ]
  }
]

let previews = JSON.parse(JSON.stringify(require("./previews.json")))

let cartImages = []
let boughtImagesInit = []

export default function App() {
  const [cartCount, setcartCount] = useState(0)
  const [statefulCartImages, setStatefulCartImages] = useState(undefined)
  const [boughtImages, setBoughtImages] = useState(undefined)
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    const getSessionInfo = async() => {
      await axios.get(`${siteRoute}/api/begin-session/${localStorage.getItem("sessionId")}`, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(res => {
        setSessionId(res.data.session.id)
        localStorage.setItem("sessionId", res.data.session.id)
      })
    }

    getSessionInfo()

    setStatefulCartImages(cartImages)
    setBoughtImages(boughtImagesInit)
  }, [boughtImages, sessionId])

      function objectsAreEqual(object1, object2) {
        if (!object1 || !object2) return false
        const keys1 = Object.keys(object1)
        const keys2 = Object.keys(object2)
      
        if (keys1.length !== keys2.length) {
          return false
        }
      
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false
          }
        }
      
        return true
      }

    return (
      <Router>
        <Layout cartCount={cartCount}>
            <Routes>
              <Route exact path="/" element={<Home categories={categories} />} />
              <Route path="/:category_name/:sub_category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name" element={<AlbumList categories={categories} />} />
              <Route path="/:category_name/album/:album_name" element={<Album previewsStruct={previews} onAddToCart={(image) => {
                  image.addedToCart = true
                  cartImages.push(image)
                  setStatefulCartImages(cartImages)
                  setcartCount(cartCount + 1)
                  return image
              }} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
                  const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
                  if (!cartImageToFind) return
                  cartImageToFind.previewSrc = previewSrc
                  setStatefulCartImages(cartImages)
              }} />} />
              <Route path="/:category_name/:sub_category_name/:album_name" element={<Album previewsStruct={previews} onAddToCart={(image) => {
                  image.addedToCart = true
                  cartImages.push(image)
                  setStatefulCartImages(cartImages)
                  setcartCount(cartCount + 1)
                  return image
              }} cartImages={statefulCartImages} onAddPreviewSrc={(image, previewSrc) => {
                  const cartImageToFind = cartImages.find(img => objectsAreEqual(img, image))
                  if (!cartImageToFind) return
                  cartImageToFind.previewSrc = previewSrc
                  setStatefulCartImages(cartImages)
              }} />} />
              <Route path="/carrello" element={<Cart cartItems={statefulCartImages} sessionId={sessionId} onRemoveItem={(item) => {
                  item.addedToCart = false
                  cartImages.splice(cartImages.indexOf(item), 1)
                  setcartCount(cartCount - 1)
                  setStatefulCartImages(cartImages)
                  return statefulCartImages
              }} />} />
              <Route path="/contatti" element={<Contact sessionId={sessionId} />} />
              <Route path="/success" element={<Success onSetSessionId={(id) => setSessionId(id)} onSetBoughtImages={(boughtImages) => setBoughtImages(boughtImages)} onResetBoughtImages={() => setBoughtImages([])} />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Layout>
      </Router>
    )
}